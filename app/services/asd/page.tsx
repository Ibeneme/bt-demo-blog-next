import { Metadata } from "next";
import AutismUnderstandingSection from "./ASD";

// 1. Service-Focused SEO Metadata
export const metadata: Metadata = {
  title: "Autism (ASD) Testing & Developmental Support in Dallas | ARIAD",
  description:
    "Compassionate, play-based autism (ASD) evaluations for children and teens in Dallas. Get clear answers and a customized developmental roadmap for school and home.",
  alternates: {
    canonical: "https://ariadpsychservices.com/services/autism",
  },
  openGraph: {
    title: "Autism (ASD) Assessments | ARIAD Psychological Services",
    description:
      "Expert diagnostic testing for Autism Spectrum Disorder. We focus on how your child experiences the world to provide actionable support strategies.",
    url: "https://ariadpsychservices.com/services/autism",
    type: "website",
  },
};

export default function AutismTestingPage() {
  // 2. Structured Data for Medical Diagnostic Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name: "Autism Spectrum Disorder (ASD) Evaluation - ARIAD Psychological Services",
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
      "Developmental and diagnostic evaluation services for children and adolescents identifying as autistic or seeking assessment.",
    audience: {
      "@type": "Patient",
      description:
        "Families and individuals seeking autism spectrum disorder diagnosis and developmental planning.",
    },
    medicalSpecialty: "DevelopmentalPediatrics",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AutismUnderstandingSection />
    </>
  );
}
