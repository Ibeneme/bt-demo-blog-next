"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  AlertCircle,
  Search,
} from "lucide-react";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  created_at: string;
  status?: string;
}

export default function Inquires() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [inquiries, searchQuery]);

  const fetchInquiries = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiries", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch inquiries");

      const data = await res.json();
      setInquiries(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">
              Clinical Inquiries
            </h1>
            <p className="text-sm text-stone-500">
              Secure overview of incoming client evaluation requests
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-sm w-full sm:w-64 focus:ring-2 focus:ring-stone-200 outline-none"
              />
            </div>
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl text-sm font-semibold text-stone-700"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
            ⚠️ {errorMsg}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-32 bg-white border border-stone-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl">
            <AlertCircle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <p className="text-xl font-medium text-stone-600">
              {searchQuery ? "No matching inquiries found" : "No inquiries yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 flex flex-col md:flex-row gap-6"
              >
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-stone-900">
                      {item.name}
                    </h2>
                    <div className="flex gap-4 text-sm text-stone-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <p className="bg-stone-50 p-5 rounded-2xl text-stone-700 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                <div className="flex flex-col gap-3 self-start md:min-w-[180px]">
                  <a
                    href={`mailto:${item.email}`}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[#023B37] hover:bg-[#067F76] text-white rounded-2xl text-sm font-medium transition"
                  >
                    <Mail className="w-4 h-4" /> Email Client
                  </a>
                  <a
                    href={`tel:${item.phone}`}
                    className="flex items-center justify-center gap-2 px-5 py-3 border border-stone-300 hover:bg-stone-50 rounded-2xl text-sm font-medium transition"
                  >
                    <Phone className="w-4 h-4" /> Call {item.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
