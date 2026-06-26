// app/api/inquiries/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import nodemailer from 'nodemailer';

/**
 * Configure Nodemailer with Zoho SMTP
 */
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_APP_PASSWORD?.replace(/\s/g, ''), // Removes any accidental spaces
    },
});

/**
 * Styling constants
 */
const emailWrapperStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #334155;
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  background-color: #FAF8F5;
`;

const headerStyle = "color: #023B37; font-weight: 800; font-size: 28px; margin-bottom: 24px; letter-spacing: -0.02em;";
const accentStyle = "color: #067F76; font-weight: 600;";

export async function GET() {
    try {
        await connectDB();
        const inquiries = await Inquiry.find({}).sort({ created_at: -1 }).lean();
        return NextResponse.json(inquiries);
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // 1. Save to Database
        const newInquiry = await Inquiry.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            location: body.location,
            message: body.message,
        });

        // 2. Send Notifications via Zoho SMTP
        try {
            // Email to Client
            await transporter.sendMail({
                from: `Ariad's Thread <${process.env.ZOHO_EMAIL}>`,
                to: body.email,
                subject: 'We have received your inquiry',
                html: `
                  <div style="${emailWrapperStyle}">
                    <h1 style="${headerStyle}">Hello ${body.name},</h1>
                    <p>Thank you for reaching out to us. We have received your inquiry for <strong>${body.location}</strong>.</p>
                    <p>At Ariad's Thread, we believe that understanding and support work like a golden thread—a gentle, steady guide through life's complexities.</p>
                    <p>A member of our team will review your message shortly and reach out to you to discuss how we can best support your path toward <span style="${accentStyle}">Clinical Clarity</span>.</p>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                      <p style="font-size: 13px; color: #64748b;">Confidentiality is our priority. If you need to update your inquiry, please feel free to reply to this email.</p>
                    </div>
                  </div>
                `,
            });

            // Email to Admin
            await transporter.sendMail({
                from: `Inquiry System <${process.env.ZOHO_EMAIL}>`,
                to: process.env.ZOHO_EMAIL,
                subject: `New Inquiry: ${body.name} (${body.location})`,
                html: `
                  <div style="${emailWrapperStyle}">
                    <h2 style="${headerStyle}">New Inquiry Received</h2>
                    <p><strong>Name:</strong> ${body.name}</p>
                    <p><strong>Email:</strong> ${body.email}</p>
                    <p><strong>Phone:</strong> ${body.phone}</p>
                    <p><strong>Location:</strong> ${body.location}</p>
                    <p><strong>Message:</strong></p>
                    <blockquote style="background: #f1f5f9; padding: 15px; border-left: 4px solid #067F76; border-radius: 4px;">
                      ${body.message}
                    </blockquote>
                  </div>
                `,
            });
        } catch (emailError) {
            console.error("Email service error:", emailError);
            // We don't return an error here because the DB record was already created.
        }

        return NextResponse.json({
            success: true,
            message: "Inquiry submitted successfully",
            data: newInquiry
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating inquiry:", error);
        return NextResponse.json({
            error: "Failed to submit inquiry",
            details: error.message
        }, { status: 500 });
    }
}