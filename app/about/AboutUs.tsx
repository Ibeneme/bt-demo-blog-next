"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Brain,
  HeartHandshake,
  Sparkles,
  GraduationCap,
  Calendar,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Send,
  UserCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import drAdodoImg from "../../assests/about/ibie.jpeg";
import jasmine from "../../assests/about/jaswin.png";
import SEO from "@/components/SEO";
// Add these new images to your assets folder and import them:
// import jaswinImg from "../../assests/images/jaswin-john.png";
// import agueseImg from "../../assests/images/aguese-ibie.png";

const coreValues = [
  {
    icon: Brain,
    title: "Evidence-Based Insights",
    desc: "We combine standard clinical research practices with customized diagnostics to truly understand the mind's inner workings.",
    color: "bg-[#023B37]/10 text-[#023B37]",
  },
  {
    icon: HeartHandshake,
    title: "Compassionate Support",
    desc: "Psychological testing isn't just about hard data. We emphasize comfort, psychological safety, and validating paths to growth.",
    color: "bg-[#067F76]/10 text-[#067F76]",
  },
  {
    icon: Sparkles,
    title: "Neurodiversity Affirming",
    desc: "We view differences as unique frameworks, not deficits. Our insights celebrate neurodiversity while building tools for challenges.",
    color: "bg-[#8C6D53]/10 text-[#8C6D53]",
  },
];

const faqs = [
  {
    id: "faq-0",
    q: "What types of psychological testing do you offer?",
    a: "We provide comprehensive assessments for ADHD, autism, learning disabilities, mood disorders (e.g., anxiety, depression), cognitive functioning, and more. Our evaluations are tailored to children, teens, and adults.",
  },
  {
    id: "faq-1",
    q: "How long does testing take, and what’s the process?",
    a: "Testing typically involves 1–3 sessions (2–6 hours total), including clinical interviews, standardized testing batteries, and a comprehensive feedback meeting. A detailed report with diagnoses and highly specific recommendations is delivered within a few weeks.",
  },
  {
    id: "faq-2",
    q: "Do you accept insurance for psychological testing?",
    a: "Yes! We work with United Healthcare, BlueCross/BlueShield, AETNA, and Cigna providers for testing services. Coverage varies, so we highly recommend verifying your benefits beforehand. Self-pay options and dynamic payment plans are also readily available.",
  },
  {
    id: "faq-3",
    q: "Can testing help with school or workplace accommodations?",
    a: "Absolutely. Our clinical reports include evidence-based diagnoses and tailored recommendations explicitly mapped to legal requirements for IEP/504 plans, collegiate accommodations, or workplace adjustments.",
  },
  {
    id: "faq-4",
    q: "How do I prepare for my testing appointment?",
    a: "Bring any prior medical or school records, secure a great night's sleep, and eat a balanced meal beforehand. For young children, explain the process positively: 'We're going to see a friendly specialist to play some games and figure out how your brain learns best!'",
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
    } as const,
  },
};

export default function AboutUs() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <SEO
        title="About Us | Meet Our Team"
        description="Meet the dedicated clinicians at ARIAD Psychological Services in Dallas and Houston. Learn about our experienced team providing compassionate psychological and neuropsychological assessments."
        image={drAdodoImg}
        keywords="ARIAD Psychological Services, Dallas psychologist, Houston psychologist, psychometrist, neuropsychological evaluation, autism assessment, ADHD testing"
      />

      <div className="bg-[#FCFDFD] text-slate-800 overflow-x-hidden selection:bg-[#067F76] selection:text-white">
        {/* --- HERO SECTION (DARK GREEN) --- */}
        <section className="relative py-28 sm:py-40 bg-gradient-to-b from-[#011211] to-[#023B37] text-white overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#067F76]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#8C6D53]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
            >
              <span className="font-semibold tracking-wider uppercase text-xs text-emerald-300/90">
                Meet Ariad Psychological
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white"
            >
              Guiding Minds. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E1CE] via-[#067F76] to-[#CBB199]">
                Empowering Growth.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-3xl mx-auto text-lg sm:text-xl text-emerald-100/70 font-light leading-relaxed"
            >
              Meet the dedicated, multi-disciplinary clinicians combining
              cutting-edge clinical research with deep empathy to help your
              family thrive.
            </motion.p>
          </div>
        </section>

        {/* --- OUR CORE VALUES --- */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 z-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-[#067F76]/30 hover:shadow-[0_20px_50px_rgba(6,127,118,0.06)] transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#023B37] mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- CLINICAL TEAM SECTION --- */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FCFDFD]">
          <div className="text-center lg:text-left mb-24">
            <span className="text-sm font-bold text-[#067F76] tracking-widest uppercase block mb-2">
              Our Foundation
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#023B37]">
              The Medical Experts
            </h2>
          </div>

          <div className="space-y-40">
            {/* Dr. Isoken Adodo */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-5 group relative">
                <div className="absolute inset-0 bg-[#067F76]/10 rounded-[3rem] transform rotate-3 scale-102 group-hover:rotate-1 transition-transform duration-500 pointer-events-none" />
                <div className="rounded-[3rem] overflow-hidden aspect-[4/5] bg-slate-100 relative shadow-xl z-10 border border-slate-200">
                  <Image
                    src={drAdodoImg}
                    alt="Dr. Isoken Adodo"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6 lg:pl-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#023B37]/5 text-[#023B37] text-xs font-semibold border border-[#023B37]/10">
                  <ShieldCheck className="w-3.5 h-3.5" /> Clinical Director
                </div>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-[#023B37] tracking-tight">
                  Isoken Adodo,{" "}
                  <span className="font-light text-[#067F76]">PhD, LP</span>
                </h3>
                <p className="text-lg text-[#067F76] font-semibold tracking-wide">
                  Owner & Founder of Ariad Psychological Services
                </p>
                <div className="h-0.5 w-20 bg-[#8C6D53]" />
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  Dr. Adodo is a highly revered Licensed Psychologist and
                  Certified School Psychologist specializing in detailed
                  neurodevelopmental and psychological diagnostics across the
                  lifespan. She launched ARIAD to bridge the gap between
                  meticulous empirical diagnostics and patient-first, welcoming
                  care. Her practice focuses heavily on ADHD mapping, subtle
                  presentations of autism, and intricate adolescent mood
                  disorders.
                </p>
              </div>
            </motion.div>

            {/* Jaswin John */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-5 lg:order-2 group relative">
                <div className="absolute inset-0 bg-[#8C6D53]/10 rounded-[3rem] transform -rotate-3 scale-102 group-hover:-rotate-1 transition-transform duration-500 pointer-events-none" />
                <div className="rounded-[3rem] overflow-hidden aspect-[4/5] bg-slate-100 relative shadow-xl z-10 border border-slate-200">
                  {/* Replace with actual image once added */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400">
                    <Image
                      src={jasmine}
                      alt="Dr. Isoken Adodo"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 lg:order-1 space-y-6 lg:pr-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C6D53]/10 text-[#8C6D53] text-xs font-semibold border border-[#8C6D53]/20">
                  <GraduationCap className="w-3.5 h-3.5" /> Clinical Manager /
                  Psychometrist
                </div>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-[#023B37] tracking-tight">
                  Jaswin John
                </h3>
                <p className="text-lg text-[#8C6D53] font-semibold tracking-wide">
                  Clinical Manager / Psychometrist
                </p>
                <div className="h-0.5 w-20 bg-[#067F76]" />
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  Jaswin John believes that feeling truly heard can make all the
                  difference. As a psychological associate based in Houston,
                  Texas, she is committed to creating a safe and welcoming space
                  where clients feel comfortable being themselves.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  Jaswin holds a Master of Arts in Clinical Psychology from
                  Texas Southern University and works under licensed supervision
                  to provide psychological and psychoeducational assessments as
                  well as individual psychotherapy for clients ranging from
                  children to older adults. She uses evidence-based approaches
                  and standardized assessment tools to understand each person’s
                  needs.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  Her journey into psychology grew out of a genuine curiosity
                  about people. She has served as an Adjunct Faculty member at
                  Lone Star College and as a Graduate Teaching Assistant at
                  Texas Southern University. She brings warmth and cultural
                  sensitivity to every session and is working toward her
                  long-term goal of earning a doctoral degree in clinical
                  psychology.
                </p>
              </div>
            </motion.div>

            {/* Aguese Ibie */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-5 group relative">
                <div className="absolute inset-0 bg-[#067F76]/10 rounded-[3rem] transform rotate-3 scale-102 group-hover:rotate-1 transition-transform duration-500 pointer-events-none" />
                <div className="rounded-[3rem] overflow-hidden aspect-[4/5] bg-slate-100 relative shadow-xl z-10 border border-slate-200 flex items-center justify-center">
                  <div className="flex flex-col items-center text-center text-slate-400">
                    <UserCircle className="w-24 h-24 mb-4" />
                    <p className="text-sm font-medium">Aguese Ibie</p>
                    <p className="text-xs">Business Development Manager</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6 lg:pl-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#023B37]/5 text-[#023B37] text-xs font-semibold border border-[#023B37]/10">
                  Business Development
                </div>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-[#023B37] tracking-tight">
                  Aguese Ibie
                </h3>
                <p className="text-lg text-[#067F76] font-semibold tracking-wide">
                  Business Development Manager
                </p>
                <div className="h-0.5 w-20 bg-[#8C6D53]" />
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  Aguese Ibie serves as the Business Development Manager for
                  ARIAD Psychological Services, PLC. He is responsible for
                  cultivating strategic partnerships, expanding referral
                  networks, and fostering collaborative relationships with
                  healthcare providers, schools, community organizations, and
                  other professionals.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  With a strong background in relationship-building and
                  community engagement, Aguese works closely with medical
                  practices, educational institutions, advocacy organizations,
                  and behavioral health providers to increase access to
                  high-quality psychological assessment services.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  Organizations interested in collaborating with ARIAD
                  Psychological Services, discussing referral partnerships,
                  hosting educational presentations, or exploring community
                  outreach opportunities are encouraged to reach out.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="py-24 bg-slate-50 relative border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-widest text-[#067F76] uppercase bg-[#067F76]/10 px-3 py-1 rounded-full">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#023B37] mt-4">
                Testing Clarified
              </h2>
              <p className="text-slate-500 mt-2">
                Everything you need to know about setting up your assessment
                pathway.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-2xl transition-all duration-300 ${
                      isOpen
                        ? "shadow-[0_15px_30px_rgba(2,59,55,0.04)] border-[#067F76]"
                        : "shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:border-slate-300"
                    } border border-slate-200 overflow-hidden`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full px-6 py-5 flex justify-between items-center text-left font-bold text-[#023B37] text-lg gap-4 group"
                    >
                      <span className="group-hover:text-[#067F76] transition-colors duration-200">
                        {faq.q}
                      </span>
                      <div
                        className={`p-2 rounded-xl transition-colors duration-300 ${
                          isOpen
                            ? "bg-[#023B37] text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transform transition-transform duration-300 ease-out ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.25, 1, 0.5, 1],
                          }}
                        >
                          <div className="overflow-hidden">
                            <p className="px-6 pb-6 pt-1 text-slate-600 leading-relaxed font-light border-t border-slate-100">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
