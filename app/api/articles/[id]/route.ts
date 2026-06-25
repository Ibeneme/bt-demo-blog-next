// app/api/articles/[id]/route.ts
// NOTE: despite the folder being named [id], this route is effectively slug-based
// (kept as-is for the public blog page, which calls getArticleBySlug).
// For admin edit-by-_id lookups, use /api/articles/by-id/[id] instead.

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: slug } = await params;

        await connectDB();

        let article = await Article.findOne({ slug }).lean();

        if (!article) {
            article = await Article.findOne({
                slug: { $regex: new RegExp(`^${slug}$`, 'i') }
            }).lean();
        }

        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error: any) {
        console.error("❌ GET article error:", error);
        return NextResponse.json({
            error: "Failed to fetch article",
            details: error.message
        }, { status: 500 });
    }
}

// Re-export for use in Server Components (public blog page)
export async function getArticleBySlug(slug: string) {
    try {
        await connectDB();

        let post = await Article.findOne({ slug }).lean();

        if (!post) {
            post = await Article.findOne({
                slug: { $regex: new RegExp(`^${slug}$`, 'i') }
            }).lean();
        }

        return post ? JSON.parse(JSON.stringify(post)) : null;
    } catch (error: any) {
        console.error("❌ getArticleBySlug error:", error.message);
        return null;
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const data = await req.json();

        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { ...data, updated_at: new Date() },
            { new: true }
        );

        if (!updatedArticle) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            slug: updatedArticle.slug,
        });
    } catch (error: any) {
        console.error("Update error:", error);
        return NextResponse.json({
            error: "Failed to update article",
            details: error.message,
        }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();

        const deletedArticle = await Article.findByIdAndDelete(id);

        if (!deletedArticle) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Article deleted successfully",
        });
    } catch (error: any) {
        console.error("Delete error:", error);
        return NextResponse.json({
            error: "Failed to delete article",
            details: error.message,
        }, { status: 500 });
    }
}