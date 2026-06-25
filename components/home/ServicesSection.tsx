"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Brain,
  Sparkles,
  BookOpen,
  Fingerprint,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

// Static asset imports - ensure these paths are correct in your project
import serv1 from "../../assests/images/serv1.png";
import serv2 from "../../assests/images/serv2.png";
import serv3 from "../../assests/images/serv3.png";
import serv4 from "../../assests/images/serv4.png";

interface ServiceItem {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  bgStyle: string;
  iconAccent: string;
  imageAlt: string;
  imageUrl: any;
}

export default function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const services: ServiceItem[] = [
    {
      num: "01",
      title: "Psychological Testing & ADHD Assessment",
      description:
        "Our clinical frameworks help accurately diagnose and treat a variety of emotional and mental health concerns such as anxiety, depression, ADHD, and stress management. We provide evidence-based insights to support long-term psychological growth.",
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: "#psychological-testing",
      bgStyle: "bg-white",
      iconAccent: "text-[#067F76] bg-[#067F76]/10",
      imageAlt:
        "Clinical psychological testing setting with structured evaluation tools",
      imageUrl: serv1,
    },
    {
      num: "02",
      title: "Neuropsychological Evaluations",
      description:
        "If you or a loved one is navigating cognitive difficulties, memory shifts, or neurological concerns, we offer objective, comprehensive assessments to identify conditions like traumatic brain injuries, executive dysfunction, or cognitive impairments.",
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: "#neuropsychological-evaluations",
      bgStyle: "bg-white",
      iconAccent: "text-[#8C6D53] bg-[#8C6D53]/10",
      imageAlt:
        "Detailed abstract representation of brain patterns and cognitive analysis mapping",
      imageUrl: serv2,
    },
    {
      num: "03",
      title: "Psychoeducational Assessments",
      description:
        "Tailored diagnostic profiles to identify learning style nuances, dyslexia, dyscalculia, and processing differences. We actively collaborate with parents, educators, and schools to craft practical, personalized educational accommodation plans.",
      icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: "#psychoeducational-testing",
      bgStyle: "bg-white",
      iconAccent: "text-[#8C6D53] bg-[#8C6D53]/10",
      imageAlt:
        "Educational learning evaluation with supportive conceptual materials",
      imageUrl: serv3,
    },
    {
      num: "04",
      title: "Autism Testing & Neurodivergence Support",
      description:
        "Thorough, gold-standard diagnostic assessments designed to discover and understand Autism Spectrum Disorder (ASD) profiles in both children and adults. We provide clear results, deep clarity, and next-step alignment for home, school, or work environments.",
      icon: <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6" />,
      href: "#autism-testing",
      bgStyle: "bg-white",
      iconAccent: "text-[#067F76] bg-[#067F76]/10",
      imageAlt:
        "Comforting and inclusive clinical observation setting representing neurodivergent clarity",
      imageUrl: serv4,
    },
  ];

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition, {
        passive: true,
      });
      checkScrollPosition();
      window.addEventListener("resize", checkScrollPosition, { passive: true });
    }
    return () => {
      if (container)
        container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth * 0.85 : clientWidth * 0.85;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };
  return (
    <section
      className="bg-slate-50 py-12 sm:py-24 lg:py-36 relative overflow-hidden text-slate-800"
      id="services"
    >
      <div className="absolute top-1/3 -right-48 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#067F76]/5 blur-[80px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#D6C1A0]/10 blur-[70px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-16 gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#023B37]/5 border border-[#023B37]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#067F76]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#067F76] font-extrabold">
                Explore Our Services
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#023B37] tracking-tight leading-tight">
              Psychological, Neuropsychological{" "}
              <br className="hidden sm:inline" /> &amp; Autism Testing Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#067F76] to-[#D6C1A0] rounded-full pt-1" />
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base max-w-2xl font-light pt-2">
              Providing evidence-based diagnostic protocols and deep therapeutic
              understanding for children, teens, and adults throughout Dallas,
              Texas.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 sm:p-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                canScrollLeft
                  ? "border-slate-300 text-[#023B37] bg-white hover:bg-slate-100 shadow-sm cursor-pointer"
                  : "border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-3 sm:p-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                canScrollRight
                  ? "border-slate-300 text-[#023B37] bg-white hover:bg-slate-100 shadow-sm cursor-pointer"
                  : "border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <motion.div
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory [-webkit-overflow-scrolling:touch]"
          style={{ scrollbarWidth: "none" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.num}
              variants={cardVariants}
              className={`flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-[480px] snap-start relative border border-slate-200/80 rounded-[2rem] overflow-hidden flex flex-col justify-between transition-all duration-500 ${service.bgStyle}`}
            >
              <div>
                <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 z-10" />
                  <img
                    src={service.imageUrl?.src || service.imageUrl}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 sm:p-8 lg:p-10">
                  <div className="flex items-center justify-between mb-4 sm:mb-6 relative z-10">
                    <div
                      className={`p-2.5 sm:p-3 rounded-2xl border border-transparent shadow-sm flex items-center justify-center ${service.iconAccent}`}
                    >
                      {service.icon}
                    </div>
                    <span className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight font-mono">
                      {service.num}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-extrabold text-[#023B37] tracking-tight mb-2 sm:mb-3 transition-colors duration-300 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light mb-2 transition-colors duration-300 relative z-10">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="relative z-10 mt-auto px-5 pb-5 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
                <a
                  href={service.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#067F76] transition-colors duration-300 group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
