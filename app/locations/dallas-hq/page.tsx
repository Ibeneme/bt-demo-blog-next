// app/locations/dallas/page.tsx
import { Metadata } from "next";
import DallasOfficeClient from "./DallasOfficeClient";

// 1. Dynamic or Static SEO Metadata configuration
export const metadata: Metadata = {
  title: "ADHD & Neuropsychological Testing Dallas TX | ARIAD Psychological",
  description:
    "Visit ARIAD Psychological Services in Dallas, Texas. Expert, confidential autism (ASD) testing, ADHD evaluations, and psychoeducational assessments.",
  alternates: {
    canonical: "https://ariad-sooty.vercel.app/locations/dallas",
  },
  openGraph: {
    title: "Neuropsychological Evaluations in Dallas, TX | ARIAD Psychological",
    description:
      "Expert diagnostic testing for ADHD, Autism, and learning exceptionalities in Dallas.",
    url: "https://ariad-sooty.vercel.app/locations/dallas",
    type: "website",
  },
};

export default function DallasOfficePage() {
  // 2. Local Business Structured Data for Google Maps Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "ARIAD Psychological Services - Dallas Hub",
    image: "https://ariad-sooty.vercel.app/images/logo_a.png", // update with your true domain asset path
    "@id": "https://ariad-sooty.vercel.app/locations/dallas",
    url: "https://ariad-sooty.vercel.app/locations/dallas",
    telephone: "+1-469-733-9976",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4131 N Central Expy, Suite 900",
      addressLocality: "Dallas",
      addressRegion: "TX",
      postalCode: "75204",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.8306,
      longitude: -96.786518,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  };

  return (
    <>
      {/* Inject Structured Data directly into page head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Render the structural layout */}
      <DallasOfficeClient />
    </>
  );
}
