import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: {
    default: "ARIAD Psychological Services | Holistic Neuropsychological Evaluation",
    template: "%s | ARIAD Psychological Services",
  },
  description:
    "ARIAD Psychological Services provides expert neuropsychological evaluations and holistic mental health care in Dallas, bridging the gap between cognitive roots and emotional well-being.",
  keywords: [
    "Neuropsychological Evaluation",
    "Psychological Services",
    "Mental Health Dallas",
    "Cognitive Assessment",
    "Holistic Therapy",
  ],
  authors: [{ name: "ARIAD Psychological Services" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ARIAD Psychological Services",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "ARIAD Psychological Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F8FAF9] text-slate-900">
        {/* HelmetProvider removed: Next.js handles head tags automatically */}
        <NavbarWrapper />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}