// app/blog/[slug]/page.tsx

import { supabase } from "../../../configs/supabase";
import BlogDetailsClient from "./BlogDetailsClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://bt-demo-blog.vercel.app";
const SITE_NAME = "ARIAD Psychological Services";
// Make sure this file actually exists in /public (not /assests typo, not a relative import path)
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.png`;

// ✅ DYNAMIC METADATA (Server Component)
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
        title: `Article Not Found | ${SITE_NAME}`,
        robots: { index: false, follow: false },
      };
    }

    const title = article.title;
    const description =
      article.excerpt?.trim() ||
      `Expert psychological insights from ${SITE_NAME}`;

    // image_url from Supabase storage is already absolute — but guard anyway
    // in case it's ever stored as a relative path.
    const imageUrl = article.image_url
      ? article.image_url.startsWith("http")
        ? article.image_url
        : `${SITE_URL}${article.image_url.startsWith("/") ? "" : "/"}${
            article.image_url
          }`
      : DEFAULT_OG_IMAGE;

    const pageUrl = `${SITE_URL}/blog/${slug}`;

    return {
      metadataBase: new URL(SITE_URL),
      title: `${title} | ${SITE_NAME}`,
      description,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title,
        description,
        url: pageUrl,
        siteName: SITE_NAME,
        type: "article",
        locale: "en_US",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (err) {
    console.error("Metadata error:", err);
    return {
      title: `${SITE_NAME} Blog`,
    };
  }
}

// Server Component
export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <BlogDetailsClient slug={slug} />
    </>
  );
}
