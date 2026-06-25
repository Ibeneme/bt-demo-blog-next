// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';
import OTP from '@/lib/models/OTP';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

const getTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_APP_PASSWORD,
        },
    });
};

function requireSuperAdmin(req: Request) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { ok: false, status: 401, error: 'Unauthorized' };
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { role?: string };
        if (decoded.role !== 'superadmin') {
            return { ok: false, status: 403, error: 'Superadmin required' };
        }
        return { ok: true };
    } catch {
        return { ok: false, status: 401, error: 'Invalid token' };
    }
}

// ==================== MAIN POST HANDLER ====================
export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const { action } = body;   // Action comes from request body

    try {
        if (action === 'signin') {
            const { email, password } = body;

            if (!email || !password) {
                return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
            }

            const admin = await Admin.findOne({ email });
            if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

            const token = jwt.sign(
                { id: admin._id, email: admin.email, role: admin.role || 'admin' },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            return NextResponse.json({ success: true, token, message: 'Login successful' });
        }

        if (action === 'forgot-password') {
            const { email } = body;
            if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

            const otp = crypto.randomInt(100000, 999999).toString();

            await OTP.findOneAndUpdate(
                { email },
                { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) },
                { upsert: true }
            );

            await sendOTPEmail(email, otp);
            return NextResponse.json({ success: true, message: 'OTP sent successfully' });
        }

        if (action === 'reset-password') {
            const { email, otp, newPassword } = body;
            if (!email || !otp || !newPassword) {
                return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
            }

            const otpRecord = await OTP.findOne({ email });
            if (!otpRecord || otpRecord.otp !== otp) {
                return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
            }
            if (otpRecord.expiresAt < new Date()) {
                await OTP.deleteOne({ email });
                return NextResponse.json({ error: 'OTP has expired' }, { status: 401 });
            }

            const admin = await Admin.findOne({ email });
            if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            admin.password = hashedPassword;
            await admin.save();
            await OTP.deleteOne({ email });

            return NextResponse.json({ success: true, message: 'Password reset successfully' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        console.error('❌ Auth API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// ==================== DELETE ALL ADMINS ====================
export async function DELETE(req: Request) {
    await connectDB();

    const auth = requireSuperAdmin(req);
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        const result = await Admin.deleteMany({});
        return NextResponse.json({
            success: true,
            message: `Deleted ${result.deletedCount} admin(s)`,
            deletedCount: result.deletedCount,
        });
    } catch (error: any) {
        console.error('❌ Delete All Admins Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// ==================== EMAIL FUNCTION ====================
async function sendOTPEmail(email: string, otp: string) {
    try {
        const transporter = getTransporter();
        await transporter.sendMail({
            from: `"Ariad Psychological Services" <${process.env.ZOHO_EMAIL}>`,
            to: email,
            subject: "Your OTP for Ariad Psychological Services",
            html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f5; padding: 32px 0;">
          <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #067F76, #0a9c91); padding: 24px 32px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Ariad Psychological Services</h1>
            </div>
            <div style="padding: 32px;">
              <h2 style="color: #1a1a1a;">Verification Code</h2>
              <p>Use the code below. It expires in 5 minutes.</p>
              <div style="background: #f0f9f7; border: 1px solid #d7ece9; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
                <span style="color: #067F76; font-size: 32px; font-weight: 700; letter-spacing: 6px;">${otp}</span>
              </div>
            </div>
          </div>
        </div>
      `,
        });
    } catch (error) {
        console.error('❌ Send OTP Error:', error);
        throw error;
    }
}