"use client";

import React, { useState } from "react";
<<<<<<< HEAD
import { Send, MapPin, ShieldCheck, Clock, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/configs/supabase";
=======
import {
  Send,
  MapPin,
  ShieldCheck,
  Clock,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import SEO from "@/components/SEO"; // ← Added SEO Import
>>>>>>> feature/improved-dashboard

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [statusMsg, setStatusMsg] = useState("");
=======
  const [showSuccessModal, setShowSuccessModal] = useState(false);
>>>>>>> feature/improved-dashboard

  const locations = ["Dallas", "Houston"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< HEAD
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
=======

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Submission failed");

      // Show animated success modal
      setShowSuccessModal(true);

      // Reset form
>>>>>>> feature/improved-dashboard
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        message: "",
      });
    } catch (err: any) {
<<<<<<< HEAD
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
=======
      console.error("Submission error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setShowSuccessModal(false);

  return (
    <>
      <SEO
        title="Schedule a Psychological Consultation"
        description="Request a confidential intake consultation for ADHD, Autism (ASD), psychoeducational, or neuropsychological assessments in Texas and Arizona."
        keywords="psychological consultation, ADHD assessment, autism evaluation, neuropsychological testing, intake consultation, mental health Dallas, Arizona psychology"
      />

      <div className="bg-[#FAF8F5] min-h-screen">
        {/* Hero Section (same as before) */}
        <section className="bg-[#023B37] pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#067F76_0%,transparent_50%)] opacity-30" />

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold  text-white tracking-tighter mb-6 leading-tight">
              Begin Your Journey to
              <br />
              <span className="text-[#67E8D6]">Clinical Clarity</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto mb-10 font-light">
              Professional psychological assessments and compassionate support.
            </p>
            <a
              href="#form"
              className="inline-flex text-white   items-center gap-3 px-10 py-4 bg-[#067F76] hover:bg-[#056b63] text-lg font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Start Your Inquiry{" "}
              <ChevronRight className="w-5 h-5 text-white " />
            </a>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
              {/* Sidebar Info */}
              <div className="lg:col-span-4">
                <div className="sticky top-8 bg-[#023B37] rounded-3xl p-10 text-white shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-7 h-7 text-[#67E8D6]" />
                    Your Privacy Matters
                  </h3>
                  <p className="text-stone-300 leading-relaxed">
                    All information you share is strictly confidential.
                  </p>

                  <div className="mt-10 space-y-6">
                    <div className="flex gap-4">
                      <Clock className="w-6 h-6 text-[#67E8D6] mt-1" />
                      <div>
                        <p className="font-semibold">Office Hours</p>
                        <p className="text-sm text-stone-400">
                          Mon – Fri: 9:00 AM – 5:00 PM CST
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <MapPin className="w-6 h-6 text-[#67E8D6] mt-1" />
                      <div>
                        <p className="font-semibold">Locations</p>
                        <p className="text-sm text-stone-400">
                          Dallas & Houston, Texas
                        </p>
                      </div>
>>>>>>> feature/improved-dashboard
                    </div>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
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
=======

              {/* Form */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-3xl border border-stone-100 shadow-xl p-10 md:p-14">
                  <h2 className="text-3xl font-bold text-[#023B37] mb-8">
                    Tell Us About You
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Form fields remain the same - using previous improved styling */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-[#023B37] mb-2">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Jane Doe"
                          className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-[#067F76] focus:ring-2 focus:ring-[#067F76]/20 outline-none transition-all"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#023B37] mb-2">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="jane@example.com"
                          className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-[#067F76] focus:ring-2 focus:ring-[#067F76]/20 outline-none transition-all"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#023B37] mb-2">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-[#067F76] focus:ring-2 focus:ring-[#067F76]/20 outline-none transition-all"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#023B37] mb-2">
                        Preferred Location
                      </label>
                      <select
                        required
                        className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-[#067F76] focus:ring-2 focus:ring-[#067F76]/20 outline-none transition-all bg-white"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      >
                        <option value="" disabled>
                          Select location
                        </option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#023B37] mb-2">
                        Inquiry Details
                      </label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Briefly describe the concerns or the type of evaluation you are interested in..."
                        className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-[#067F76] focus:ring-2 focus:ring-[#067F76]/20 outline-none transition-all resize-y"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-[#067F76] hover:bg-[#056b63] disabled:bg-stone-400 text-white font-semibold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
                    >
                      {loading ? "Sending securely..." : "Send Secure Inquiry"}
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEAUTIFUL ANIMATED BLURRED SUCCESS MODAL */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-fadeIn">
            <div
              className="bg-white rounded-3xl max-w-md w-full p-12 text-center relative 
                        animate-modalPop shadow-2xl"
            >
              {/* Success Icon with Animation */}
              <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 animate-scaleIn">
                <CheckCircle className="w-16 h-16 text-emerald-600" />
              </div>

              <h3 className="text-4xl font-bold text-[#023B37] mb-4">
                Thank You!
              </h3>

              <p className="text-stone-600 text-lg leading-relaxed mb-10">
                Your inquiry has been successfully submitted. <br />
                Our clinical team will reach out within{" "}
                <span className="font-semibold">1-2 business days</span>.
              </p>

              <button
                onClick={closeModal}
                className="w-full py-4 bg-[#023B37] hover:bg-black text-white font-semibold text-lg rounded-2xl transition-all active:scale-95"
              >
                Return to Homepage
              </button>

              <p className="text-xs text-stone-400 mt-6">
                You can close this window anytime
              </p>
            </div>
          </div>
        )}
      </div>
    </>
>>>>>>> feature/improved-dashboard
  );
}
