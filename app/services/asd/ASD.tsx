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
  Heart,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Calendar,
  DollarSign,
  Info,
} from "lucide-react";

export default function AutismUnderstandingSection() {
  const [activeStep, setActiveStep] = useState(0);
  const scrollTriggerConfig = { once: true, margin: "-100px" };

  const evaluationSteps = [
    {
      icon: Clock,
      phase: "Phase 1",
      title: "Learning Your Story",
      desc: "We start with a warm, open conversation with you. We talk about your concerns, your child's milestones, and the everyday moments that bring up questions.",
    },
    {
      icon: Heart,
      phase: "Phase 2",
      title: "Play and Interaction",
      desc: "Instead of rigid activities, we use structured play, puzzles, and natural conversations. This allows us to observe how your child communicates and connects in a safe, stress-free space.",
    },
    {
      icon: Award,
      phase: "Phase 3",
      title: "The Roadmap Meeting",
      desc: "We sit down together to review a complete, easy-to-read guide. You will walk away knowing exactly how to get support from schools and your community.",
    },
  ];

  return (
    <section
      className="bg-[#FCFAF7] text-[#112421] antialiased overflow-hidden selection:bg-[#067F76]/20"
      id="autism-understanding"
    >
      {/* Editorial Gallery Split Hero */}
      <div className="relative min-h-[90vh] flex items-center bg-[#012321] text-white pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(103,232,214,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#067F76]/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#67E8D6] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Dallas Developmental Support
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Clear Answers. <br />
              <span className="text-[#67E8D6]">Gentle Guidance.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Discover exactly how your child experiences the world. We offer
              comprehensive, deeply compassionate autism understanding sessions
              for children, teenagers, and families across Dallas.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="bg-white text-[#012321] hover:bg-slate-100 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg"
              >
                View Transparent Pricing
              </a>
              <a
                href="/contact"
                className="border border-white/20 hover:border-white/40 px-6 py-3.5 rounded-xl font-bold text-sm transition-all text-white flex items-center gap-2"
              >
                Speak With Our Team
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          {/* Hero Right Content - Artistic Layered Frames */}
          <div className="lg:col-span-6 relative h-[480px] w-full hidden sm:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollTriggerConfig}
              transition={{ duration: 0.8 }}
              className="absolute left-4 top-4 w-2/3 aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-[#012321] shadow-2xl z-20"
            >
              <Image
                src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Welcoming family space"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollTriggerConfig}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ zIndex: 99 }}
              className="absolute right-4 bottom-4 w-1/2 aspect-square rounded-[2rem] overflow-hidden border-4 border-[#012321] shadow-xl z-10 opacity-60 bg-[#067F76]"
            >
              <div className="w-full h-full p-8 flex flex-col justify-end text-white">
                <Sparkles className="w-8 h-8 text-[#67E8D6] mb-4" />
                <p className="font-bold text-lg leading-snug">
                  Tailored entirely to your children & family’s pace.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Philosophy Callout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 sm:p-12 shadow-sm grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase">
              A Better Perspective
            </h2>
            <p className="text-3xl font-bold text-[#023B37] tracking-tight">
              An assessment is the key to new doors.
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="text-slate-600 font-normal text-base leading-relaxed">
              At Ariad Support Services, we do not view autism as a problem to
              solve. We view it as a unique blueprint for how a person thinks,
              learns, and communicates. Finding the right answer brings real
              peace of mind and gives you the exact tools to help your child
              flourish in school and life.
            </p>
          </div>
        </div>
      </div>

      {/* Asymmetric Three-Card Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase mb-2">
            Why Families Choose Us
          </h2>
          <p className="text-3xl sm:text-5xl font-bold tracking-tight text-[#023B37]">
            Three core pillars of our care
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Unhurried, Whole-Person Care",
              desc: "We combine careful observation and parent storytelling. This ensures we understand your child's complete developmental growth, strengths, and struggles.",
            },
            {
              num: "02",
              title: "Trusted Neighborhood Guides",
              desc: "Our experienced neighborhood team provides reliable answers you can trust, right here in the Dallas, Highland Park, and Oak Lawn areas.",
            },
            {
              num: "03",
              title: "A Custom Space for Your Child",
              desc: "No child fits perfectly into a template. We modify our space and approach to make sure your child feels completely safe, calm, and relaxed throughout the day.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollTriggerConfig}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between min-h-[320px] relative overflow-hidden group hover:shadow-md transition-all"
            >
              <div className="text-5xl font-black text-slate-100 group-hover:text-[#067F76]/10 transition-colors">
                {card.num}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#023B37] tracking-tight">
                  {card.title}
                </h3>
                <p className="text-slate-500 font-normal text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Horizontal Interactive Sliding Process Split */}
      <div className="bg-[#023B37] text-white py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Steps Controller Left */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold tracking-widest text-[#67E8D6] uppercase">
                What to Expect
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                A gentle and supportive experience
              </h3>
              <div className="space-y-3 pt-4">
                {evaluationSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 ${
                      activeStep === idx
                        ? "bg-white text-[#023B37] border-white shadow-xl scale-[1.01]"
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

            {/* Display Window Right */}
            <div className="lg:col-span-7 bg-[#012321] rounded-[2.5rem] p-8 sm:p-12 min-h-[320px] flex flex-col justify-between border border-white/5 relative shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#67E8D6]">
                    {React.createElement(evaluationSteps[activeStep].icon, {
                      className: "w-6 h-6",
                    })}
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    {evaluationSteps[activeStep].title}
                  </h4>
                  <p className="text-slate-300 font-normal text-base leading-relaxed max-w-xl">
                    {evaluationSteps[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-2 mt-8 pt-4 border-t border-white/10 text-xs text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#67E8D6]" />
                <span>Confidential • Personalized approach</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Perks and Real-World Value Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-[#067F76] uppercase mb-2">
            The Advantages
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-[#023B37] tracking-tight">
            How our support changes your family dynamic
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Calendar,
              title: "Quick and Flexible Scheduling",
              desc: "We understand that waiting for answers can feel stressful. We offer flexible appointment slots to get you seen quickly.",
            },
            {
              icon: Users,
              title: "A Team Approach to Support",
              desc: "We gladly collaborate with your teachers and other important people in your child's life. This ensures everyone stays aligned on the support plan.",
            },
            {
              icon: Sparkles,
              title: "Deeply Local Insight",
              desc: "We understand the specific requirements for public and private school accommodations across Dallas, helping you secure real classroom support with ease.",
            },
          ].map((perk, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/60 p-8 rounded-2xl space-y-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-[#067F76]/5 text-[#067F76] flex items-center justify-center">
                <perk.icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg text-[#023B37] tracking-tight">
                {perk.title}
              </h4>
              <p className="text-slate-500 font-normal text-sm leading-relaxed">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Transparent Pricing Section */}
      <div
        id="pricing"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="bg-[#F3EFE9] rounded-[2.5rem] p-8 sm:p-16 border border-slate-200 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#023B37]/5 text-[#067F76] text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              Transparent Pricing
            </div>
            <h3 className="text-3xl sm:text-5xl font-bold text-[#023B37] tracking-tight leading-tight">
              Honest rates with no hidden surprises.
            </h3>
            <p className="text-slate-600 font-normal text-base leading-relaxed">
              Our sessions are comprehensive and involve thoughtful activities,
              observations, and detailed guidance. We spell out our hours
              clearly so you can plan with confidence.
            </p>
            <div className="flex items-start gap-3 bg-white/60 p-4 rounded-xl border border-slate-300/50 text-xs text-slate-500 max-w-md">
              <Info className="w-4 h-4 text-[#067F76] shrink-0 mt-0.5" />
              <span>
                Sessions usually require between 8 to 12 hours total, depending
                on your child's age and needs.
              </span>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="bg-[#023B37] text-white rounded-[2rem] p-8 sm:p-10 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-xs font-bold uppercase tracking-widest bg-white/10 rounded-bl-xl text-[#67E8D6]">
                Full Session Package
              </div>
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-wider text-slate-300 font-semibold">
                  Rate Matrix
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-bold text-white">
                    $200–$250
                  </span>
                  <span className="text-slate-400 text-sm">/ per hour</span>
                </div>
              </div>
              <hr className="border-white/10" />
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#67E8D6] uppercase tracking-wider">
                  What is completely covered:
                </p>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#67E8D6] shrink-0" />
                    Initial Conversation & Parent Intake
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#67E8D6] shrink-0" />
                    Play-Based Activities & Observation
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#67E8D6] shrink-0" />
                    Personal Feedback Meeting & Actionable Guide
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <a
                  href="/contact"
                  className="w-full text-center block bg-[#67E8D6] hover:bg-[#52d1bf] text-[#012321] font-bold py-3.5 rounded-xl transition-all text-sm"
                >
                  Get Started Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modernist Final Call-To-Action Block */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        id="contact"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollTriggerConfig}
          className="bg-gradient-to-br from-[#012321] to-[#023B37] text-white rounded-[2.5rem] p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Begin your child's journey with clarity.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
              Our team is ready to help you understand your child's unique
              learning and development path. Reach out today to schedule your
              session.
            </p>
            <div className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#67E8D6] to-[#067F76] text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-[#067F76]/10 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-98 group"
              >
                Schedule Your Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
