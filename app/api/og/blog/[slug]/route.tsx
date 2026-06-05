// app/api/og/blog/[slug]/route.ts
import { supabase } from "@/configs/supabase";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest, // ← Fixed: Proper typing
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const { data: post } = await supabase
      .from("articles")
      .select("image_url")
      .eq("slug", slug)
      .single();

    const imageUrl =
      post?.image_url || "https://bt-demo-blog.vercel.app/default-og.jpg";

    return new ImageResponse(
      (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src={imageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Light overlay for better social media appearance */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.45))",
            }}
          />
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    console.error("OG Image Error:", e);

    return new ImageResponse(
      (
        <div
          style={{
            background: "#4F2A7E",
            width: "100%",
            height: "100%",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 80,
          }}
        >
          Blessing Attorney
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
