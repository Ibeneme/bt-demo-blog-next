"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  FileCheck,
  Lock,
  ArrowRight,
  MapPin,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Scale,
  UserCheck,
  Building2,
  DollarSign,
} from "lucide-react";

export default function LearningClarityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollTriggerConfig = { once: true, margin: "-100px" };

  const features = [
    {
      num: "01",
      title: "Thoughtful Insight Process",
      desc: "We use a structured, supportive approach to help map focus patterns, decision-making style, and personal strengths in a calm and respectful way.",
      icon: ShieldAlert,
    },
    {
      num: "02",
      title: "Clear & Practical Summaries",
      desc: "You receive straightforward, easy-to-understand feedback with practical next steps tailored to your situation and goals.",
      icon: FileCheck,
    },
    {
      num: "03",
      title: "Fully Private & Secure",
      desc: "Your information is handled with the highest level of care and confidentiality throughout the entire process.",
      icon: Lock,
    },
  ];

  const faqs = [
    {
      q: "How does the process work at Ariad Support Services?",
      a: "We start with a relaxed conversation followed by guided activities. Everything is done in a supportive setting at our Dallas location using thoughtful, structured steps.",
    },
    {
      q: "Who leads these sessions?",
      a: "Our experienced local team guides each session with care and professionalism.",
    },
    {
      q: "Do you offer support for professional roles?",
      a: "Yes, we work with individuals in high-responsibility positions and can coordinate with organizations for group or individual sessions.",
    },
  ];

  return (
    <section
      className="bg-[#FCFAF7] text-[#112421] antialiased selection:bg-[#067F76]/20"
      id="learning-clarity"
    >
      {/* ----------------- HERO SECTION: Bold Executive Split ----------------- */}
      <div className="relative bg-[#023B37] pt-[214px] text-white pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Main Block */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-[#67E8D6] text-xs font-mono tracking-wider uppercase">
                <MapPin className="w-3.5 h-3.5" />
                Dallas Support Center
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Supportive Clarity Sessions <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67E8D6] to-[#A3EEDF]">
                  In Dallas, TX.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
                At Ariad Support Services, we offer thoughtful, structured
                sessions to help individuals and professionals gain clearer
                insight into their focus, strengths, and daily performance.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="bg-[#067F76] hover:bg-[#05665F] text-white px-7 py-4 rounded-xl font-bold text-sm transition-all shadow-lg"
                >
                  Schedule Your Session
                </a>
                <a
                  href="/contact"
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-7 py-4 rounded-xl font-bold text-sm transition-all"
                >
                  View Rates ($250)
                </a>
              </div>
            </div>

            {/* Right Hero Badge Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 backdrop-blur-sm">
                <Scale className="w-6 h-6 text-[#67E8D6]" />
                <p className="font-bold text-sm">Professional Roles</p>
                <p className="text-xs text-slate-400">
                  Support tailored for high-responsibility positions.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 backdrop-blur-sm">
                <UserCheck className="w-6 h-6 text-[#67E8D6]" />
                <p className="font-bold text-sm">Security & Safety Teams</p>
                <p className="text-xs text-slate-400">
                  Practical insight for demanding roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- CORE OVERVIEW: Editorial Statement ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 sm:p-12 shadow-sm grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold text-[#067F76] uppercase tracking-widest block mb-2">
              Our Approach
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#023B37] tracking-tight">
              Why Choose Ariad for Learning Clarity Sessions?
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 text-slate-600 font-normal text-base leading-relaxed">
            <p>
              Ariad Support Services offers thoughtful learning clarity sessions
              in Dallas, TX, in a supportive and professional setting. Whether
              you’re an individual seeking personal insight or an organization
              supporting your team, we provide practical, tailored guidance.
            </p>
            <p className="text-sm border-l-4 border-[#067F76] pl-4 italic text-[#023B37] font-medium bg-[#FCFAF7] py-3 rounded-r-lg">
              We understand the demands of high-responsibility roles. Our Dallas
              center delivers clear, practical sessions that help individuals
              feel more prepared and confident in their daily work.
            </p>
          </div>
        </div>
      </div>

      {/* ----------------- THREE FEATURES COLUMN LAYOUT ----------------- */}
      <div className="bg-white border-y border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold text-[#067F76] uppercase block mb-1">
              // Session Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#023B37] tracking-tight">
              Support for Professionals and Teams in Dallas
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div key={idx} className="space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#FCFAF7] border border-slate-200 flex items-center justify-center text-[#023B37] group-hover:bg-[#023B37] group-hover:text-white transition-all">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-400 font-bold block">
                    {item.num}.
                  </span>
                  <h3 className="text-lg font-bold text-[#023B37] tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------- THE IMPORTANCE SECTION: Text Focus ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#067F76] uppercase tracking-widest block">
              Practical Support
            </span>
            <h2 className="text-3xl font-extrabold text-[#023B37] tracking-tight">
              Why Clarity Sessions Matter for High-Responsibility Roles
            </h2>
            <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed">
              In Dallas, professionals in demanding roles need strong focus,
              clear decision-making, and emotional balance. Our sessions help
              individuals better understand their strengths and develop
              practical strategies for success under pressure.
            </p>
          </div>
          <div className="lg:col-span-6 bg-[#F3EFE9] rounded-3xl p-8 border border-slate-300/40 space-y-4">
            <Building2 className="w-8 h-8 text-[#023B37]" />
            <p className="font-bold text-[#023B37] text-lg">
              Dallas Professional & Team Solutions
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We coordinate with organizations, security teams, and individuals
              throughout Uptown, North Dallas, and surrounding areas for smooth
              scheduling and practical support.
            </p>
          </div>
        </div>
      </div>

      {/* ----------------- TRANSPARENT PRICING ----------------- */}
      <div
        id="pricing"
        className="bg-[#012321] text-white py-24 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#67E8D6] tracking-wider uppercase block">
              Transparent Investment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Session Cost Structure
            </h2>
          </div>

          <div className="max-w-md mx-auto bg-white text-[#112421] rounded-2xl p-8 border border-slate-200 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block">
                Standard Session Rate
              </span>
              <div className="flex items-center justify-center gap-1">
                <DollarSign className="w-6 h-6 text-[#067F76] font-bold" />
                <span className="text-5xl font-black text-[#023B37] tracking-tight">
                  250
                </span>
                <span className="text-slate-400 font-mono text-xs font-bold">
                  / SESSION
                </span>
              </div>
            </div>

            <hr className="border-slate-100" />

            <ul className="text-left space-y-3 text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#067F76] shrink-0" />{" "}
                Full structured clarity session
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#067F76] shrink-0" />{" "}
                Clear summary and practical guidance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#067F76] shrink-0" />{" "}
                Complete confidentiality
              </li>
            </ul>

            <a
              href="/contact"
              className="block w-full text-center bg-[#023B37] hover:bg-[#067F76] text-white font-bold py-4 rounded-xl transition-all text-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* ----------------- INTERACTIVE FAQS ----------------- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-2 mb-12">
          <HelpCircle className="w-6 h-6 text-[#067F76] mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#023B37] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 font-normal text-sm">
            Clear answers about our support sessions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 text-[#023B37] hover:text-[#067F76] transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base tracking-tight">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#067F76]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-slate-500 leading-relaxed font-normal border-t border-slate-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* ----------------- ACCENTED FINAL CTA ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollTriggerConfig}
          className="bg-gradient-to-br from-[#023B37] to-[#012321] text-white rounded-[2rem] p-8 sm:p-16 relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#067F76]/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Contact Ariad Support Services Today
            </h2>
            <p className="text-slate-300 font-normal text-base leading-relaxed max-w-xl mx-auto">
              We’re here to help individuals and teams gain clearer insight and
              practical support. Reach out today to schedule a session.
            </p>
            <div className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#067F76] hover:bg-[#52d1bf] text-white font-bold px-8 py-4.5 rounded-xl transition-all shadow-md group text-sm"
              >
                Schedule Your Clarity Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
