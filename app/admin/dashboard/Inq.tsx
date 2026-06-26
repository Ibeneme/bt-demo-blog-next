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
  X,
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

interface DayGroup {
  key: string;
  label: string;
  items: Inquiry[];
}

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDayHeader = (dateKey: string) => {
  const date = new Date(dateKey);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "TODAY";
  if (isSameDay(date, yesterday)) return "YESTERDAY";

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function Inquires() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const hasActiveFilters = !!(searchQuery || dateFrom || dateTo);

  const clearFilters = () => {
    setSearchQuery("");
    setDateFrom("");
    setDateTo("");
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q);
      if (!matchesSearch) return false;

      const itemDate = new Date(item.created_at);

      if (dateFrom) {
        const from = new Date(dateFrom);
        from.setHours(0, 0, 0, 0);
        if (itemDate < from) return false;
      }
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        if (itemDate > to) return false;
      }
      return true;
    });
  }, [inquiries, searchQuery, dateFrom, dateTo]);

  const groupedInquiries: DayGroup[] = useMemo(() => {
    const groups: Record<string, Inquiry[]> = {};

    filteredInquiries.forEach((item) => {
      const key = new Date(item.created_at).toDateString();
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([key, items]) => ({
        key,
        label: formatDayHeader(key),
        items: items.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
      }));
  }, [filteredInquiries]);

  const fetchInquiries = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiries", { cache: "no-store" });
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
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-10 pb-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tighter">CLINICAL INQUIRIES</h1>
              <p className="text-emerald-600 mt-1">Secure client evaluation requests</p>
            </div>

            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-2xl text-sm font-semibold transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              REFRESH
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">FROM</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">TO</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-medium hover:bg-slate-100 border border-slate-200 transition-all"
              >
                <X className="w-4 h-4" /> CLEAR
              </button>
            )}
          </div>
        </div>

        {errorMsg && (
          <div className="mb-8 p-5 bg-red-50 border border-red-200 text-red-700 rounded-3xl">
            ⚠️ {errorMsg}
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 bg-white border border-slate-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : groupedInquiries.length === 0 ? (
          <div className="text-center py-24 bg-white border border-slate-200 rounded-3xl">
            <AlertCircle className="w-20 h-20 text-amber-500 mx-auto mb-6" />
            <p className="text-2xl font-medium text-slate-600">
              {hasActiveFilters ? "No matching inquiries" : "No inquiries yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {groupedInquiries.map((group) => (
              <div key={group.key}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-[2px] text-emerald-600">
                    {group.label}
                  </h2>
                  <span className="px-4 py-1 bg-slate-100 text-emerald-600 text-xs font-mono rounded-full">
                    {group.items.length}
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <div className="space-y-6">
                  {group.items.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row gap-8"
                    >
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold mb-2">{item.name}</h3>
                        <div className="flex gap-6 text-sm text-slate-500 mb-6">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.created_at).toLocaleString()}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </span>
                        </div>
                        <p className="bg-slate-50 border border-slate-100 p-7 rounded-3xl leading-relaxed text-slate-700">
                          {item.message}
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 md:min-w-[200px]">
                        <a
                          href={`mailto:${item.email}`}
                          className="flex items-center justify-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold transition-all"
                        >
                          <Mail className="w-5 h-5" /> EMAIL CLIENT
                        </a>
                        <a
                          href={`tel:${item.phone}`}
                          className="flex items-center justify-center gap-3 px-6 py-4 border border-slate-300 hover:bg-slate-100 rounded-2xl font-semibold transition-all"
                        >
                          <Phone className="w-5 h-5" /> CALL {item.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}