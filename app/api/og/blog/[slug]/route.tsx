import { supabase } from "@/configs/supabase";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const { data: post } = await supabase
      .from("articles")
      .select("image_url")
      .eq("slug", slug)
      .single();

    const imageUrl = post?.image_url || "https://bt-demo-blog.vercel.app/default-og.jpg";

    // Most reliable way: Redirect directly to the image
    return Response.redirect(imageUrl, 302);
  } catch (error) {
    console.error("OG Image Error:", error);
    return Response.redirect("https://bt-demo-blog.vercel.app/default-og.jpg", 302);
  }
}