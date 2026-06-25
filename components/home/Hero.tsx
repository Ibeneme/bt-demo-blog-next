"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import heroBg from "../../assests/images/hero.png";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const anim = (delay: string) =>
    `transition-all duration-1000 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    } ${delay}`;

  return (
    <>
      {/* HERO SECTION - Optimized to scale flawlessly on mobile and large viewport monitors */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 py-24 sm:py-32 md:py-0">
        {/* Background Image Container */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-[18000ms] ease-out ${
            mounted ? "scale-100" : "scale-110"
          }`}
        >
          <Image
            src={heroBg}
            alt="ARIAD Psychological Services"
            fill
            priority
            placeholder="blur"
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/75 to-[#66948B]/30 mix-blend-multiply" />

        {/* Hero Content Framework */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Location / Meta Badge */}
          <div
            className={`${anim(
              "delay-100"
            )} inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-widest border border-white/20 mb-6 sm:mb-8 max-w-full`}
          >
            <span className="w-2 h-2 rounded-full bg-[#66948B] animate-pulse flex-shrink-0" />
            <span className="truncate">ARIAD Psychological Services</span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-[#D6C1A0] hidden sm:inline">
              Dallas, Texas
            </span>
          </div>

          {/* Core Responsive Heading */}
          <h1
            className={`${anim(
              "delay-300"
            )} text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight sm:leading-tight md:leading-tight max-w-4xl mx-auto mb-6`}
          >
            Compassionate Care.
            <br />
            <span className="bg-gradient-to-r from-[#66948B] via-[#A3C1B4] to-[#D6C1A0] bg-clip-text text-transparent">
              Accurate Clarity.
            </span>
          </h1>

          {/* Subtext Paragraph */}
          <p
            className={`${anim(
              "delay-500"
            )} text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light`}
          >
            Comprehensive psychological, neurological, and psychoeducational
            services in Dallas, TX — supporting individuals and families with
            dignity and expertise.
          </p>

          {/* Action Call buttons */}
          <div
            className={`${anim(
              "delay-700"
            )} flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto`}
          >
            <a
              href="/contact"
              className="group relative px-6 sm:px-10 py-3.5 sm:py-4 bg-[#66948B] hover:bg-[#557d75] text-white font-semibold rounded-2xl shadow-xl shadow-black/30 transition-all duration-200 active:scale-[0.97] overflow-hidden text-center text-sm sm:text-base"
            >
              <span className="relative z-10">Schedule a Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>

            <a
              href="/about"
              className="px-6 sm:px-10 py-3.5 sm:py-4 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/30 text-white font-medium rounded-2xl transition-all duration-200 active:scale-[0.97] text-center text-sm sm:text-base"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* Bottom Curve Divider Mask */}
        <div className="absolute bottom-0 left-0 right-0 hidden sm:block z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-slate-50 relative bottom-[-1px]"
          >
            <path
              d="M0 60H1440V0C1310 35 1110 55 720 55C330 55 130 35 0 0V60Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
