"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/configs/supabase";

const heroBg =
  "https://images.unsplash.com/photo-1600427652630-f97cc4db10cd?q=80&w=2070&auto=format&fit=crop";

// --- SHIMMER LOADER COMPONENT ---
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

interface BlogPost {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author?: string;
}

export default function BlogClient() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loadingSupabase, setLoadingSupabase] = useState(true);

  const fetchSupabaseArticles = async () => {
    try {
      setLoadingSupabase(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        const formattedSupabasePosts: BlogPost[] = data.map((article: any) => {
          const words =
            article.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
          return {
            id: article.id,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            category: article.category || "Corporate Law",
            date: new Date(article.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            readTime: Math.max(1, Math.ceil(words / 200)) + " min read",
            image: article.image_url || heroBg,
            author: article.author || "ARIAD Team",
          };
        });
        setAllPosts(formattedSupabasePosts);
      }
    } catch (err) {
      console.error("Error pulling database articles:", err);
    } finally {
      setLoadingSupabase(false);
    }
  };

  useEffect(() => {
    fetchSupabaseArticles();
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
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
            Thoughts That <br />{" "}
            <span className="bg-gradient-to-r from-[#67E8D6] to-[#D6C1A0] bg-clip-text text-transparent">
              Guide Families
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 font-light">
            Clinical insights, parenting wisdom, and honest conversations.
          </p>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold text-[#023B37]">Latest Insights</h2>
        </div>

        {loadingSupabase ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden  hover:shadow-xl transition-all"
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
                  <h3 className="text-xl font-bold text-[#023B37] mb-3">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/view/${post.slug}`}
                    className="text-[#067F76] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
