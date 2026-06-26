"use client";

import HomeView from "@/components/home/Hero";
import PhilosophicalThread from "@/components/home/PhilosophicalThread";
import ScheduleSection from "@/components/home/ScheduleSection";
import ServicesSection from "@/components/home/ServicesSection";
import AnimatedTestimonialsSection from "@/components/home/Testimonial";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import SEO from "@/components/SEO"; // ← Added SEO Import

export default function HomePageView() {
  return (
    <>
      <SEO
        title="ARIAD Psychological Services"
        description="Expert neuropsychological evaluations and holistic mental health care in Dallas. Bridging cognitive roots and emotional well-being with compassionate, comprehensive care."
        keywords="neuropsychological evaluation, psychological services, mental health Dallas, cognitive assessment, holistic therapy, child psychology, family therapy"
      />

      <div>
        <HomeView /> {/* Hero + Intro combined */}
        <PhilosophicalThread />
        <ServicesSection />
        <WhyChooseUsSection />
        <AnimatedTestimonialsSection />
        <ScheduleSection />
      </div>
    </>
  );
}
