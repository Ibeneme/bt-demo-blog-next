<<<<<<< HEAD
// app/about/page.tsx
import { Metadata } from "next";
import AboutUs from "./AboutUs";   // ← Your client component
=======

import { Metadata } from "next";
import AboutUs from "./AboutUs";
import SEO from "@/components/SEO"; // ← Added SEO Import
>>>>>>> feature/improved-dashboard

export const metadata: Metadata = {
  title: "About Us | Meet Our Team | ARIAD Psychological Services",
  description:
    "Meet the dedicated clinicians at ARIAD Psychological Services in Dallas and Houston, Texas. Learn about our experienced team providing compassionate psychological and neuropsychological assessments.",
  alternates: {
<<<<<<< HEAD
    canonical: "https://ariadpsychservices.com/about",
=======
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
>>>>>>> feature/improved-dashboard
  },
  openGraph: {
    title: "About Our Team | ARIAD Psychological Services",
    description:
      "Expert psychologists and psychometrists in Dallas & Houston offering evidence-based ADHD, autism, and psychoeducational evaluations.",
<<<<<<< HEAD
    url: "https://ariadpsychservices.com/about",
    type: "website",
    images: [
      {
        url: "/images/ariad-team-og.jpg", // Replace with actual OG image if available
=======
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    type: "website",
    images: [
      {
        url: "/images/ariad-team-og.jpg",
>>>>>>> feature/improved-dashboard
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
<<<<<<< HEAD
    url: "https://ariadpsychservices.com/about",
=======
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
>>>>>>> feature/improved-dashboard
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
<<<<<<< HEAD
=======
 

>>>>>>> feature/improved-dashboard
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutUs />
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> feature/improved-dashboard
