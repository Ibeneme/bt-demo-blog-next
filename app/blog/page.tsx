"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Loader2,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Rethink_Sans } from "next/font/google";
import { supabase } from "@/configs/supabase";
import SEO from "@/components/SEO";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rethink-sans",
  display: "swap",
});

interface BlogPost {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author?: string;
}

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
    <div className="h-64 bg-slate-200" />
    <div className="p-8">
      <div className="flex gap-4 mb-4">
        <div className="h-4 w-20 bg-slate-200 rounded-full" />
        <div className="h-4 w-20 bg-slate-200 rounded-full" />
      </div>
      <div className="h-6 w-3/4 bg-slate-200 rounded-lg mb-4" />
      <div className="space-y-2 mb-6">
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
      </div>
      <div className="h-8 w-full bg-slate-100 rounded-xl" />
    </div>
  </div>
);

const BlogCard: React.FC<{
  post: BlogPost;
  onInitiateDelete: (id: number | string, title: string) => void;
  isDeleting: boolean;
  isAdmin: boolean;
}> = ({ post, onInitiateDelete, isDeleting, isAdmin }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all border border-slate-100"
  >
    <div className="relative h-64 overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase text-[#023B37]">
        {post.category}
      </span>

      {isAdmin && (
        <button
          onClick={() => onInitiateDelete(post.id, post.title)}
          disabled={isDeleting}
          className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors z-10 disabled:opacity-50"
          title="Delete Article"
        >
          {isDeleting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      )}
    </div>

    <div className="p-8">
      <div className="flex gap-4 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" /> {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" /> {post.readTime}
        </span>
      </div>

      <h3 className="text-xl font-bold text-[#023B37] mb-3 line-clamp-2 group-hover:text-[#067F76] transition-colors">
        {post.title}
      </h3>

      <p className="text-slate-600 line-clamp-3 mb-6">{post.excerpt}</p>

      <Link
        href={`/blog/${post.slug}`}
        className="text-[#067F76] font-medium flex items-center gap-1 hover:gap-2 transition-all"
      >
        Read More <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </motion.article>
);

export default function BlessingAttorneyBlog() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | string | null>(null);
  const [targetTitle, setTargetTitle] = useState("");

  const heroBg =
    "https://images.unsplash.com/photo-1600427652630-f97cc4db10cd?q=80&w=2070&auto=format&fit=crop";

  // Check Admin Token
  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem("adminToken");
      setIsAdmin(!!token && token.length > 10);
    };

    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, []);

  const fetchSupabaseArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedPosts: BlogPost[] = data.map((article: any) => ({
          id: article.id,
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category || "General",
          date: article.created_at
            ? new Date(article.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Recent",
          readTime:
            Math.max(
              1,
              Math.ceil(
                (article.content?.replace(/<[^>]*>/g, "").split(/\s+/).length ||
                  0) / 200
              )
            ) + " min read",
          image:
            article.image_url ||
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
        }));

        setAllPosts(formattedPosts);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInitiateDelete = (id: number | string, title: string) => {
    if (!isAdmin) return;
    setTargetId(id);
    setTargetTitle(title);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!targetId || !isAdmin) return;

    const idToDelete = targetId;
    setModalOpen(false);
    setDeletingId(idToDelete);

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", idToDelete);

      if (error) throw error;

      setAllPosts((prev) => prev.filter((post) => post.id !== idToDelete));
    } catch (err: any) {
      console.error("Failed to delete:", err);
      alert("Could not delete article: " + err.message);
    } finally {
      setDeletingId(null);
      setTargetId(null);
      setTargetTitle("");
    }
  };

  useEffect(() => {
    fetchSupabaseArticles();
  }, []);

  return (
    <>
      <SEO
        title="Latest Insights & Articles"
        description="Clinical insights, parenting wisdom, mental health articles, and honest conversations from ARIAD Psychological Services."
        keywords="mental health, psychology, parenting, clinical insights, neuropsychological evaluation, therapy, ADHD, autism, Dallas psychology"
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0">
            <Image
              src={heroBg}
              alt="Hero"
              fill
              priority
              className="object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              Thoughts That <br />
              <span className="bg-gradient-to-r from-[#67E8D6] to-[#D6C1A0] bg-clip-text text-transparent">
                Guide Families
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-300 font-light">
              Clinical insights, parenting wisdom, and honest conversations.
            </p>

            {isAdmin && (
              <div className="mt-10">
                <Link
                  href="/blog/create"
                  className="inline-flex items-center gap-3 bg-white text-[#023B37] px-8 py-4 rounded-full font-semibold hover:bg-[#067F76] hover:text-white transition-all"
                >
                  Create New Article
                  <ArrowRight />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Posts Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-bold text-[#023B37]">
              Latest Insights
            </h2>
            <Link
              href="/"
              className="text-[#067F76] font-medium flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : allPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl">
              <p className="text-slate-500">No articles found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {allPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onInitiateDelete={handleInitiateDelete}
                    isDeleting={deletingId === post.id}
                    isAdmin={isAdmin}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
                  <AlertTriangle className="text-red-500" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#023B37] mb-2">
                  Confirm Deletion
                </h3>
                <p className="text-slate-600 mb-8">
                  Are you sure you want to permanently delete{" "}
                  <span className="font-semibold">"{targetTitle}"</span>? This
                  action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-medium transition-colors"
                  >
                    Delete Permanently
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
