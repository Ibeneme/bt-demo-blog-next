import { Metadata } from "next";
import LearningClarityPage from "./Assessments";

export const metadata: Metadata = {
  title: "Assessments & Cognitive Insights in Dallas | ARIAD",
  description:
    "Gain insight into how you or your child thinks, focuses, and learns. Professional learning support sessions offering clear, actionable roadmaps for school and life.",
  alternates: {
    canonical: "https://ariadpsychservices.com/services/assessments",
  },
  openGraph: {
    title: "Assessments Sessions | ARIAD Psychological Services",
    description:
      "Understand your unique thinking style. We provide the clarity and practical strategies needed to thrive in Dallas's fast-paced environment.",
    url: "https://ariadpsychservices.com/services/assessments",
    type: "website",
  },
};

export default function LearningClarityPageWrapper() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Assessments & Cognitive Support - ARIAD Psychological Services",
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
      "Supportive sessions designed to explore cognitive styles, attention patterns, and learning preferences.",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "Student/Professional",
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
