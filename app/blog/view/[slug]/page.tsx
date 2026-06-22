import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/configs/supabase";
import BlogPostEach from "./BlogPostEach";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Static Generation (Optional: Improves performance)
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("articles")
    .select("slug")
    .eq("published", true)
    .limit(100);

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = true;

// 2. Dynamic Metadata (Server Component)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("articles")
    .select(
      "title, excerpt, meta_title, meta_description, og_image_url, image_url, canonical_url, category"
    )
    .eq("slug", slug)
    .single();

  if (!post) {
    return { title: "Article Not Found | ARIAD Psychological Services" };
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
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

// 3. Main Server Component
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Fetch data on the server
  const { data: initialPost, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !initialPost) {
    notFound();
  }

  // Pass the data down to your Client Component
  return <BlogPostEach slug={slug} initialPost={initialPost} />;
}
