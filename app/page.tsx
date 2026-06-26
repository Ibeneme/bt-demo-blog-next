// app/page.tsx
import { Metadata } from "next";
import HomePageView from "./home/page";

export const metadata: Metadata = {
  title:
    "ARIAD Psychological Services | ADHD & Autism Testing in Dallas & Houston",
  description:
    "Expert psychological and neuropsychological evaluations in Dallas and Houston, Texas. ADHD testing, Autism (ASD) assessments, psychoeducational, and more. Compassionate care for children, teens, and adults.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  openGraph: {
    title: "ARIAD Psychological Services — Dallas & Houston",
    description:
      "Specialized ADHD, Autism, and Psychoeducational testing with experienced clinicians.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "psychological testing dallas",
    "autism testing houston",
    "adhd evaluation texas",
    "psychoeducational assessment",
    "neuropsychological testing",
  ],
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "ARIAD Psychological Services, PLLC",
    description:
      "Professional psychological and neuropsychological assessment services in Texas.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "4131 N Central Expy Suite 900",
      addressLocality: "Dallas",
      addressRegion: "TX",
      postalCode: "75204",
    },
    telephone: "(469) 733-9976",
    areaServed: ["Dallas", "Houston", "Texas"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageView />
    </>
  );
}
