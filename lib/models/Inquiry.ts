// lib/models/Inquiry.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
    name: string;
    email: string;
    phone: string;
    location: string;
    message: string;
    created_at: Date;
    // Optional fields you might want to add later
    status?: 'new' | 'contacted' | 'closed';
    read?: boolean;
}

const InquirySchema = new Schema<IInquiry>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'closed'],
        default: 'new',
    },
    read: {
        type: Boolean,
        default: false,
    },
});

// Index for faster searches
InquirySchema.index({ name: 1, email: 1, created_at: -1 });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);