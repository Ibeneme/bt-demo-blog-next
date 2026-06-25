"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  ShieldCheck,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";
import phase1 from "../../assests/images/hero.png";
import phase2 from "../../assests/images/phase2.png";
import phase3 from "../../assests/images/phase3.png";

export default function PhilosophicalThread() {
  const scrollTriggerConfig = { once: true, margin: "-100px" };

  return (
    <section
      className="bg-white py-16 sm:py-24 lg:py-36 relative overflow-hidden"
      id="philosophy"
    >
      {/* Decorative Subtle Line Art Articulating "Ariadne's Thread" */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 lg:opacity-40"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full text-[#067F76]/10"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200C300 400 500 100 800 500C1100 900 1200 300 1600 600"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <path
            d="M-50 250C350 450 450 50 750 450C1050 850 1250 250 1550 550"
            stroke="#8C6D53"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- HEADER INTRODUCTION (ZOOM & FADE IN) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollTriggerConfig}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 lg:mb-28 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#023B37]/5 border border-[#023B37]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#067F76]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#067F76] font-extrabold">
              Our Philosophical Thread
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#023B37] tracking-tight leading-tight">
            Ariad's Thread: <br />
            <span className="text-[#067F76]">Navigating Life's Maze</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed pt-2 sm:pt-4 font-normal max-w-2xl mx-auto">
            In classical mythology, the golden thread given to Theseus guided
            him safely out of the labyrinth. We believe understanding and
            support work the same way — a gentle, steady thread that helps
            families and individuals find clarity and move forward through
            life's challenges.
          </p>
        </motion.div>

        {/* --- CUSTOM ASYMMETRIC MASONRY / BENTO GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-auto lg:auto-rows-[220px]">
          {/* CARD 1: Deep Understanding */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollTriggerConfig}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 lg:row-span-2 relative group overflow-hidden bg-[#023B37] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white border border-[#023B37] transition-all duration-500 hover:-translate-y-1 min-h-[280px] lg:min-h-0"
          >
            <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#067F76]/20 blur-[50px] sm:blur-[60px] translate-x-12 translate-y-12" />

            <div className="flex justify-between items-start relative z-10 mb-8 lg:mb-0">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="text-xs tracking-widest font-mono text-white/40 group-hover:text-white/80 transition-colors duration-300">
                PHASE_01
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4 relative z-10 max-w-xl">
              <h3 className="font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight">
                1. Deep Understanding
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-200/90 leading-relaxed font-light">
                We take time to truly listen — exploring your story,
                experiences, daily life, and what matters most to you or your
                child.
              </p>
            </div>
          </motion.div>

          {/* CARD 2: Visual Concept Image for Understanding */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollTriggerConfig}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5 lg:row-span-2 relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 group bg-slate-100 h-56 sm:h-72 lg:h-auto"
          >
            <Image
              src={phase1}
              alt="Deep listening and understanding process"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-w-1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#023B37]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex justify-between items-center text-white">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/10">
                Thoughtful Exploration
              </span>
              <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* CARD 3: Visual Concept Image for Guidance */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollTriggerConfig}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5 lg:row-span-2 relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 group bg-slate-100 h-56 sm:h-72 lg:h-auto order-4 lg:order-none"
          >
            <Image
              src={phase2}
              alt="Thoughtful guidance and support process"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-w-1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8C6D53]/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex justify-between items-center text-white">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/10">
                Personalized Guidance
              </span>
              <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* CARD 4: Thoughtful Guidance */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollTriggerConfig}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 lg:row-span-2 relative group overflow-hidden bg-[#8C6D53] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white border border-[#8C6D53] transition-all duration-500 hover:-translate-y-1 min-h-[280px] lg:min-h-0 order-3 lg:order-none"
          >
            <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#73563F]/30 blur-[50px] sm:blur-[60px] -translate-x-12 -translate-y-12" />

            <div className="flex justify-between items-start relative z-10 mb-8 lg:mb-0">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="text-xs tracking-widest font-mono text-white/40 group-hover:text-white/80 transition-colors duration-300">
                PHASE_02
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4 relative z-10 max-w-xl">
              <h3 className="font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight">
                2. Thoughtful Guidance
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-amber-50/90 leading-relaxed font-light">
                We move at a careful, respectful pace — offering clear
                strategies and practical tools while always listening to your
                needs and preferences.
              </p>
            </div>
          </motion.div>

          {/* CARD 5: Empathetic Partnership */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollTriggerConfig}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 lg:row-span-2 relative group overflow-hidden bg-gradient-to-br from-[#067F76] via-[#056b63] to-[#023B37] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between text-white gap-8 border border-[#067F76] transition-all duration-500 hover:-translate-y-1 order-5 lg:order-none"
          >
            <div className="space-y-4 sm:space-y-6 max-w-2xl relative z-10">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                <HeartHandshake className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="space-y-1.5 sm:space-y-3">
                <span className="text-[10px] sm:text-xs tracking-widest font-mono text-[#D6C1A0] block">
                  PHASE_03 &bull; PARTNERSHIP
                </span>
                <h3 className="font-extrabold text-xl sm:text-3xl lg:text-4xl tracking-tight">
                  3. Empathetic Partnership
                </h3>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-slate-100 leading-relaxed font-light">
                We walk alongside you as true partners — listening deeply,
                respecting your values, and working together to create a path
                that feels right for your family.
              </p>
            </div>

            {/* In-card compact secondary grid composition window */}
            <div className="w-full lg:w-[40%] h-48 sm:h-64 lg:h-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-inner group-hover:scale-[1.01] transition-transform duration-500 flex-shrink-0">
              <Image
                src={phase3}
                alt="Supportive partnership and collaboration"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 30vw"
              />
              <div className="absolute inset-0 bg-[#023B37]/20 mix-blend-multiply" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
