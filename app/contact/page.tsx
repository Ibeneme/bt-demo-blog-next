// app/contact/page.tsx
import { Metadata } from "next";
import ConsultationClient from "./ConsultationClient";

<<<<<<< HEAD
=======

>>>>>>> feature/improved-dashboard
export const metadata: Metadata = {
  title: "Schedule a Psychological Consultation | ARIAD Psychological Services",
  description:
    "Request a confidential intake consultation for ADHD, Autism (ASD), psychoeducational, or neuropsychological assessments in Texas and Arizona.",
  alternates: {
<<<<<<< HEAD
    canonical: "https://ariadpsychservices.com/contact",
=======
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
>>>>>>> feature/improved-dashboard
  },
  openGraph: {
    title: "Schedule a Psychological Consultation | ARIAD Psychological",
    description:
      "Connect with our clinical coordination team to verify insurance and schedule testing implementations.",
<<<<<<< HEAD
    url: "https://ariadpsychservices.com/contact",
=======
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
>>>>>>> feature/improved-dashboard
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
<<<<<<< HEAD
    url: "https://ariadpsychservices.com/contact",
=======
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
>>>>>>> feature/improved-dashboard
  };

  return (
    <>
<<<<<<< HEAD
=======
 

>>>>>>> feature/improved-dashboard
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConsultationClient />
    </>
  );
}
