"use client";

import React, { useState } from "react";
import { Send, MapPin, ShieldCheck, Clock, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/configs/supabase";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const locations = ["Dallas", "Houston"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    console.log("--- Form Submission Started ---");
    console.log("Payload data captured:", formData);

    try {
      // Direct insertion into your Supabase table (assumed table name: 'inquiries')
      console.log("Sending query payload to Supabase...");
      const { data, error } = await supabase
        .from("inquiries")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            message: formData.message,
          },
        ])
 

      if (error) {
        console.error("Supabase Error encountered:", error.message);
        console.error("Full error object:", error);
        throw error;
      }

      console.log("Supabase insertion successful! Returned data:", data);
      setStatusMsg("Inquiry submitted successfully!");

      // Clear form upon success
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        message: "",
      });
    } catch (err: any) {
      console.error("Catch block captured an unexpected error:", err);
      setStatusMsg(`Submission failed: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
      console.log("--- Form Submission Lifecycle Finished ---");
    }
  };

  return (
    <div className="bg-[#FAF8F5]">
      {/* --- DARK GREEN HERO SECTION --- */}
      <section className="bg-[#023B37] pt-[200px] text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#067F76]/20 blur-[120px] rounded-full -mr-20" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Begin Your Journey to <br className="hidden md:block" />
            <span className="text-[#67E8D6]">Clinical Clarity</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-8 font-light">
            Professional psychological assessments and compassionate support.
            Connect with our team to start your path toward a tailored treatment
            plan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#form"
              className="px-8 py-4 bg-[#067F76] hover:bg-[#056b63] rounded-xl font-bold transition-all flex items-center gap-2"
            >
              Get Started <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section id="form" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column: Context & Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#023B37] rounded-3xl p-8 text-white shadow-2xl shadow-[#023B37]/20">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#67E8D6]" />
                  Confidentiality First
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-6">
                  Your inquiry is strictly confidential. Information shared here
                  is used solely for the purpose of assessing clinical fit and
                  administrative coordination.
                </p>

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#67E8D6] shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase text-white">
                        Office Hours
                      </p>
                      <p className="text-xs text-stone-400">
                        Mon–Fri: 9:00 AM – 5:00 PM CST
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#67E8D6] shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase text-white">
                        Our Locations
                      </p>
                      <p className="text-xs text-stone-400">
                        Serving clients in Dallas and Houston, Texas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-8 md:p-10 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#023B37] uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#067F76] focus:ring-1 focus:ring-[#067F76] outline-none transition-all"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#023B37] uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#067F76] focus:ring-1 focus:ring-[#067F76] outline-none transition-all"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#023B37] uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#067F76] focus:ring-1 focus:ring-[#067F76] outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#023B37] uppercase tracking-wider">
                    Which location will you be seeking services?
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#067F76] focus:ring-1 focus:ring-[#067F76] outline-none transition-all bg-white"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#023B37] uppercase tracking-wider">
                    Inquiry Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe the concerns or the type of evaluation you are interested in..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#067F76] focus:ring-1 focus:ring-[#067F76] outline-none transition-all"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                {statusMsg && (
                  <p
                    className={`text-sm font-semibold ${
                      statusMsg.includes("successfully")
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {statusMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#067F76] hover:bg-[#056b63] disabled:bg-stone-400 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
                >
                  {loading ? "Sending securely..." : "Send Secure Inquiry"}{" "}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
