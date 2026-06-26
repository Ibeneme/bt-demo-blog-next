// app/blog/[slug]/og/route.tsx   (or wherever this file is located)

import { ImageResponse } from "next/og";
import { supabase } from "../../../configs/supabase";

export const runtime = "edge";

export const alt = "ARIAD Psychological Services Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Image({ params }: Props) {
  const { slug } = params;

  console.log(
    `[OG_IMAGE_GENERATOR] ➡️ Generating dynamic OG image for slug: "${slug}"`
  );

  // Fetch article data from Supabase
  const { data: currentArticle, error } = await supabase
    .from("articles")
    .select("title, category, image_url")
    .eq("slug", slug)
    .single();

  if (error || !currentArticle) {
    console.error(
      "[OG_IMAGE_GENERATOR] ❌ Failed to fetch article data:",
      error?.message
    );
    return new Response(
      "Article data could not be fetched for OG image generation.",
      { status: 404 }
    );
  }

  console.log("[OG_IMAGE_GENERATOR] ✅ Article data loaded successfully:", {
    title: currentArticle.title,
    category: currentArticle.category,
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#023B37", // ARIAD Brand Dark Teal
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* RIGHT SIDE: Article Image */}
        <img
          src={currentArticle.image_url}
          alt={currentArticle.title}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "65%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(to right, #023B37 0%, #023B37 45%, rgba(2, 59, 55, 0.85) 55%, rgba(2, 59, 55, 0.1) 100%)",
          }}
        />

        {/* Foreground Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "60px 80px",
          }}
        >
          {/* Category Tag */}
          <div
            style={{
              display: "flex",
              padding: "8px 24px",
              borderRadius: "30px",
              backgroundColor: "#067F76", // ARIAD Accent Teal
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              alignSelf: "flex-start",
            }}
          >
            {currentArticle.category || "Psychological Insights"}
          </div>

          {/* Title Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              padding: "40px",
              borderRadius: "20px",
              width: "58%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <h1
              style={{
                fontSize: "44px",
                fontWeight: 800,
                color: "#023B37",
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              {currentArticle.title}
            </h1>
          </div>

          {/* Footer Branding */}
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.3)",
              paddingTop: "24px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#ffffff",
                letterSpacing: "0.5px",
              }}
            >
              ARIAD
            </span>
            <span
              style={{
                fontSize: "18px",
                color: "#E0F2F1",
                fontWeight: 500,
              }}
            >
              Psychological Services
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
