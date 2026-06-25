"use client";

import React from "react";
import { Quote, HeartHandshake, UserPlus, Star } from "lucide-react";

// Define a strict interface for testimonial items
interface Testimonial {
  id: number;
  name: string;
  role: string;
  service: string;
  feedback: string;
  rating: number;
  iconAccent: string;
}

// Define a structure for impact statistics
interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBg: string;
  iconText: string;
}

export default function AnimatedTestimonialsSection() {
  const testimonialsData: Testimonial[] = [
    {
      id: 1,
      name: "Elizabeth R.",
      role: "Parent",
      service: "Learning Support",
      feedback:
        "The clarity we received from Ariad changed everything for our son. We finally have a supportive roadmap for school and home. Highly recommend their thoughtful guidance.",
      rating: 5,
      iconAccent: "text-white bg-white/10 border border-white/20",
    },
    {
      id: 2,
      name: "Marcus G.",
      role: "Professional",
      service: "Learning Clarity Session",
      feedback:
        "After struggling with focus, the detailed understanding helped me see my patterns more clearly and move forward with practical strategies.",
      rating: 5,
      iconAccent: "text-white bg-white/10 border border-white/20",
    },
    {
      id: 3,
      name: "Sarah L.",
      role: "Educator & Mom",
      service: "School Support Session",
      feedback:
        "We always knew she learned differently. This process provided the specific insight we needed to unlock better classroom support. The collaborative approach was invaluable.",
      rating: 5,
      iconAccent: "text-white bg-white/10 border border-white/20",
    },
    {
      id: 4,
      name: "David K.",
      role: "Adult",
      service: "Personal Clarity Session",
      feedback:
        "Gaining clearer understanding as an adult was a profound relief. The compassionate guidance here provided validation and practical next steps I've sought for years.",
      rating: 5,
      iconAccent: "text-white bg-white/10 border border-white/20",
    },
  ];

  const statistics: Stat[] = [
    {
      icon: <Star className="w-5 h-5" />,
      value: "4.9+",
      label: "Family Satisfaction",
      iconBg: "bg-white/10 border border-white/10",
      iconText: "text-white",
    },
    {
      icon: <UserPlus className="w-5 h-5" />,
      value: "1,200+",
      label: "Families Supported",
      iconBg: "bg-white/10 border border-white/10",
      iconText: "text-white",
    },
    {
      icon: <HeartHandshake className="w-5 h-5" />,
      value: "98%",
      label: "Positive Outcomes",
      iconBg: "bg-white/10 border border-white/10",
      iconText: "text-white",
    },
  ];

  const seamlessScrollData = [...testimonialsData, ...testimonialsData];

  return (
    <section
      className="bg-[#023B37] py-16 sm:py-24 lg:py-36 relative overflow-hidden"
      id="testimonials"
    >
      {/* Required CSS Keyframes for Seamless Loop */}
      <style>{`
        @keyframes scrollSeamless {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * (350px + 24px) * ${testimonialsData.length})); }
        }
        
        @media (min-width: 640px) {
          @keyframes scrollSeamless {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-1 * (420px + 32px) * ${testimonialsData.length})); }
          }
        }
        
        .animate-seamless-scroll {
          animation: scrollSeamless linear infinite;
        }

        .animated-scroll-track:hover .animate-seamless-scroll {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative Ambient Gradients */}
      <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] rounded-full bg-[#067F76]/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[400px] h-[400px] rounded-full bg-[#D6C1A0]/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#067F76]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/70 font-extrabold">
              Family Voices
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Thoughtful Support, Real Results. <br />
            Stories from Our Dallas Community.
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-[#067F76] to-[#D6C1A0] rounded-full pt-1" />

          <p className="text-slate-200 text-xs sm:text-sm lg:text-base max-w-2xl font-light pt-2">
            Providing compassionate guidance and practical support for families
            and individuals throughout Dallas, Texas. Hear their stories.
          </p>
        </div>

        {/* --- CONTINUOUS MOTION SCROLL TRACK --- */}
        <div className="relative animated-scroll-track overflow-hidden group">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#023B37] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#023B37] to-transparent z-20 pointer-events-none" />

          <div
            className="flex gap-6 lg:gap-8 animate-seamless-scroll will-change-transform"
            style={{ animationDuration: "50s" }}
          >
            {seamlessScrollData.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[350px] sm:w-[420px] relative bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-500"
              >
                <div>
                  {/* Card Header Content */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div
                      className={`p-3 rounded-2xl flex items-center justify-center ${testimonial.iconAccent}`}
                    >
                      <Quote className="w-6 h-6 text-white/90 transform rotate-180" />
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6C1A0]" />
                      <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-bold text-white/90">
                        {testimonial.service}
                      </span>
                    </div>
                  </div>

                  {/* Testimonial Feedback Text */}
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-light mb-6 relative z-10 italic">
                    "{testimonial.feedback}"
                  </p>
                </div>

                {/* Signature Anchor */}
                <div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white text-lg">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                        {testimonial.name}
                      </span>
                      <p className="text-white/60 text-[11px] leading-tight font-light">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  {/* Rating Visual */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-[#D6C1A0] fill-[#D6C1A0]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
