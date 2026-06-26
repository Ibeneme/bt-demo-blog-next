import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// 1. Define the TypeScript interface for the document
// Note: We remove _id from here as it is included in Document
export interface IArticle extends Document {
    _id: Types.ObjectId; // Optional: Keep this if you want to reference the ID
    title: string;
    slug: string;
    category: string;
    excerpt?: string; // Use optional chaining instead of 'any'
    content: string;
    image_url?: string;
    og_image_url?: string;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    structured_data: Record<string, any>;
    created_at: Date;
    supabase_id?: string;
}

// 2. Define the Mongoose Schema
const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true, index: true },
    category: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    image_url: { type: String },
    og_image_url: { type: String },
    meta_title: { type: String },
    meta_description: { type: String },
    canonical_url: { type: String },
    structured_data: { type: Object },
    created_at: { type: Date, default: Date.now },
    supabase_id: { type: String, index: true },
});

// 3. Export the model
const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;