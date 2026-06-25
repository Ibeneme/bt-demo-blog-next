import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';

import { supabase } from '@/lib/supabase';

// ==================== MIGRATE ARTICLES: SUPABASE -> MONGODB ====================
// POST /api/admin/migrate-articles
// Protected. Pulls EVERY row from Supabase's `articles` table (paginated,
// since Supabase caps a single query at 1000 rows) and upserts each one
// into MongoDB by `slug`, so this is safe to re-run without duplicating data.

const PAGE_SIZE = 1000;

export async function POST(req: Request) {


    await connectDB();

    let page = 0;
    let totalFetched = 0;
    let totalUpserted = 0;
    let totalFailed = 0;
    const failures: { slug?: string; id?: string; error: string }[] = [];

    try {
        while (true) {
            const from = page * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('created_at', { ascending: true })
                .range(from, to);

            if (error) {
                console.error('❌ Supabase fetch error:', error);
                return NextResponse.json(
                    { error: 'Failed to fetch from Supabase', details: error.message },
                    { status: 502 }
                );
            }

            if (!data || data.length === 0) break;

            totalFetched += data.length;

            for (const article of data) {
                try {
                    if (!article.slug) {
                        totalFailed++;
                        failures.push({ id: article.id, error: 'Missing slug — skipped' });
                        continue;
                    }

                    // structured_data may already be an object (jsonb column) or a string,
                    // depending on how the Supabase client returns it.
                    let structuredData = article.structured_data || {};
                    if (typeof structuredData === 'string') {
                        try {
                            structuredData = JSON.parse(structuredData);
                        } catch {
                            structuredData = {};
                        }
                    }

                    await Article.findOneAndUpdate(
                        { slug: article.slug },
                        {
                            title: article.title || 'Untitled',
                            slug: article.slug,
                            excerpt: article.excerpt || '',
                            content: article.content || '',
                            category: article.category || 'General',
                            image_url: article.image_url || '',
                            author: article.author || 'ARIAD Team',
                            created_at: article.created_at ? new Date(article.created_at) : new Date(),
                            meta_title: article.meta_title || '',
                            meta_description: article.meta_description || '',
                            canonical_url: article.canonical_url || '',
                            structured_data: structuredData,
                            supabase_id: String(article.id),
                        },
                        { upsert: true, new: true }
                    );

                    totalUpserted++;
                } catch (err: any) {
                    totalFailed++;
                    failures.push({ slug: article.slug, id: article.id, error: err.message });
                }
            }

            // Fewer rows than a full page means we've hit the last page.
            if (data.length < PAGE_SIZE) break;
            page++;
        }

        return NextResponse.json({
            success: true,
            message: `Migration complete: ${totalUpserted} upserted, ${totalFailed} failed, ${totalFetched} fetched total.`,
            totalFetched,
            totalUpserted,
            totalFailed,
            failures: failures.slice(0, 20), // cap so the response doesn't balloon
        });
    } catch (error: any) {
        console.error('❌ Migration Error:', error);
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}