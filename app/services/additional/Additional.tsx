"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  FileText,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function AdditionalSupportPage() {
  const scrollTriggerConfig = { once: true, margin: "-100px" };

  const advancedServices = [
    {
      num: "01",
      title: "Parent & Family Guidance Sessions",
      desc: "Practical, supportive coaching for parents and caregivers. We help you build effective strategies, communication tools, and confidence to better support your child’s growth and daily success.",
      rate: "$150",
      unit: "per hour",
      icon: Users,
      tag: "FAMILY SUPPORT",
      highlight: true,
      features: [
        "Custom strategies",
        "Progress tracking",
        "Home implementation support",
      ],
    },
    {
      num: "02",
      title: "School Advocacy & Support",
      desc: "Expert guidance through the school process, record review, and preparation for meetings. We help you secure the right classroom support and accommodations your child needs.",
      rate: "$150–$200",
      unit: "per hour",
      icon: GraduationCap,
      tag: "SCHOOL ADVOCACY",
      features: [
        "School plan review",
        "Meeting preparation",
        "Rights navigation",
      ],
    },
    {
      num: "03",
      title: "Documentation & Forms Support",
      desc: "Professional help preparing, completing, and organizing school forms, accommodation letters, and required documentation for schools or workplaces.",
      rate: "$150",
      unit: "per document",
      icon: FileText,
      tag: "DOCUMENTATION",
      features: [
        "School forms",
        "Workplace support letters",
        "Official paperwork",
      ],
    },
    {
      num: "04",
      title: "Strategic Family Planning",
      desc: "Supportive consultations to help families, schools, or teams create clear, coordinated plans that actually work in real life.",
      rate: "$175–$200",
      unit: "per hour",
      icon: HelpCircle,
      tag: "PLANNING",
      features: [
        "Team coordination",
        "Practical alignment",
        "Long-term support",
      ],
    },
  ];

  return (
    <section className="bg-[#FAF8F5] text-[#12221F]" id="additional-support">
      {/* Hero Section */}
      <div className="bg-[#023B37] pt-24 pb-20 md:pt-32 md:pb-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#067F76]/20 blur-[180px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#67E8D6] text-sm font-semibold tracking-widest">
              <Sparkles className="w-4 h-4" />
              BEYOND SESSIONS
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] mt-6">
              Practical Support
              <br />
              <span className="bg-gradient-to-r from-[#67E8D6] via-[#A5F3E4] to-[#67E8D6] bg-clip-text text-transparent">
                That Makes a Difference
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
              Compassionate guidance and advocacy that turns understanding into
              real-world progress for families and children.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-12 space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#023B37] leading-tight">
                Real support for real life
              </h2>
              <div className="w-20 h-1.5 bg-[#067F76] rounded-full mt-6" />
              <p className="text-stone-600 leading-relaxed mt-8 text-base md:text-lg">
                We don’t stop at insight — we help families and schools turn
                understanding into practical daily success.
              </p>
            </div>

            <div className="bg-[#EFEBE4] border border-[#E0DBCF] rounded-3xl p-6 md:p-8">
              <div className="flex gap-4">
                <Clock className="w-7 h-7 text-[#067F76] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#023B37]">
                    Initial Conversation
                  </p>
                  <p className="text-sm text-stone-600 mt-2">
                    50-minute meeting to understand your needs and goals. Full
                    support begins after this step.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="lg:col-span-8 space-y-8">
            {advancedServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={scrollTriggerConfig}
                  transition={{ delay: idx * 0.08 }}
                  className={`group relative bg-white rounded-3xl p-8 md:p-10 border transition-all duration-500 hover:-translate-y-1 ${
                    service.highlight
                      ? "border-[#067F76] shadow-2xl shadow-[#067F76]/15"
                      : "border-stone-200 hover:border-[#067F76]/30 hover:shadow-xl"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    <div className="shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#067F76]/5 flex items-center justify-center group-hover:bg-[#067F76]/10 transition-colors">
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#067F76]" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-sm font-mono text-[#067F76] tracking-[3px] font-semibold">
                            {service.num}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold text-[#023B37] tracking-tight mt-2 leading-tight">
                            {service.title}
                          </h3>
                        </div>

                        <span className="px-4 py-1.5 text-xs font-bold tracking-widest bg-stone-100 text-stone-500 rounded-xl self-start whitespace-nowrap">
                          {service.tag}
                        </span>
                      </div>

                      <p className="mt-6 text-stone-600 leading-relaxed text-[17px]">
                        {service.desc}
                      </p>

                      {/* Features */}
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {service.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-stone-600"
                          >
                            <CheckCircle className="w-4 h-4 text-[#067F76] shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-10 mt-10 border-t border-stone-100">
                        <div>
                          <span className="text-3xl md:text-4xl font-bold text-[#023B37]">
                            {service.rate}
                          </span>
                          <span className="text-stone-400 text-sm ml-2 font-medium">
                            {service.unit}
                          </span>
                        </div>

                        <a
                          href="/contact"
                          className="group/btn inline-flex items-center justify-center gap-3 bg-[#023B37] hover:bg-[#067F76] text-white font-semibold px-8 py-4 rounded-2xl transition-all active:scale-95 w-full sm:w-auto"
                        >
                          Get Started
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#023B37] py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollTriggerConfig}
          className="max-w-lg mx-auto px-6"
        >
          <Sparkles className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-8 text-[#67E8D6]" />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Ready to move forward?
          </h2>
          <p className="mt-6 text-slate-400 text-base md:text-lg">
            Let’s create a clear, practical plan tailored to your family’s
            unique needs.
          </p>
          <a
            href="/contact"
            className="mt-10 inline-block bg-[#067F76] hover:bg-[#056b63] text-white px-10 py-4 md:px-12 md:py-5 rounded-2xl font-semibold text-base md:text-lg transition-all shadow-xl shadow-[#067F76]/30 hover:shadow-2xl"
          >
            Schedule Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
