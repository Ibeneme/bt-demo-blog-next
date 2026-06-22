"use client";

import React from "react";
import {
  CalendarCheck2,
  ArrowRight,
  Clipboard,
  PhoneCall,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ScheduleSection() {
  const steps: Step[] = [
    {
      num: "01",
      title: "Initial Conversation",
      description:
        "Connect with our team to share your goals and needs. We’ll discuss how we can best support you or your child.",
      icon: <PhoneCall className="w-4 h-4 text-[#067F76]" />,
    },
    {
      num: "02",
      title: "Support Session",
      description:
        "Join a thoughtful, structured session in a calm and supportive environment.",
      icon: <Clipboard className="w-4 h-4 text-[#8C6D53]" />,
    },
    {
      num: "03",
      title: "Clear Next Steps",
      description:
        "Review your personalized summary and practical strategies together with our team.",
      icon: <CheckCircle className="w-4 h-4 text-[#067F76]" />,
    },
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const slideBottom = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const blinker = {
    animate: { opacity: [1, 0.4, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  };

  return (
    <section
      className="bg-slate-50 py-16 sm:py-24 lg:py-32 relative overflow-hidden text-slate-800"
      id="schedule-now"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#067F76]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#023B37] rounded-[2.5rem] border border-[#023B37] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-[#067F76]/20 blur-3xl pointer-events-none" />

          {/* --- TOP ROW: SLIDE LEFT --- */}
          <motion.div
            variants={slideLeft}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-12 border-b border-white/10"
          >
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6C1A0]" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/80 font-extrabold">
                  Take the Next Step
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Gain Clearer Insight? <br /> Schedule Your Session
                Today.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                Partner with Ariad Support Services for thoughtful guidance and
                practical next steps.
              </p>
            </div>
            <div className="shrink-0 self-start lg:self-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-[#D6C1A0] text-[#023B37] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-95 group"
              >
                <CalendarCheck2 className="w-4 h-4" />
                <span>Book Your Session</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* --- BOTTOM ROW: SLIDE BOTTOM --- */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={slideBottom}
                className="space-y-4 group relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      {...blinker}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0"
                    >
                      {step.icon}
                    </motion.div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D6C1A0]">
                      Step {step.num}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
