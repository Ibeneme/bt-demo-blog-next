"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Users,
  Clock,
  Award,
  ArrowRight,
  Brain,
  Heart,
  Target,
  Sparkles,
  MapPin,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

export default function AdhdAssessmentSection() {
  const [activeStep, setActiveStep] = useState(0);
  const scrollTriggerConfig = { once: true, margin: "-100px" };

  const steps = [
    {
      icon: Clock,
      phase: "Step 01",
      title: "A Friendly Conversation",
      desc: "We sit down together to talk about your daily life, your history, and the specific things that feel challenging or frustrating for you or your child.",
    },
    {
      icon: Brain,
      phase: "Step 02",
      title: "Simple, Focused Activities",
      desc: "We use puzzles, memory games, and standard focus tasks. There are no pass or fail grades here; it just helps us see exactly how your unique brain handles attention.",
    },
    {
      icon: Award,
      phase: "Step 03",
      title: "Your Personalized Action Plan",
      desc: "We meet again to explain your results in plain, simple English. You leave with a clear roadmap of exactly what to do next at school, work, and home.",
    },
  ];

  return (
    <section
      className="bg-[#FAF9F5] text-[#1C2E2A] antialiased overflow-hidden selection:bg-[#067F76]/20"
      id="adhd-testing"
    >
      {/* Immersive Editorial Split Hero */}
      <div className="relative min-h-[85vh] flex items-center lg:py-0 py-16 bg-gradient-to-b from-[#012321] to-[#011C1A] text-white">
        {/* Decorative Grid Overlay & Light Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(#067F76_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#067F76]/30 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#67E8D6]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 relative z-10 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={scrollTriggerConfig}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#67E8D6] text-xs font-semibold uppercase tracking-wider"
            >
              <MapPin className="w-3.5 h-3.5" />
              Dallas ADHD Support
            </motion.div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              Turn Everyday Frustration <br />
              <span className="text-[#67E8D6]">Into Clear Direction.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              We offer welcoming, easy-to-understand ADHD testing for kids,
              teenagers, and adults. Get the real answers and tools you need to
              thrive.
            </p>
          </div>

          {/* Right Floating Image Container */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={scrollTriggerConfig}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] p-3 bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=80&w=2070&auto=format&fit=crop"
                  alt="Comfortable testing room"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-103"
                  priority
                />
              </div>

              {/* Floating Reassurance Badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#067F76] text-white p-5 rounded-2xl max-w-[220px] hidden sm:block border border-white/10">
                <Sparkles className="w-5 h-5 text-[#67E8D6] mb-2" />
                <p className="text-xs font-medium leading-normal">
                  A comfortable, stress-free environment built for your peace of
                  mind.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Human-Centered Context Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-[#023B37]/10">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4">
            <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase">
              Our Core Philosophy
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl sm:text-2xl font-normal text-[#023B37] leading-relaxed">
              Testing isn't about labeling you or your child. At ARIAD, we look
              past the surface to find out how your brain naturally works,
              helping you secure school accommodations and workplace support
              with complete confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Asymmetric Core Pillars Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase mb-2">
            Why Families Trust Us
          </h2>
          <p className="text-3xl sm:text-5xl font-bold tracking-tight text-[#023B37]">
            Four things we do differently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: "01",
              title: "Compassionate Doctors",
              desc: "Our licensed specialists are deeply caring experts who know how to make children and adults feel safe and heard.",
            },
            {
              num: "02",
              title: "Built Just For You",
              desc: "We customize our questions and activities to fit your specific age, lifestyle, challenges, and goals perfectly.",
            },
            {
              num: "03",
              title: "Local School Experts",
              desc: "We know exactly what Dallas, Oak Lawn, and Highland Park schools look for to approve accommodations quickly.",
            },
            {
              num: "04",
              title: "Crystal-Clear Reports",
              desc: "You receive a comprehensive, easy-to-read document that lists your exact next steps for school plans, work, and therapy.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollTriggerConfig}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-200/60 flex flex-col justify-between aspect-[8/5] md:aspect-[4/5] hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="text-3xl font-bold text-slate-200 group-hover:text-[#067F76] transition-colors">
                {item.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#023B37] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 font-normal text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Immersive Interactive Step Window */}
      <div className="bg-[#023B37] text-white py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Controller Panel */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold tracking-widest text-[#67E8D6] uppercase">
                The Simple Process
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                What to expect during your visit
              </h3>

              <div className="space-y-3 pt-4">
                {steps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 ${
                      activeStep === idx
                        ? "bg-white text-[#023B37] border-white  scale-[1.01]"
                        : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          activeStep === idx
                            ? "bg-[#023B37]/10 text-[#023B37]"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {step.phase}
                      </span>
                      <span className="font-semibold tracking-tight text-base">
                        {step.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeStep === idx ? "rotate-90 text-[#023B37]" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Display Screen Container */}
            <div className="lg:col-span-7 bg-[#012321] rounded-[2rem] p-8 sm:p-12 min-h-[300px] flex flex-col justify-between border border-white/5 relative  overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 relative z-10"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#67E8D6]">
                    {React.createElement(steps[activeStep].icon, {
                      className: "w-6 h-6",
                    })}
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    {steps[activeStep].title}
                  </h4>
                  <p className="text-slate-300 font-normal text-base leading-relaxed max-w-xl">
                    {steps[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-2 mt-8 pt-4 border-t border-white/10 text-xs text-slate-400 font-medium">
                <HelpCircle className="w-3.5 h-3.5 text-[#67E8D6]" />
                <span>No hidden steps • Fully confidential</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase mb-2">
            Life After Testing
          </h2>
          <p className="text-3xl sm:text-5xl font-bold text-[#023B37] tracking-tight">
            How getting answers changes everything
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Target,
              title: "Understand Your Brain",
              desc: "Stop fighting your natural habits. Learn how to arrange your daily schedule, school tasks, or office space to match how your brain works.",
            },
            {
              icon: Users,
              title: "Get School and Work Support",
              desc: "Receive the official, verified paperwork needed to set up school 504 Plans, specialized IEPs, or helpful workplace adjustments.",
            },
            {
              icon: Heart,
              title: "Relief and Peace of Mind",
              desc: "Let go of years of self-doubt and guilt. Knowing there is a simple biological reason for your struggles brings deep emotional relief.",
            },
            {
              icon: CheckCircle,
              title: "Practical Daily Strategies",
              desc: "Walk away with real-world, proven habits and tools designed to help you stay organized, finish tasks, and feel confident.",
            },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollTriggerConfig}
              className="flex flex-col sm:flex-row gap-5 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/60  transition-all"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#067F76]/5 text-[#067F76] flex items-center justify-center">
                <benefit.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg text-[#023B37] tracking-tight">
                  {benefit.title}
                </h4>
                <p className="text-slate-500 font-normal text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modernist Geometric Call-To-Action Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollTriggerConfig}
          className="relative bg-gradient-to-br from-[#012321] to-[#023B37] text-white rounded-[2.5rem] p-8 sm:p-16 text-center overflow-hidden "
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#67E8D6]/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Ready to find the answers you deserve?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
              You don't have to navigate this alone. Take the first step toward
              clarity and schedule a welcoming, stress-free evaluation today.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#67E8D6] to-[#067F76] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-98 group"
              >
                Schedule ADHD Assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
