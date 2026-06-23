import { Metadata } from "next";
import { supabase } from "@/lib/configs/supabase";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title:
    "Blog | Insights on Mental Health, ADHD & Autism | ARIAD Psychological",
  description:
    "Expert articles on ADHD, autism, parenting, neurodiversity, and psychological wellness from the clinicians at ARIAD Psychological Services in Dallas & Houston.",
  alternates: {
    canonical: "https://ariad-nine.vercel.app/blog",
  },
  openGraph: {
    title: "ARIAD Psychological Blog — Thoughtful Insights",
    description:
      "Clinical wisdom, parenting tips, and neurodiversity-affirming guidance.",
    url: "https://ariad-nine.vercel.app/blog",
    type: "website",
  },
  keywords: [
    "ADHD blog",
    "autism parenting",
    "psychological insights",
    "neurodiversity",
    "Dallas psychologist",
  ],
};

// Revalidate the blog list every hour
export const revalidate = 3600;

export default async function BlogPage() {
  // Fetch the initial set of articles on the server
  const { data: initialPosts, error } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, image_url, category, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  // Pass the data as a prop to your Client Component
  return <BlogClient initialPosts={initialPosts || []} />;
}
