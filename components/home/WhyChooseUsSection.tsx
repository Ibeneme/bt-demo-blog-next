"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Layers,
  HeartHandshake,
  Award,
  FileCheck2,
  CalendarCheck2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function WhyChooseUsSection() {
  const [openId, setOpenId] = useState<string | null>("item-0");

  const accordionData: AccordionItem[] = [
    {
      id: "item-0",
      title: "Comprehensive Services",
      description:
        "From initial consultations to in-depth psychological assessments, we offer a broad range of services tailored to meet the unique needs of our clients.",
      icon: <Layers className="w-5 h-5 text-[#067F76]" />,
    },
    {
      id: "item-1",
      title: "Client-Centered Approach",
      description:
        "We take a collaborative approach to working with clients and their families, ensuring that treatment plans are personalized and focused on achieving long-term success.",
      icon: <HeartHandshake className="w-5 h-5 text-[#067F76]" />,
    },
    {
      id: "item-2",
      title: "Experienced Professionals",
      description:
        "Our team is composed of highly trained, licensed professionals with a wealth of experience in psychological evaluation, therapy, and consultation.",
      icon: <Award className="w-5 h-5 text-[#067F76]" />,
    },
    {
      id: "item-3",
      title: "Evidence-Based Practices",
      description:
        "We utilize the most current, research-backed methods to ensure that our assessments and interventions are both effective and reliable.",
      icon: <FileCheck2 className="w-5 h-5 text-[#067F76]" />,
    },
  ];

  return (
    <section
      className="bg-slate-50 py-16 sm:py-24 lg:py-36 relative overflow-hidden text-slate-800"
      id="why-choose-us"
    >
      <div className="absolute top-1/4 -left-48 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#067F76]/5 blur-[80px] sm:blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* --- LEFT SIDE --- */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Content... */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#023B37]/5 border border-[#023B37]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#067F76]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#067F76] font-extrabold">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#023B37] tracking-tight leading-tight">
              Discover the Benefits of Choosing ARIAD Psychological Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#067F76] to-[#D6C1A0] rounded-full pt-1" />
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base font-light leading-relaxed">
              We stand dedicated to providing expert care and gold-standard
              diagnostic insights right here in Dallas, TX. Our frameworks
              combine deep clinical knowledge with compassionate attention to
              detail.
            </p>
          </div>

          {/* --- RIGHT SIDE: ACCORDION TRACK --- */}
          <div className="lg:col-span-7 space-y-4 w-full">
            {accordionData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <motion.div
                  key={item.id}
                  className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white "
                  initial={false}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        {item.icon}
                      </div>
                      <span className="text-sm sm:text-base lg:text-lg font-extrabold text-[#023B37] tracking-tight">
                        {item.title}
                      </span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pt-0 sm:px-6 sm:pb-8 ml-0 sm:ml-14">
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
