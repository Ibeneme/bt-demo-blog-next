// app/contact/page.tsx
import { Metadata } from "next";
import ConsultationClient from "./ConsultationClient";


export const metadata: Metadata = {
  title: "Schedule a Psychological Consultation | ARIAD Psychological Services",
  description:
    "Request a confidential intake consultation for ADHD, Autism (ASD), psychoeducational, or neuropsychological assessments in Texas and Arizona.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
  },
  openGraph: {
    title: "Schedule a Psychological Consultation | ARIAD Psychological",
    description:
      "Connect with our clinical coordination team to verify insurance and schedule testing implementations.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    type: "website",
  },
};

export default function ConsultationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "ARIAD Psychological Services Consultation Request",
    description:
      "Secure administrative submission form to initiate intake evaluation across Texas and Arizona hub networks.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
  };

  return (
    <>
 

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConsultationClient />
    </>
  );
}
