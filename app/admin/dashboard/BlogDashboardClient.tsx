"use client";

<<<<<<< HEAD
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
=======
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
>>>>>>> feature/improved-dashboard
import {
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Search,
<<<<<<< HEAD
} from "lucide-react";
import Image from "next/image";
=======
  AlertTriangle,
  X,
} from "lucide-react";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import { supabase } from "../../../configs/supabase";
>>>>>>> feature/improved-dashboard

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
<<<<<<< HEAD
  read_time: string;
};

export default function BlogDashboardClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
=======
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
>>>>>>> feature/improved-dashboard
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const router = useRouter();
<<<<<<< HEAD
  const supabase = createClient();

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else if (data) {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [supabase]);
=======

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
>>>>>>> feature/improved-dashboard

  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
<<<<<<< HEAD
    if (!postToDelete) return;
    setDeletingId(postToDelete.id);

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", postToDelete.id);

    if (error) {
      alert("Failed to delete article: " + error.message);
    } else {
      setPosts(posts.filter((p) => p.id !== postToDelete.id));
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto pt-[60px]">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#023B37]">
              Blog Management
            </h1>
            <p className="text-slate-500 font-medium">
=======
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
>>>>>>> feature/improved-dashboard
              ARIAD Psychological Insights
            </p>
          </div>

<<<<<<< HEAD
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-4 rounded-full  focus:outline-none focus:ring-2 focus:ring-[#067F76] shadow-sm w-full sm:w-64"
              />
            </div>

            <button
              onClick={() => router.push("/admin/blog/create")}
              className="flex items-center justify-center gap-2 bg-[#023B37] text-white px-6 py-4 rounded-full font-bold hover:bg-[#067F76] transition-all shadow-xl shadow-[#023B37]/20"
            >
              <Plus size={18} /> Create New
            </button>
          </div>
        </div>

        <div className="relative">
          {filteredPosts.length === 0 && !loading ? (
            <div className="bg-white p-12 rounded-3xl text-center ">
              <p className="text-slate-400">
                No articles found matching "{searchQuery}".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(loading ? Array.from({ length: 6 }) : filteredPosts).map(
                (post: any, idx) => (
                  <BlogCard
                    key={loading ? `skeleton-${idx}` : post.id}
                    post={loading ? undefined : post}
                    onEdit={() => router.push(`/admin/blog/edit/${post?.id}`)}
                    onDelete={() => handleDeleteClick(post)}
                    onView={() =>
                      router.push(`/blog/view/${post?.slug || post?.id}`)
                    }
                  />
                )
              )}
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 -m-2 flex items-center justify-center rounded-3xl bg-[#F1F4F9]/60 backdrop-blur-md z-10">
              <div className="flex flex-col items-center gap-4 bg-white/70 backdrop-blur-xl px-10 py-8 rounded-3xl ">
                <Loader2 className="animate-spin text-[#023B37]" size={40} />
                <p className="font-bold text-[#023B37]">Fetching insights...</p>
              </div>
=======
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
>>>>>>> feature/improved-dashboard
            </div>
          )}
        </div>
      </div>

<<<<<<< HEAD
      {showDeleteModal && postToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Delete Article?
            </h2>
            <p className="text-slate-600 mb-8">
              Are you sure you want to delete{" "}
              <strong>"{postToDelete.title}"</strong>?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-4 border rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-4 bg-red-600 text-white rounded-2xl"
              >
                {deletingId ? "Deleting..." : "Yes, Delete"}
=======
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
>>>>>>> feature/improved-dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
function BlogCard({
  post,
=======
// ==================== BlogCard ====================
function BlogCard({
  post,
  isLoading,
>>>>>>> feature/improved-dashboard
  onEdit,
  onDelete,
  onView,
}: {
  post?: BlogPost;
<<<<<<< HEAD
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}) {
  if (!post) {
    return <div className="bg-white rounded-3xl h-80  animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden  hover:shadow-xl cursor transition-all">
      <div className="h-48 relative overflow-hidden">
=======
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
>>>>>>> feature/improved-dashboard
        <Image
          src={post.image_url || "/placeholder.png"}
          alt={post.title}
          fill
<<<<<<< HEAD
          className="object-cover"
        />
        <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase text-[#023B37]">
          {post.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{post.title}</h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 ">
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold">
            <span>
              <Calendar size={12} className="inline mr-1" />{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <span>
              <Clock size={12} className="inline mr-1" /> {post.read_time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-[#067F76] hover:bg-slate-100 rounded-full"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full"
            >
              <Trash2 size={18} />
            </button>
            <div
              onClick={onView}
              className="bg-slate-50 p-2 rounded-full cursor-pointer"
            >
              <ChevronRight size={18} />
            </div>
=======
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
>>>>>>> feature/improved-dashboard
          </div>
        </div>
      </div>
    </div>
  );
}
