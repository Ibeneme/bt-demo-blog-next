import { Metadata } from "next";
import AdhdAssessmentSection from "./ADHD";

// 1. Service-Focused SEO Metadata
export const metadata: Metadata = {
  title:
    "Professional ADHD Testing & Evaluation in Dallas | ARIAD Psychological",
  description:
    "Expert ADHD evaluations for children, teens, and adults. Get clear, compassionate diagnostic testing and actionable roadmaps for school and work support.",
  alternates: {
    canonical: "https://ariadpsychservices.com/services/adhd",
  },
  openGraph: {
    title: "ADHD Diagnostic Testing | ARIAD Psychological Services",
    description:
      "Understand how your brain works. Professional ADHD assessments with clear, actionable results for home, school, and work.",
    url: "https://ariadpsychservices.com/services/adhd",
    type: "website",
  },
};

export default function AdhdTestingPage() {
  // 2. Service/Medical Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name: "ADHD Diagnostic Testing - ARIAD Psychological Services",
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
      "Professional neuropsychological testing for Attention Deficit Hyperactivity Disorder (ADHD) in children and adults.",
    audience: {
      "@type": "Patient",
      description:
        "Individuals seeking ADHD diagnosis and management strategies.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AdhdAssessmentSection />
    </>
  );
}
