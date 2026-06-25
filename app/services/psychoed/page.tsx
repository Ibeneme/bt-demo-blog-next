import { Metadata } from "next";
import LearningSupportPage from "./PSYCHOED";

// 1. Service-Focused SEO Metadata
export const metadata: Metadata = {
  title: "Learning Support & Academic Assessments in Dallas | ARIAD",
  description:
    "Expert learning support sessions for children and adults. Understand your learning style, overcome obstacles, and get practical strategies for school and work success.",
  alternates: {
    canonical: "https://ariadpsychservices.com/services/psychoed",
  },
  openGraph: {
    title: "Learning Support Services | ARIAD Psychological Services",
    description:
      "Clarify your learning journey with personalized assessments. Expert strategies for reading, writing, focus, and academic achievement in Dallas.",
    url: "https://ariadpsychservices.com/services/psychoed",
    type: "website",
  },
};

export default function LearningSupportPageWrapper() {
  // 2. Structured Data for Educational/Learning Support
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Learning Support & Academic Assessment - ARIAD Psychological Services",
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
      "Customized learning support sessions focusing on reading, writing, executive function, and academic growth strategies.",
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

      <LearningSupportPage />
    </>
  );
}
