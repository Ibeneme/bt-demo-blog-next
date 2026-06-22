




"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  DollarSign,
  Info,
  CheckCircle,
  Search,
  FileText,
  UserCheck,
  Activity,
  Heart,
  TrendingUp,
} from "lucide-react";

export default function LearningClarityPage() {
  const scrollTriggerConfig = { once: true, margin: "-100px" };

  const evaluationSteps = [
    {
      icon: UserCheck,
      phase: "01",
      title: "Initial Conversation",
      desc: "Your journey begins with a relaxed, open discussion. We talk about your experiences, daily routines, and the areas where you or your child would like more clarity and support.",
    },
    {
      icon: Activity,
      phase: "02",
      title: "Interactive Exploration",
      desc: "We use engaging activities, thoughtful questions, and everyday-style tasks. This helps us understand thinking patterns, focus, and how you or your child approaches different situations.",
    },
    {
      icon: FileText,
      phase: "03",
      title: "Results & Next Steps",
      desc: "We sit down together to review a clear, easy-to-follow summary. You receive practical ideas and strategies for school, work, home, or daily life.",
    },
  ];

  const valueProps = [
    {
      title: "Experienced Local Guides",
      desc: "Our team brings practical insight and a supportive approach tailored to the real-life needs of Dallas families and individuals.",
      metric: "Personal Insight",
    },
    {
      title: "Fully Personalized Approach",
      desc: "We adapt every session to match your unique story and goals instead of using a one-size-fits-all method.",
      metric: "1:1 Focus",
    },
    {
      title: "Deep Context of Local Life",
      desc: "From busy school schedules to daily family demands, we understand the realities facing residents in Highland Park, Plano, and Richardson.",
      metric: "Dallas Centric",
    },
  ];

  return (
    <section
      className="bg-[#FCFAF7] text-[#112421] antialiased selection:bg-[#067F76]/20"
      id="learning-clarity"
    >
      {/* ================= HERO SECTION: Clean Minimalist Asymmetric Layout ================= */}
      <div className="relative min-h-[95vh] flex items-center bg-gradient-to-b from-[#F5F1EA] to-[#FCFAF7] pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#023B37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#023B37]/5 border border-[#023B37]/10 text-[#023B37] text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-[#067F76]" />
              ARIAD SUPPORT SERVICES • DALLAS, TX
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#012321] tracking-tight leading-[1.05]">
              Clearer Understanding.
              <br />
              <span className="text-[#067F76] font-serif italic font-normal">
                Practical Guidance.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 max-w-xl font-normal leading-relaxed">
              Gain helpful insight into how you or your child thinks, focuses,
              and learns best. We offer welcoming, thoughtful learning support
              sessions designed to bring clarity and positive next steps.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="bg-[#023B37] hover:bg-[#067F76] text-white px-7 py-4 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg"
              >
                View Transparent Pricing
              </a>
              <a
                href="/contact"
                className="border border-[#023B37]/20 hover:border-[#023B37]/60 px-7 py-4 rounded-xl font-bold text-sm transition-all text-[#023B37] flex items-center gap-2"
              >
                Speak With Our Team
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Image/Graphic Column */}
          <div className="lg:col-span-6 relative w-full h-[500px] flex items-center justify-end">
            <div className="absolute right-0 top-0 w-11/12 h-[90%] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Comfortable and supportive learning space"
                fill
                className="object-cover grayscale-[25%] contrast-[105%]"
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={scrollTriggerConfig}
              className="absolute left-0 bottom-4 bg-white border-l-4 border-[#067F76] p-6 rounded-r-xl shadow-lg max-w-[260px] z-20"
            >
              <Activity className="w-5 h-5 text-[#067F76] mb-2" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Supportive Framework
              </p>
              <p className="text-sm font-bold text-[#023B37] mt-0.5 leading-snug">
                Personalized sessions designed to bring real clarity.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= PHILOSOPHY CALLOUT: Split Balanced Blocks ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-200/60">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#067F76] uppercase block">
              Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#023B37] tracking-tight">
              What is a Learning Clarity Session?
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-slate-600 text-base leading-relaxed font-normal">
            <p>
              Our learning support sessions help you better understand thinking
              styles, focus patterns, and daily experiences. Through thoughtful
              conversations and activities, we explore how you or your child
              learns and navigates the world.
            </p>
            <p className="p-4 bg-[#F5F1EA] rounded-xl text-[#023B37] font-medium border-l-2 border-[#023B37]">
              At Ariad Support Services, we focus on strengths and practical
              growth. Our sessions provide families and individuals throughout
              Uptown, Oak Lawn, and Lakewood with clearer direction and useful
              strategies.
            </p>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE US: Alternating Linear Rows ================= */}
      <div className="bg-white border-y border-slate-200/80 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase mb-2">
              Why Families Choose Us
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#023B37]">
              Supportive learning guidance for the Dallas community
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {valueProps.map((card, idx) => (
              <div
                key={idx}
                className="grid md:grid-cols-12 gap-6 py-8 items-center first:pt-0 last:pb-0 group"
              >
                <div className="md:col-span-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {card.metric}
                  </span>
                  <span className="text-lg font-mono font-bold text-[#067F76]">
                    // 0{idx + 1}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold text-[#023B37] tracking-tight group-hover:text-[#067F76] transition-colors">
                    {card.title}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm text-slate-500 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= EVALUATION TIMELINE: Clean Grid Step Layout ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase">
            The Process
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#023B37] tracking-tight">
            Your supportive learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {evaluationSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-8 relative space-y-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-[#023B37]/5 border border-[#023B37]/10 rounded-xl flex items-center justify-center text-[#023B37]">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                    Phase {step.phase}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#023B37] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#067F76] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Supportive & Confidential
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= REGIONAL CALLOUT: Minimalist Card ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-[#023B37] text-white rounded-3xl p-8 sm:p-12 shadow-xl grid md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="md:col-span-5 space-y-2 relative z-10">
            <span className="text-xs font-bold tracking-widest text-[#67E8D6] uppercase block">
              Dallas Context
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Supporting families in a busy world
            </h3>
          </div>
          <div className="md:col-span-7 text-slate-300 font-normal text-sm sm:text-base leading-relaxed relative z-10">
            Life in Dallas moves quickly. Whether you're navigating school
            pressures, work demands, focus challenges, or simply want better
            daily balance, our learning support sessions offer practical clarity
            and helpful strategies across Oak Lawn, Deep Ellum, and the Park
            Cities.
          </div>
        </div>
      </div>

      {/* ================= PRICING SECTION: Clean Split Container ================= */}
      <div
        id="pricing"
        className="bg-[#F3EFE9] border-t border-slate-200 py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Pricing Left Context */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#023B37]/5 text-[#023B37] text-xs font-bold uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5" />
                Session Rates
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#023B37] tracking-tight leading-tight">
                Honest hourly rates with full transparency.
              </h3>
              <p className="text-slate-600 font-normal text-base leading-relaxed">
                Our learning support sessions include thoughtful conversations,
                activities, and clear guidance. We explain everything upfront so
                you can plan with confidence.
              </p>

              <div className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 max-w-md">
                <Info className="w-4 h-4 text-[#067F76] shrink-0 mt-0.5" />
                <span>
                  Sessions generally require between 8 to 12 total hours,
                  depending on individual needs.
                </span>
              </div>
            </div>

            {/* Pricing Right Rate Card */}
            <div className="lg:col-span-6 w-full max-w-md mx-auto lg:ml-auto">
              <div className="bg-white border-2 border-[#023B37] rounded-2xl p-8 sm:p-10 space-y-6 shadow-md relative">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                    Standard Support
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#023B37] tracking-tight">
                      $200–$250
                    </span>
                    <span className="text-slate-500 text-xs font-bold font-mono">
                      / HR
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#067F76] bg-[#067F76]/5 px-3 py-1.5 rounded inline-block">
                  Expected window: 8–12 Total Hours
                </div>

                <hr className="border-slate-200" />

                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#023B37] uppercase tracking-wider">
                    All-Inclusive Session Elements:
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-600">
                    <li className="flex items-center gap-2.5 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#067F76] shrink-0" />
                      Initial Conversation & Background Review
                    </li>
                    <li className="flex items-center gap-2.5 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#067F76] shrink-0" />
                      Interactive Activities & Exploration
                    </li>
                    <li className="flex items-center gap-2.5 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#067F76] shrink-0" />
                      Personal Feedback Meeting & Practical Guide
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <a
                    href="/contact"
                    className="w-full text-center block bg-[#023B37] hover:bg-[#067F76] text-white font-bold py-4 rounded-xl transition-all text-sm shadow-sm"
                  >
                    Get Started Today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FINAL CALL TO ACTION: Editorial Banner ================= */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
        id="contact"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-[#012321] tracking-tight leading-tight">
            Begin your path to clearer learning.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
            Our team is here to help you gain helpful insight and practical
            strategies. Contact us today to schedule your session.
          </p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#023B37] hover:bg-[#067F76] text-white font-bold px-8 py-4.5 rounded-xl shadow-md transition-all text-sm group"
            >
              Schedule Your Learning Support Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


