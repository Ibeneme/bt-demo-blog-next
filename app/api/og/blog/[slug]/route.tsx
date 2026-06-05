import { supabase } from "@/configs/supabase";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  console.log(`🖼️ OG Image API called for slug: ${slug}`);

  try {
    if (!slug) {
      console.warn("⚠️ No slug provided");
      return fetchImage("https://bt-demo-blog.vercel.app/default-og.jpg");
    }

    const { data: post, error } = await supabase
      .from("articles")
      .select("image_url")
      .eq("slug", slug)
      .single();

    console.log("📊 Supabase Response:", {
      success: !!post,
      error: error?.message || null,
      imageUrl: post?.image_url || null,
    });

    const imageUrl =
      post?.image_url || "https://bt-demo-blog.vercel.app/default-og.jpg";

    console.log(`✅ Serving image: ${imageUrl}`);

    // Return the image directly
    return fetchImage(imageUrl);
  } catch (error) {
    console.error("🚨 OG Route Error:", error);
    return fetchImage("https://bt-demo-blog.vercel.app/default-og.jpg");
  }
}

// Helper function to fetch and return image with correct headers
async function fetchImage(url: string) {
  try {
    const response = await fetch(url, { cache: "force-cache" });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 1 day
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.error("Image fetch failed, returning default");
    // Final fallback
    return new Response(null, {
      status: 302,
      headers: { Location: "https://bt-demo-blog.vercel.app/default-og.jpg" },
    });
  }
}
