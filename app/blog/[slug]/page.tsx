// app/blog/[slug]/page.tsx

import { supabase } from "@/lib/configs/supabase";
import BlogDetailsClient from "./BlogDetailsClient";

// ✅ DYNAMIC METADATA (Server Component)
// app/blog/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const { data: article } = await supabase
      .from("articles")
      .select("title, excerpt, image_url, category")
      .eq("slug", slug)
      .single();

    if (!article) {
      return {
        title: "Article Not Found | Blessing Attorney",
      };
    }

    const imageUrl =
      article.image_url || "https://bt-demo-blog.vercel.app/default-og.jpg";
    const pageUrl = `https://bt-demo-blog.vercel.app/blog/${slug}`;

    return {
      title: `${article.title} | Blessing Attorney`,
      description:
        article.excerpt || "Expert legal insights from Blessing Attorney",
      openGraph: {
        title: article.title,
        description: article.excerpt,
        url: pageUrl,
        siteName: "Blessing Attorney",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        type: "article",
        publishedTime: new Date().toISOString(), // optional
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: [imageUrl],
      },
    };
  } catch (err) {
    console.error("Metadata error:", err);
    return {
      title: "Blessing Attorney Blog",
    };
  }
}

// Server Component
export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ← Important fix
  console.log("🔹 BlogDetailsPage server component - slug:", slug);

  return <BlogDetailsClient slug={slug} />;
}
