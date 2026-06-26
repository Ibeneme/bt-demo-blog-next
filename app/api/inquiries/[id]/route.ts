import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();

        const deleted = await Inquiry.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Inquiry deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
    }
}