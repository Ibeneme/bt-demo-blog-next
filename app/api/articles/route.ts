// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';


export async function GET(req: Request) {
    try {
        await connectDB();
        const articles = await Article.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json(articles);
    } catch (error) {
        console.error("GET articles error:", error);
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}

export async function getAllArticles() {
    try {
        await connectDB();
        return await Article.find({}).sort({ created_at: -1 }).lean();
    } catch (error) {
        console.error("getAllArticles error:", error);
        return [];
    }
}

export async function getArticleBySlug(slug: string) {
    if (!slug) return null;

    try {
        await connectDB();
        let article = await Article.findOne({ slug }).lean();

        if (!article) {
            article = await Article.findOne({
                slug: { $regex: new RegExp(`^${slug}$`, 'i') }
            }).lean();
        }

        return article;
    } catch (error) {
        console.error("getArticleBySlug error:", error);
        return null;
    }
}


export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();

        function getString(val: FormDataEntryValue | null): string | null {
            return typeof val === 'string' ? val : null;
        }

        let slug = getString(formData.get('slug'));
        let title = getString(formData.get('title'));

        if (!title || !slug) {
            return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
        }

        const existingArticle = await Article.findOne({ slug });
        if (existingArticle) {
            const timestamp = Date.now().toString().slice(-4);
            slug = `${slug}-${timestamp}`;
        }

        const articleData = {
            title: title!,
            slug: slug!,
            category: getString(formData.get('category')) || 'General',
            excerpt: getString(formData.get('excerpt')) || "",
            content: getString(formData.get('content')) || "",
            meta_title: getString(formData.get('meta_title')) || "",
            meta_description: getString(formData.get('meta_description')) || "",
            canonical_url: getString(formData.get('canonical_url')) || "",
            structured_data: formData.get('structured_data')
                ? JSON.parse(getString(formData.get('structured_data')) || '{}')
                : {},
        };

        const newArticle = await Article.create(articleData);

        // 🔥 Get ALL articles after creation
        const allArticles = await getAllArticles();

        return NextResponse.json({
            success: true,
            message: "Article created successfully",
            slug: newArticle.slug,
            newArticle,           // newly created article
            articles: allArticles // ← All articles returned
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating article:", error);
        return NextResponse.json({
            error: "Failed to create article.",
            details: error.message
        }, { status: 500 });
    }
}


// Add this function
// app/api/articles/route.ts

export async function getArticleById(id: string) {
    try {
        if (!id) return null;

        await connectDB();

        // Primary lookup by ID
        let article = await Article.findById(id).lean();

        // Optional fallback: try by slug if ID lookup fails (for robustness)
        if (!article) {
            article = await Article.findOne({
                slug: { $regex: new RegExp(`^${id}$`, 'i') }
            }).lean();
        }

        console.log("✅ getArticleById result:", article ? article.title : "Not found");

        return article; // Returns null or plain object
    } catch (error: any) {
        console.error("❌ getArticleById error:", error);
        return null;
    }
}




const getIdFromUrl = (req: Request) => {
    const url = new URL(req.url);
    const parts = url.pathname.split('/');
    const potentialId = parts[parts.length - 1];

    // LOG: See what the full URL and the extracted ID look like
    console.log("🔍 URL Path:", url.pathname);
    console.log("🔍 Extracted ID:", potentialId !== 'articles' ? potentialId : "None found");

    return potentialId !== 'articles' ? potentialId : null;
};


export async function PUT(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await connectDB();
        const data = await req.json();

        const updated = await Article.findByIdAndUpdate(
            id,
            { ...data, updated_at: new Date() },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, article: updated });
    } catch (error: any) {
        console.error("❌ PUT Server Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await connectDB();
        const deleted = await Article.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("❌ DELETE Server Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}