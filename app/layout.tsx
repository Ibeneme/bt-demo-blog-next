import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";

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
  title: {
    default: "ARIAD Psychological Services | Dallas, Texas",
    template: "%s | ARIAD Psychological Services",
  },
  description:
    "Expert ADHD Testing, Autism (ASD) Evaluations, Psychoeducational, Neuropsychological & Psychological Assessments in Dallas, Texas. Compassionate care for children, teens, and adults.",

  keywords: [
    "ADHD testing Dallas",
    "Autism testing Dallas",
    "Neuropsychological evaluation",
    "Psychoeducational testing",
    "Psychological assessment Texas",
    "MMPI-3 testing",
    "Child psychologist Dallas",
    "ARIAD Psychological Services",
  ],

  authors: [{ name: "ARIAD Psychological Services" }],
  creator: "ARIAD Psychological Services",

  openGraph: {
    title: "ARIAD Psychological Services | Expert Testing in Dallas",
    description:
      "Specialized ADHD, Autism, and Neuropsychological testing services in Dallas, Texas.",
    url: "https://yourdomain.com", // ← Change to your real domain later
    siteName: "ARIAD Psychological Services",
    images: [
      {
        url: "/og-image.png", // You can add this later
        width: 1200,
        height: 630,
        alt: "ARIAD Psychological Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ARIAD Psychological Services",
    description:
      "Expert ADHD, Autism & Neuropsychological Testing in Dallas, Texas",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    other: {
      rel: "apple-touch-icon",
      url: "/favicon.png",
    },
  },

  manifest: "/manifest.json", // Optional: add later for PWA
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#023B37",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F8FAF9] text-slate-900">
        <NavbarWrapper />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
