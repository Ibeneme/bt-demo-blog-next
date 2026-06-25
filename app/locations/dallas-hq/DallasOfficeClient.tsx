"use client";

import React from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function DallasOfficePage() {
  return (
    <main className="bg-[#FAF8F5] text-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#023B37] text-white py-28 lg:py-36 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,127,118,0.15),transparent_50%)]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <span className="inline-block py-1 px-3 rounded-md bg-white/10 text-[#67E8D6] text-xs font-mono font-bold tracking-widest uppercase mb-6 border border-white/5">
            Dallas Clinic
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 max-w-4xl leading-[1.1]">
            Ariad Psychological <br />
            <span className="font-serif italic font-normal text-[#67E8D6]">
              Services — Dallas
            </span>
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl leading-relaxed font-light">
            Empowering individuals through holistic, cutting-edge neurodivergent
            and neuropsychological evaluations in the heart of Dallas.
          </p>
        </div>
      </section>

      {/* Main Content: Info Side-by-Side with Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-3xl border border-stone-200/60 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 text-[#023B37]">
                Visit Our Clinic
              </h2>
              <p className="text-stone-400 text-sm mb-10">
                Our premier physical testing facility in Dallas.
              </p>

              <div className="space-y-6">
                <ContactItem
                  icon={<MapPin className="text-[#067F76] w-5 h-5" />}
                  label="Address"
                  text="4131 N Central Expy Suite 900, Dallas, TX 75204"
                />
                <ContactItem
                  icon={<Phone className="text-[#067F76] w-5 h-5" />}
                  label="Phone"
                  text="(469) 733-9976"
                  link="tel:4697339976"
                />
                <ContactItem
                  icon={<Mail className="text-[#067F76] w-5 h-5" />}
                  label="Email"
                  text="info@ariadpsychservices.com"
                  link="mailto:info@ariadpsychservices.com"
                />
              </div>
            </div>
          </div>

          {/* Right: The Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-stone-200 min-h-[450px] bg-stone-100 relative group">
            <iframe
              title="Dallas Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.297491761664!2d-96.78651812456426!3d32.83060017359556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9f131a441e8f%3A0x6b490f23078a9c33!2s4131%20N%20Central%20Expy%2C%20Dallas%2C%20TX%2075204!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="bg-[#023B37] py-20 px-6 text-center text-white relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-8">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            Ready to prioritize your care?
          </h3>
          <p className="text-stone-300 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Schedule a confidential intake conversation with our coordinators to
            map out clinical evaluation compatibility.
          </p>
          <div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#067F76] hover:bg-[#056b63] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 active:scale-[0.98]"
            >
              Book Your Consultation{" "}
              <ArrowRight className="w-4 h-4 text-[#67E8D6]" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  text: string;
  link?: string;
}

function ContactItem({ icon, label, text, link }: ContactItemProps) {
  const content = (
    <div className="flex gap-4 group cursor-pointer">
      <div className="p-3 bg-[#FAF8F5] border border-stone-200/60 rounded-xl h-fit transition-colors group-hover:bg-[#067F76]/10 group-hover:border-[#067F76]/20">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
          {label}
        </p>
        <p
          className={`text-base font-medium mt-0.5 transition-colors ${
            link
              ? "text-stone-800 group-hover:text-[#067F76]"
              : "text-stone-800"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );

  return link ? (
    <a href={link} className="block group">
      {content}
    </a>
  ) : (
    content
  );
}
