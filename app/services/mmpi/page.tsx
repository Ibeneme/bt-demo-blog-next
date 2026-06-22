import { Metadata } from "next";
import LearningClarityPage from "./MMPI";

export const metadata: Metadata = {
  title: "Professional MMPI Evaluations & Cognitive Support in Dallas | ARIAD",
  description:
    "Expert MMPI evaluations and cognitive clarity sessions for high-responsibility roles and security personnel in Dallas. Confidential, professional, and practical.",
  alternates: {
    canonical: "https://ariadpsychservices.com/services/mmpi",
  },
  openGraph: {
    title: "Professional MMPI & High-Responsibility Assessments | ARIAD",
    description:
      "Specialized support for professionals in demanding roles. Secure, confidential, and professional evaluations delivered in Dallas, TX.",
    url: "https://ariadpsychservices.com/services/mmpi",
    type: "website",
  },
};

export default function MMPIPageWrapper() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name: "Professional MMPI & Cognitive Assessment - ARIAD Psychological Services",
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
      "Specialized personality and cognitive assessments for professional, security, and high-responsibility roles.",
    medicalSpecialty: "PsychologicalAssessment",
    audience: {
      "@type": "Audience",
      audienceType: "Professionals in High-Responsibility Roles",
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
