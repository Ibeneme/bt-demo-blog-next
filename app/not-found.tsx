"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#012321] text-white flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#067F76_0.8px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10">
        {/* Large 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[180px] md:text-[240px] font-black tracking-tighter text-[#023B37] select-none leading-none">
            404
          </h1>
        </motion.div>

        <div className="mt-[-60px] mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[#67E8D6] text-sm font-medium tracking-widest">
            <span>LOST IN THE FOREST</span>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
          Page Not Found
        </h2>

        <p className="text-lg text-slate-400 max-w-md mx-auto mb-12">
          Sorry, the page you’re looking for has wandered off or never existed.
          Let’s get you back on track.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group flex items-center justify-center gap-3 bg-white text-[#012321] hover:bg-[#E0F2F1] px-8 py-4 rounded-2xl font-semibold transition-all duration-300 text-lg"
          >
            <Home className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            Return Home
          </Link>

          <Link
            href="/contact"
            className="group flex items-center justify-center gap-3 border border-[#067F76] hover:bg-[#067F76] hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 text-lg"
          >
            Contact Us
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <p className="text-sm text-slate-500 mt-12">
          Still need help? Reach out to our team directly.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="text-[180px] text-[#067F76]/10 font-black select-none"
        >
          ?
        </motion.div>
      </div>
    </div>
  );
}
