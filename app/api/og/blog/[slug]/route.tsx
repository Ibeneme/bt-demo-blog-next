import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // We still need to await params for Next.js 15+ compatibility
    await params; // Ignore the actual value since we use query params

    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Blessing Attorney Blog";
    const excerpt = searchParams.get("excerpt") || "";
    const category = searchParams.get("category") || "Legal Insights";
    const image =
      searchParams.get("image") ||
      "https://bt-demo-blog.vercel.app/default-og.jpg";

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
            backgroundImage: `linear-gradient(rgba(79, 42, 126, 0.85), rgba(79, 42, 126, 0.85)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {/* Dark Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
            }}
          />

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "60px 80px",
              color: "white",
              maxWidth: "880px",
              zIndex: 10,
            }}
          >
            {/* Brand */}
            <div
              style={{
                fontSize: "36px",
                fontWeight: "900",
                letterSpacing: "4px",
                marginBottom: "20px",
                color: "#D4AF37",
              }}
            >
              BLESSING ATTORNEY
            </div>

            {/* Category */}
            <div
              style={{
                backgroundColor: "#D4AF37",
                color: "#4F2A7E",
                padding: "8px 26px",
                borderRadius: "50px",
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "32px",
              }}
            >
              {category}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "48px",
                fontWeight: "800",
                lineHeight: 1.1,
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              {title}
            </div>

            {/* Excerpt */}
            {excerpt && (
              <div
                style={{
                  fontSize: "22px",
                  lineHeight: 1.4,
                  opacity: 0.95,
                }}
              >
                {excerpt.length > 110
                  ? excerpt.substring(0, 110) + "..."
                  : excerpt}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "80px",
              right: "80px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
              opacity: 0.85,
            }}
          >
            <div>bt-demo-blog.vercel.app</div>
            <div>Legal Excellence</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG Image Error:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
