import { Metadata } from "next";
import LearningClarityPage from "./Neuro";

// 1. Service-Focused SEO Metadata
export const metadata: Metadata = {
  title: "Learning Clarity & Cognitive Insights in Dallas | ARIAD",
  description:
    "Gain insight into your unique thinking and learning style. Personalized sessions to improve focus, memory, and daily balance for children and adults in Dallas.",
  alternates: {
    canonical: "https://ariadpsychservices.com/services/neuro",
  },
  openGraph: {
    title:
      "Learning Clarity & Cognitive Support | ARIAD Psychological Services",
    description:
      "Understand your brain's unique pattern. Clear, actionable insights into how you process information, stay focused, and achieve your goals.",
    url: "https://ariadpsychservices.com/services/neuro",
    type: "website",
  },
};

export default function LearningClarityPageWrapper() {
  // 2. Structured Data for Cognitive/Developmental Support
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Learning Clarity & Cognitive Insight Sessions - ARIAD Psychological Services",
    provider: {
      "@type": "MedicalBusiness",
      name: "ARIAD Psychological Services",
      url: "https://ariadpsychservices.com",
    },
    areaServed: {
      "@type": "City",
      name: "Dallas",
    },
    description:
      "Personalized exploration of cognitive styles, focus patterns, and learning preferences to help individuals thrive in school and professional life.",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "Student/Professional/Parent",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cognitive Support Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Focus & Attention Support",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Memory & Cognitive Style Exploration",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LearningClarityPage />
    </>
  );
}
