"use client";

import React, { useState } from "react";
import BlogDashboardClient from "./BlogDashboardClient";
import Inquires from "./Inq";
import { FileText, MessageSquare } from "lucide-react";

export default function DashboardWithToggle() {
  const [activeTab, setActiveTab] = useState<"blog" | "inquiries">("blog");

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8">
            <div className="py-8">
              <h1 className="text-2xl font-bold text-stone-900">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex border-b border-transparent">
              <button
                onClick={() => setActiveTab("blog")}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                  activeTab === "blog"
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-500 hover:text-stone-700"
                }`}
              >
                <FileText className="w-4 h-4" />
                Blog Dashboard
              </button>

              <button
                onClick={() => setActiveTab("inquiries")}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                  activeTab === "inquiries"
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-500 hover:text-stone-700"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Inquiries
                {/* <span className="ml-1.5 px-2 py-0.5 text-xs font-mono bg-stone-100 rounded-full">
                  7
                </span> */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "blog" ? <BlogDashboardClient /> : <Inquires />}
      </div>
    </div>
  );
}
