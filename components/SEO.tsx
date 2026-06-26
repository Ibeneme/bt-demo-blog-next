// components/SEO.tsx
import { Helmet } from "react-helmet-async";

const DEFAULT_TITLE = "ARIAD Psychological Services";
const DEFAULT_DESCRIPTION =
  "Expert psychological insights, mental health articles, and professional perspectives from ARIAD.";
const DEFAULT_IMAGE = "/assets/images/logo_a.png";

export default function SEO({
  title,
  description,
  image,
  url,
  keywords,
}: {
  title?: string;
  description?: string;
  image?: string | { src: string }; // ← Supports imported image or string
  url?: string;
  keywords?: string;
}) {
  const pageTitle = title
    ? `${title} | ARIAD Psychological Services`
    : DEFAULT_TITLE;

  const pageDescription = description || DEFAULT_DESCRIPTION;

  // Handle both string path and imported Next.js image object
  const pageImage =
    typeof image === "object" && image?.src
      ? image.src
      : image || DEFAULT_IMAGE;

  const canonicalUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage as any} />
      <meta property="og:type" content="article" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage as any} />

      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
}
