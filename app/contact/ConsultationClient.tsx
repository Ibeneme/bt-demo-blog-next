"use client";

import React, { useState } from "react";
import {
  Send,
  MapPin,
  ShieldCheck,
  Clock,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import SEO from "@/components/SEO"; // ← Added SEO Import

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const locations = ["Dallas", "Houston"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        message: "",
      });
    } catch (err: any) {
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
                    </div>
                  </div>
                </div>
              </div>

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
  );
}
