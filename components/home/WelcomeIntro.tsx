"use client";

import React from "react";
import { Sparkles, GraduationCap, Users, ArrowRight } from "lucide-react";

interface WelcomeCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  borderStyle: string;
  badgeBg: string;
}

export default function WelcomeSection() {
  const cards: WelcomeCard[] = [
    {
      title: "Accurate Diagnoses Through Psychological Testing",
      description:
        "Our comprehensive assessments provide precise diagnoses and clear pathways for effective treatment of mental health, learning, and behavioral concerns.",
      icon: <Sparkles className="w-5 h-5 text-[#067F76]" />,
      borderStyle: "border-slate-200 hover:border-[#067F76]/40",
      badgeBg: "bg-[#067F76]/10 text-[#067F76]",
    },
    {
      title: "Personalized Educational Support",
      description:
        "Psychoeducational testing and tailored accommodations help children and students overcome learning challenges and thrive academically.",
      icon: <GraduationCap className="w-5 h-5 text-[#8C6D53]" />,
      borderStyle: "border-slate-200 hover:border-[#8C6D53]/40",
      badgeBg: "bg-[#8C6D53]/10 text-[#8C6D53]",
    },
    {
      title: "Behavioral Support for Families",
      description:
        "Expert parent coaching and behavior management strategies that strengthen family dynamics and support emotional growth.",
      icon: <Users className="w-5 h-5 text-[#067F76]" />,
      borderStyle: "border-slate-200 hover:border-[#067F76]/40",
      badgeBg: "bg-[#067F76]/10 text-[#067F76]",
    },
  ];

  return (
    <section
      className="bg-slate-50 py-16 sm:py-24 lg:py-36 relative overflow-hidden text-slate-800"
      id="welcome"
    >
      {/* Background Ambient Decorative Gradients */}
      <div className="absolute top-1/4 -left-48 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#067F76]/5 blur-[80px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#D6C1A0]/10 blur-[70px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* --- LEFT SIDE: HERO INTRO NARRATIVE --- */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#023B37]/5 border border-[#023B37]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#067F76]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#067F76] font-extrabold">
                Welcome to ARIAD
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#023B37] tracking-tight leading-none flex flex-col">
              <span>Bespoke Care.</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#067F76] to-[#8C6D53]">
                Accurate Clarity.
              </span>
            </h2>

            <div className="w-20 h-1 bg-gradient-to-r from-[#067F76] to-[#D6C1A0] rounded-full pt-1" />

            <h3 className="text-lg sm:text-xl font-extrabold text-[#023B37] tracking-tight">
              Comprehensive Psychological Testing &amp; Personalized Support
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm lg:text-base font-light leading-relaxed">
              At ARIAD Psychological Services, we provide high-quality,
              compassionate care for individuals of all ages facing
              psychological, neurological, and educational challenges. Our team
              is committed to uncovering paths forward through detailed insight
              and understanding.
            </p>

            <div className="pt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#067F76] hover:text-[#023B37] transition-colors duration-300 group"
              >
                <span>Explore Core Pathways</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* --- RIGHT SIDE: VALUE PROPOSITION STACK (SHADOWLESS) --- */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 w-full">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={`w-full bg-white border rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start transition-all duration-300 ${card.borderStyle}`}
              >
                {/* Translucent Icon Wrapper */}
                <div
                  className={`p-3 rounded-2xl flex items-center justify-center shrink-0 ${card.badgeBg}`}
                >
                  {card.icon}
                </div>

                {/* Content block */}
                <div className="space-y-2">
                  <h4 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#023B37] tracking-tight">
                    {card.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
