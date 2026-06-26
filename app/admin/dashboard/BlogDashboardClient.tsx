"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Search,
  AlertTriangle,
  X,
} from "lucide-react";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import { supabase } from "../../../configs/supabase";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
  read_time?: string;
};

interface DayGroup {
  key: string;
  label: string;
  items: BlogPost[];
}

const fetcher = async () => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

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

export default function BlogDashboardClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const router = useRouter();

  const {
    data: posts = [],
    error: fetchError,
    isLoading: loading,
  } = useSWR<BlogPost[]>("articles", fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 30000,
  });

  const hasActiveFilters = !!(searchQuery || dateFrom || dateTo);

  const clearFilters = () => {
    setSearchQuery("");
    setDateFrom("");
    setDateTo("");
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      const postDate = new Date(post.created_at);
      if (dateFrom) {
        const from = new Date(dateFrom);
        from.setHours(0, 0, 0, 0);
        if (postDate < from) return false;
      }
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        if (postDate > to) return false;
      }
      return true;
    });
  }, [posts, searchQuery, dateFrom, dateTo]);

  const groupedPosts: DayGroup[] = useMemo(() => {
    const groups: Record<string, BlogPost[]> = {};

    filteredPosts.forEach((post) => {
      const key = new Date(post.created_at).toDateString();
      if (!groups[key]) groups[key] = [];
      groups[key].push(post);
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
  }, [filteredPosts]);

  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete?.id) return;
    const postId = postToDelete.id;
    setDeletingId(postId);

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", postId);
      if (error) throw error;
      mutate("articles");
      alert(
        `✅ Article "${postToDelete.title}" has been successfully deleted.`
      );
      setShowDeleteModal(false);
      setPostToDelete(null);
    } catch (error: any) {
      console.error("Delete error:", error);
      alert(
        `❌ Delete failed: ${error.message || "An unexpected error occurred"}`
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto pt-16">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900">
              BLOG CONTROL
            </h1>
            <p className="text-emerald-600 mt-2 text-lg">
              ARIAD Psychological Insights
            </p>
          </div>

          <button
            onClick={() => router.push("/blog/create")}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all active:scale-[0.97]"
          >
            <Plus size={20} /> NEW ARTICLE
          </button>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[280px]">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by title, category or excerpt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 focus:border-emerald-500 rounded-2xl outline-none placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
              FROM
            </span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
              TO
            </span>
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
              <X className="w-4 h-4" /> CLEAR FILTERS
            </button>
          )}
        </div>

        {/* Error */}
        {fetchError && (
          <div className="mb-8 p-5 bg-red-50 border border-red-200 text-red-700 rounded-3xl flex items-center justify-between">
            <span>{fetchError.message || "Failed to load articles"}</span>
            <button
              onClick={() => mutate("articles")}
              className="text-sm underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <BlogCard key={`loading-${idx}`} isLoading={true} />
              ))}
            </div>
          ) : groupedPosts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl py-24 text-center">
              <p className="text-slate-500 text-xl">
                {hasActiveFilters
                  ? "No articles match your filters"
                  : "No articles yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-14">
              {groupedPosts.map((group) => (
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((post) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        isLoading={false}
                        onEdit={() => router.push(`/blog/${post.slug}/edit`)}
                        onDelete={() => handleDeleteClick(post)}
                        onView={() => router.push(`/blog/${post.slug}`)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && postToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-10">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-3">
              DELETE ARTICLE?
            </h2>
            <p className="text-center text-slate-600 mb-10">
              Are you sure you want to permanently delete{" "}
              <strong>"{postToDelete.title}"</strong>?
              <br />
              This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPostToDelete(null);
                }}
                className="flex-1 py-4 border border-slate-300 hover:bg-slate-100 rounded-2xl font-medium transition-all"
              >
                CANCEL
              </button>
              <button
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="flex-1 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                {deletingId ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    DELETING...
                  </>
                ) : (
                  "YES, DELETE"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== BlogCard ====================
function BlogCard({
  post,
  isLoading,
  onEdit,
  onDelete,
  onView,
}: {
  post?: BlogPost;
  isLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}) {
  if (isLoading || !post) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl h-[440px] animate-pulse" />
    );
  }

  return (
    <div className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-emerald-500 transition-all duration-300">
      <div className="h-60 relative overflow-hidden">
        <Image
          src={post.image_url || "/placeholder.png"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <span className="absolute top-4 left-4 bg-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-600 border border-emerald-500/30">
          {post.category}
        </span>
      </div>

      <div className="p-7">
        <h3 className="font-bold text-2xl leading-tight mb-4 line-clamp-2 text-slate-900">
          {post.title}
        </h3>
        <p className="text-slate-600 text-[15px] line-clamp-3 mb-8">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-200 pt-5">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {post.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock size={15} />
                {post.read_time}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-3 hover:bg-slate-100 rounded-2xl transition-all hover:text-emerald-600"
            >
              <Edit2 size={19} />
            </button>
            <button
              onClick={onDelete}
              className="p-3 hover:bg-red-50 text-red-500 rounded-2xl transition-all"
            >
              <Trash2 size={19} />
            </button>
            <button
              onClick={onView}
              className="p-3 hover:bg-slate-100 rounded-2xl transition-all"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
