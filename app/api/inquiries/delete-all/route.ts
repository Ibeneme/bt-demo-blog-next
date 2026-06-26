// app/api/inquiries/delete-all/route.ts

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';

export async function DELETE() {
    try {
        await connectDB();

        const result = await Inquiry.deleteMany({});

        return NextResponse.json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} inquiries`,
            deletedCount: result.deletedCount,
        });
    } catch (error: any) {
        console.error("Delete all error:", error);
        return NextResponse.json(
            { error: "Failed to delete all inquiries" },
            { status: 500 }
        );
    }
}