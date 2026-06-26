
import { Metadata } from "next";
import AboutUs from "./AboutUs";
import SEO from "@/components/SEO"; // ← Added SEO Import

export const metadata: Metadata = {
  title: "About Us | Meet Our Team | ARIAD Psychological Services",
  description:
    "Meet the dedicated clinicians at ARIAD Psychological Services in Dallas and Houston, Texas. Learn about our experienced team providing compassionate psychological and neuropsychological assessments.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
  },
  openGraph: {
    title: "About Our Team | ARIAD Psychological Services",
    description:
      "Expert psychologists and psychometrists in Dallas & Houston offering evidence-based ADHD, autism, and psychoeducational evaluations.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    type: "website",
    images: [
      {
        url: "/images/ariad-team-og.jpg",
        width: 1200,
        height: 630,
        alt: "ARIAD Psychological Services Team",
      },
    ],
  },
  keywords: [
    "ARIAD Psychological Services",
    "Dallas psychologist",
    "Houston psychologist",
    "psychometrist",
    "psychological testing",
    "neuropsychological evaluation",
    "autism assessment",
    "ADHD testing",
    "Jaswin John",
    "Isoken Adodo",
  ],
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About ARIAD Psychological Services",
    description:
      "Meet our clinical team in Dallas and Houston, Texas. Dedicated to providing compassionate, evidence-based psychological and neuropsychological assessments.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    mainEntity: {
      "@type": "MedicalBusiness",
      name: "ARIAD Psychological Services, PLLC",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4131 N Central Expy Suite 900",
        addressLocality: "Dallas",
        addressRegion: "TX",
        postalCode: "75204",
      },
    },
  };

  return (
    <>
 

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutUs />
    </>
  );
}
