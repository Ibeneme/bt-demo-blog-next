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
<<<<<<< HEAD
// import blogData from "../data/blogPosts.json";
import { supabase } from "@/lib/configs/supabase";

=======
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
>>>>>>> feature/improved-dashboard

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
<<<<<<< HEAD
  featured?: boolean;
  tags?: string[];
}

interface BlogCardProps extends BlogPost {
  onInitiateDelete: (id: number | string, title: string) => void;
  isDeleting: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  slug,
  title,
  excerpt,
  date,
  readTime,
  category,
  image,
  onInitiateDelete,
  isDeleting,
}) => (
  <motion.div
    whileHover={{ y: -10 }}
    layout
    className="group bg-white border border-gray-100 rounded-3xl overflow-hidden transition-all duration-700 font-['Rethink_Sans'] relative"
  >
    <div className="h-56 relative">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      <div className="absolute top-6 right-6 bg-white/95 text-[#4F2A7E] text-xs font-bold px-4 py-1.5 rounded-2xl">
        {category}
      </div>

      <button
        onClick={() => onInitiateDelete(id, title)}
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
    </div>

    <div className="p-10">
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
        <div className="flex items-center gap-1.5">
          <Calendar size={16} />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock size={16} />
          <span>{readTime}</span>
        </div>
      </div>

      <h3 className="text-3xl font-bold text-[#4F2A7E] leading-tight mb-5 group-hover:text-[#3A1F5E] transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed mb-8 line-clamp-4 text-[17px]">
        {excerpt}
      </p>

      <Link
        href={`/blog/${slug}`}
        className="inline-flex items-center gap-3 font-semibold text-[#4F2A7E] hover:text-[#D4AF37] transition-all group-hover:gap-4 text-lg"
      >
        Read Full Article
        <ArrowRight
          size={22}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>
  </motion.div>
);

export default function BlessingAttorneyBlog() {
  //const { featuredArticle, practiceAreas } = blogData;
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loadingSupabase, setLoadingSupabase] = useState(true);
  const [deletingId, setDeletingId] = useState<number | string | null>(null);
=======
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
>>>>>>> feature/improved-dashboard

  const [modalOpen, setModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | string | null>(null);
  const [targetTitle, setTargetTitle] = useState("");

<<<<<<< HEAD
  const fetchSupabaseArticles = async () => {
    try {
      setLoadingSupabase(true);
      console.log("📡 Fetching all articles from Supabase...");

=======
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
>>>>>>> feature/improved-dashboard
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
<<<<<<< HEAD
        console.log(`✅ Loaded ${data.length} articles from database`);
        const formattedSupabasePosts: BlogPost[] = data.map((article: any) => {
          const words =
            article.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
          const computedReadTime =
            Math.max(1, Math.ceil(words / 200)) + " min read";

          const formattedDate = article.created_at
=======
        const formattedPosts: BlogPost[] = data.map((article: any) => ({
          id: article.id,
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category || "General",
          date: article.created_at
>>>>>>> feature/improved-dashboard
            ? new Date(article.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
<<<<<<< HEAD
            : "Recent";

          return {
            id: article.id,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            category: article.category || "Corporate Law",
            date: formattedDate,
            readTime: computedReadTime,
            image:
              article.image_url ||
              "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
          };
        });

        setAllPosts(formattedSupabasePosts);
      }
    } catch (err) {
      console.error("❌ Error pulling database articles:", err);
    } finally {
      setLoadingSupabase(false);
=======
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
>>>>>>> feature/improved-dashboard
    }
  };

  const handleInitiateDelete = (id: number | string, title: string) => {
<<<<<<< HEAD
=======
    if (!isAdmin) return;
>>>>>>> feature/improved-dashboard
    setTargetId(id);
    setTargetTitle(title);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
<<<<<<< HEAD
    if (!targetId) return;
=======
    if (!targetId || !isAdmin) return;
>>>>>>> feature/improved-dashboard

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
<<<<<<< HEAD
      console.log("🗑️ Article deleted successfully");
    } catch (err: any) {
      console.error("❌ Failed to delete article:", err.message);
      alert("Could not remove article: " + err.message);
=======
    } catch (err: any) {
      console.error("Failed to delete:", err);
      alert("Could not delete article: " + err.message);
>>>>>>> feature/improved-dashboard
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
<<<<<<< HEAD
    <div className="min-h-screen bg-[#F8F7F4] font-['Rethink_Sans'] relative">
      {/* Hero */}
      <div className="bg-[#4F2A7E] pt-56 text-white py-32 relative overflow-hidden">
        <div className="px-8 md:px-16 max-w-5xl">
        
          <Link
            href="/blog/create"
            className="mt-10 inline-flex items-center gap-4 bg-white text-[#4F2A7E] px-7 py-4 rounded-full pr-3 font-bold text-lg hover:opacity-90 transition-all"
          >
            Create an Article
            <div className="bg-[#4F2A7E] p-2 rounded-full">
              <ArrowRight size={24} color="#ffffff" />
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-8 md:px-16 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex justify-between items-end mb-12">
              <h3 className="text-4xl font-bold text-[#4F2A7E]">
                Recent Database Articles
              </h3>

              <Link
                href="/"
                className="text-[#D4AF37] font-medium flex items-center gap-3 hover:gap-4 transition-all text-lg"
              >
                View All Articles
                <ArrowRight size={22} />
              </Link>
            </div>

            {loadingSupabase ? (
              <div className="flex items-center gap-3 text-gray-500 py-12">
                <Loader2 className="animate-spin text-[#4F2A7E]" />
                <span>Fetching Supabase contents...</span>
              </div>
            ) : allPosts.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border text-center text-gray-500">
                No articles found in your database table. Click "Create an
                Article" to post one!
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <AnimatePresence mode="popLayout">
                  {allPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      {...post}
                      onInitiateDelete={handleInitiateDelete}
                      isDeleting={deletingId === post.id}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-white p-10 rounded-3xl border border-gray-100">
              <h4 className="font-bold text-2xl text-[#4F2A7E] mb-8">
                Most Read
              </h4>
              <ul className="space-y-8">
                {allPosts.slice(0, 3).map((post) => (
                  <li
                    key={post.id}
                    className="border-b border-gray-100 pb-8 last:border-none last:pb-0"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block hover:text-[#D4AF37] transition-colors group"
                    >
                      <p className="font-semibold leading-tight text-lg group-hover:text-[#4F2A7E]">
                        {post.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-3">
                        {post.date} • {post.readTime}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#4F2A7E] to-[#2C1847] text-white p-10 rounded-3xl">
              <h4 className="font-bold text-3xl mb-4">Stay Legally Ahead</h4>
              <p className="text-white/80 mb-8">
                Monthly insights on emerging laws, compliance, and strategic
                risk management.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Your professional email"
                  className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-white/60 focus:outline-none focus:border-[#D4AF37]"
                />
                <button className="w-full bg-[#D4AF37] hover:bg-white text-[#4F2A7E] font-bold py-4 rounded-2xl transition-all">
                  SUBSCRIBE NOW
                </button>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-gray-100">
              <h4 className="font-bold text-2xl text-[#4F2A7E] mb-8">
                Practice Areas
              </h4>
              <div className="flex flex-wrap gap-3">
             
              </div>
            </div>
          </aside>
        </div>
      </main>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setModalOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white max-w-md w-full rounded-3xl p-8 relative z-10 shadow-2xl border border-gray-100 text-center"
            >
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-50 text-red-500 mb-5">
                <AlertTriangle size={28} />
              </div>

              <h3 className="text-2xl font-bold text-[#4F2A7E] tracking-tight mb-2">
                Confirm Deletion
              </h3>

              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <span className="font-semibold text-gray-800">
                  "{targetTitle}"
                </span>
                ? This action is irreversible.
              </p>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-md shadow-red-500/20 transition-all text-sm"
                >
                  Delete Permanently
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
=======
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
>>>>>>> feature/improved-dashboard
