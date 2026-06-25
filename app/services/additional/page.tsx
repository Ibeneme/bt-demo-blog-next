import { Metadata } from "next";
import AdditionalSupportPage from "./Additional";

export const metadata: Metadata = {
  title: "Parent Guidance, School Advocacy & Practical Support | ARIAD",
  description:
    "Expert school advocacy, parent coaching, and documentation support in Dallas. We turn insights into real-world progress for your family and child's success.",
  alternates: {
    canonical: "https://ariadpsychservices.com/services/additional",
  },
  openGraph: {
    title: "Advocacy & Family Support Services | ARIAD",
    description:
      "Bridge the gap between understanding and action. We provide school advocacy, parent coaching, and documentation support for families in Dallas.",
    url: "https://ariadpsychservices.com/services/additional",
    type: "website",
  },
};

export default function AdditionalSupportPageWrapper() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Educational Advocacy & Family Support - ARIAD Psychological Services",
    provider: {
      "@type": "MedicalBusiness",
      name: "ARIAD Psychological Services",
      url: "https://ariadpsychservices.com",
    },
    description:
      "Practical support services including school advocacy, parent guidance, and assistance with academic/workplace documentation.",
    areaServed: {
      "@type": "City",
      name: "Dallas",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Family and Educational Support",
      itemListElement: [
        { "@type": "Offer", name: "Parent & Family Guidance Sessions" },
        { "@type": "Offer", name: "School Advocacy & Meeting Preparation" },
        { "@type": "Offer", name: "Academic Documentation Support" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdditionalSupportPage />
    </>
  );
}
