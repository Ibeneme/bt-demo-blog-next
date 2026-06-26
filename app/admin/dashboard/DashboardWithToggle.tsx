"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BlogDashboardClient from "./BlogDashboardClient";
import Inquires from "./Inq";
import { FileText, MessageSquare, LogOut, AlertTriangle } from "lucide-react";

export default function DashboardWithToggle() {
  const [activeTab, setActiveTab] = useState<"blog" | "inquiries">("blog");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const handleLogoutConfirm = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="py-8">
                <h1 className="text-3xl font-black tracking-tighter text-slate-900">
                  ADMIN DASHBOARD
                </h1>
              </div>

              <div className="flex">
                <button
                  onClick={() => setActiveTab("blog")}
                  className={`flex items-center gap-3 px-8 py-6 text-sm font-semibold transition-all border-b-2 ${
                    activeTab === "blog"
                      ? "border-emerald-600 text-emerald-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  BLOG
                </button>

                <button
                  onClick={() => setActiveTab("inquiries")}
                  className={`flex items-center gap-3 px-8 py-6 text-sm font-semibold transition-all border-b-2 ${
                    activeTab === "inquiries"
                      ? "border-emerald-600 text-emerald-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  INQUIRIES
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-2xl transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "blog" ? <BlogDashboardClient /> : <Inquires />}
      </div>

      {/* ==================== LOGOUT CONFIRMATION MODAL ==================== */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-10">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-3 text-slate-900">
              Logout?
            </h2>
            <p className="text-center text-slate-600 mb-10">
              Are you sure you want to log out of the admin dashboard?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-4 border border-slate-300 hover:bg-slate-100 rounded-2xl font-medium transition-all"
              >
                CANCEL
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-semibold transition-all"
              >
                YES, LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
