"use client";

import Image from "next/image";
import logo from "../../assests/images/logo_a.png";
import { ArrowUp, Mail, Phone, MapPin, MessageSquareHeart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#022A27] border-t border-white/10 text-white relative overflow-hidden">
      {/* Structural Ambient Background Glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#067F76]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* --- TOP ROW: MISSION NARRATIVE & MOTIVATIONAL CTA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-start">
          {/* Mission Content Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="ARIAD Psychological Services Logo"
                className="h-14 w-auto object-contain "
                priority
              />
              <span className="text-lg sm:text-xl font-black tracking-wider uppercase sr-only">
                ARIAD Psychological Services
              </span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
              At ARIAD Psychological Services, our mission is to empower
              individuals through delving into the roots of the mind. Using a
              holistic approach to cutting-edge neuropsychological evaluation,
              we strive to unearth the intricate connections between cognitive
              roots and emotional branches.
            </p>
          </div>

          {/* Let's Talk CTA Box */}
          <div className="lg:col-span-5 p-6 rounded-[1.5rem] bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#D6C1A0]">
              <MessageSquareHeart className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-widest">
                Let's Talk About Your Mental Health!
              </h4>
            </div>
            <p className="text-slate-300 text-xs font-light leading-relaxed">
              Don’t wait for tomorrow—invest in your well-being today. You
              deserve it.
            </p>
            <div className="pt-1">
              <a
                href="/contact"
                className="inline-flex px-4 py-2 bg-white hover:bg-[#D6C1A0] text-[#023B37] hover:text-slate-900 font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* --- MIDDLE ROW: MULTI-CITY LOCATIONS & SOCIALS --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pt-12 pb-12 border-b border-white/10">
          {/* Location 1: Dallas */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D6C1A0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#067F76]" />
              Dallas Clinic
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#067F76] shrink-0 mt-0.5" />
                <span>
                  4131 N Central Expy Suite 900,
                  <br />
                  Dallas, TX 75204
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#067F76] shrink-0" />
                <a
                  href="tel:4697339976"
                  className="hover:text-white transition-colors duration-200"
                >
                  (469) 733-9976
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#067F76] shrink-0" />
                <a
                  href="mailto:info@ariadpsychservices.com"
                  className="hover:text-white transition-colors duration-200 break-all"
                >
                  info@ariadpsychservices.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Network Tracks */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D6C1A0]">
              Follow Profiles
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs sm:text-sm font-light text-slate-300">
              <a
                href="#facebook"
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200 w-fit"
              >
                <span>Facebook</span>
              </a>
              <a
                href="#instagram"
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200 w-fit"
              >
                <span>Instagram</span>
              </a>
              <a
                href="#linkedin"
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200 w-fit"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM ROW: LEGAL BOUNDARY --- */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-slate-400 text-[11px] font-light">
              &copy; {currentYear} ARIAD Psychological Services. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              <a
                href="#privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span className="text-white/10 hidden sm:inline">|</span>
              <a
                href="#terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <span className="text-white/10 hidden sm:inline">|</span>
              <a
                href="#disclaimer"
                className="hover:text-white transition-colors duration-200"
              >
                Clinical Disclaimer
              </a>
            </div>
          </div>

          {/* Scroll-To-Top Trigger */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:text-[#023B37] hover:bg-[#D6C1A0] hover:border-[#D6C1A0] transition-all duration-300 active:scale-95 group shrink-0 outline-none"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
