import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google"; // Import Rethink Sans
import "./globals.css";

// Initialize Rethink Sans
const rethink = Rethink_Sans({
  variable: "--font-rethink",
  subsets: ["latin"],
});

// Configure base metadata
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
  ],
  authors: [{ name: "Blessing Attorney" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Blessing Attorney Blog",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Apply the font variable here
      className={`${rethink.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      {/* Apply the font class to the body */}
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
