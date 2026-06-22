// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/configs/supabase";
import BlogPostEach from "./BlogPostEach";

type Props = {
  params: Promise<{ slug: string }>;
};

// Optional: Pre-render known slugs at build time (highly recommended)
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("articles")
    .select("slug")
    .eq("published", true) // add any filters you use
    .limit(100); // adjust as needed

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}

// Keep dynamic for new/updated posts
export const dynamicParams = true; // default, but explicit is good
// export const dynamic = "force-dynamic"; // only use if you want ZERO static rendering

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  console.warn("generateMetadata slug:", slug); // better than console.warn(slug, 'slugslug')

  const { data: post, error } = await supabase
    .from("articles")
    .select(
      "title, excerpt, meta_title, meta_description, og_image_url, image_url, canonical_url, category"
    )
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return {
      title: "Article Not Found | ARIAD Psychological Services",
      robots: { index: false, follow: false },
    };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const imageUrl = post.og_image_url || post.image_url;
  const canonical =
    post.canonical_url || `https://ariadpsychservices.com/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: "ARIAD Psychological Services",
      locale: "en_US",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    keywords: [
      "mental health",
      "psychology",
      "therapy",
      post.category?.toLowerCase(),
      "ARIAD Psychological Services",
    ].filter(Boolean) as string[],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const { data: initialPost, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`[BlogPostPage] Supabase error for slug "${slug}":`, error);
  }

  if (!initialPost) {
    notFound();
  }

  return <BlogPostEach slug={slug} initialPost={initialPost} />;
}
