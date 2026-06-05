import type { Metadata, ResolvingMetadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";

const rethink = Rethink_Sans({
  variable: "--font-rethink",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Dynamic Metadata (handles both homepage and blog posts)
export async function generateMetadata(
  { params }: { params: Promise<{ slug?: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Blog Post Page
  if (slug) {
    try {
      const { supabase } = await import("@/configs/supabase");

      const { data: post } = await supabase
        .from("articles")
        .select("title, excerpt, image_url")
        .eq("slug", slug)
        .single();

      if (post) {
        const imageUrl = post.image_url || "/default-og.jpg";

        return {
          title: post.title,
          description: post.excerpt || "Expert legal insights from Blessing Attorney",
          openGraph: {
            type: "article",
            title: post.title,
            description: post.excerpt,
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ],
            url: `https://bt-demo-blog.vercel.app/blog/${slug}`,
          },
          twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
          },
        };
      }
    } catch (error) {
      console.error("Error generating blog metadata:", error);
    }
  }

  // Default metadata (homepage + other pages)
  return {
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
          url: "/default-og.jpg",
          width: 1200,
          height: 630,
          alt: "Blessing Attorney",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourhandle", // ← Change to your actual Twitter handle
    },
  };
}

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