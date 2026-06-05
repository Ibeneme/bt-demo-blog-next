import { supabase } from "@/configs/supabase";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Fetch post data from Supabase
    const { data: post } = await supabase
      .from("articles")
      .select("title, excerpt, category, image_url")
      .eq("slug", slug)
      .single();

    const title = post?.title || "Blessing Attorney Blog";
    const excerpt = post?.excerpt || "";
    const category = post?.category || "Legal Insights";
    const image =
      post?.image_url || "https://bt-demo-blog.vercel.app/default-og.jpg";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F8F7F4",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div />
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (error) {
    console.error("OG Image Error:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
