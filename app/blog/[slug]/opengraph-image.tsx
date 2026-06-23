import { ImageResponse } from "next/og";
import { supabase } from "@/lib/configs/supabase";
export const runtime = "edge";

export const alt = "Blessing Attorney Blog Post Card";
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
    `[OG_IMAGE_GENERATOR] ➡️ Initiating dynamic render sequence for slug: "${slug}"`
  );

  // Querying Supabase content cluster
  const { data: currentArticle, error } = await supabase
    .from("articles")
    .select("title, category, image_url")
    .eq("slug", slug)
    .single();

  if (error || !currentArticle) {
    console.error(
      "[OG_IMAGE_GENERATOR] ❌ Failed to fetch database data context node:",
      error?.message
    );
    return new Response(
      "Article data could not be fetched for layout design synthesis.",
      { status: 404 }
    );
  }

  console.log(
    "[OG_IMAGE_GENERATOR] ✅ Successfully pulled live dataset parameters:",
    {
      title: currentArticle.title,
      category: currentArticle.category,
      image_url: currentArticle.image_url,
    }
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#4F2A7E", // Deep purple brand primary
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* 1. RIGHT SIDE: Full-bleed main post image taken directly from image_url column schema */}
        <img
          src={currentArticle.image_url}
          alt={currentArticle.title}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "65%", // Spans across the right section side layout
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* 2. BACKGROUND OVERLAY GRADIENT: Smooth blend from brand purple into the article's image_url */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(to right, #4F2A7E 0%, #4F2A7E 45%, rgba(79, 42, 126, 0.85) 55%, rgba(79, 42, 126, 0.1) 100%)",
          }}
        />

        {/* 3. FOREGROUND CONTENT WRAPPER */}
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
          {/* TOP SECTION: Category Pillar Tag */}
          <div
            style={{
              display: "flex",
              padding: "8px 22px",
              borderRadius: "30px",
              backgroundColor: "#D4AF37", // Blessing Attorney Brand Gold
              color: "#4F2A7E",
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              alignSelf: "flex-start",
            }}
          >
            {currentArticle.category || "Corporate Law"}
          </div>

          {/* MIDDLE SECTION: Floating High-Contrast Title Box Component Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(255, 255, 255, 0.98)", // Solid high-contrast white card overlay frame
              padding: "40px",
              borderRadius: "20px",
              width: "58%", // Constrained width boundary so typography doesn't overlay image subjects
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <h1
              style={{
                fontSize: "44px",
                fontWeight: 800,
                color: "#111827", // Neutral Slate Gray tone variant for pristine legibility
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {currentArticle.title}
            </h1>
          </div>

          {/* BOTTOM SECTION: Branding Divider bar */}
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.25)",
              paddingTop: "24px",
            }}
          >
            <span
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#ffffff",
                letterSpacing: "0.5px",
              }}
            >
              Blessing Attorney
            </span>
            <span
              style={{
                fontSize: "18px",
                color: "#F3F4F6",
                fontWeight: 500,
              }}
            >
              Legal Insights & Publications
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
