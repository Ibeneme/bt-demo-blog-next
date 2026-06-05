import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";

const rethink = Rethink_Sans({
  variable: "--font-rethink",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bt-demo-blog.vercel.app"),
  title: {
    default: "Blessing Attorney | Corporate Law Insights",
    template: "%s | Blessing Attorney",
  },
  description:
    "Expert legal insights on corporate law, regulatory compliance, and business strategy in Nigeria.",
  keywords: [
    "Corporate Law",
    "Legal Insights",
    "Nigeria Startups",
    "Compliance",
    "Business Law",
  ],
  authors: [{ name: "Blessing Attorney" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Blessing Attorney Blog",
    images: [
      {
        url: "/default-og.jpg", // Fallback OG image
        width: 1200,
        height: 630,
        alt: "Blessing Attorney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourhandle", // Change to your actual Twitter handle
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rethink.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}