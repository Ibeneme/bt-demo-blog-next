// app/blog/[slug]/BlogDetailsClient.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Loader2,
  Edit3, // ← New icon for Edit
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/configs/supabase";
import DOMPurify from "dompurify";

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
  tags?: string[];
}

interface BlogDetailsClientProps {
  slug: string;
}

export default function BlogDetailsClient({ slug }: BlogDetailsClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log("🔹 BlogDetailsClient mounted with slug:", slug);
    window.scrollTo(0, 0);

    async function fetchArticleDetails() {
      try {
        setLoading(true);
        console.log("📡 Fetching article details from Supabase...");

        const { data: currentArticle, error: articleError } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (articleError) throw articleError;

        if (currentArticle) {
          console.log("✅ Article loaded:", currentArticle.title);

          const words =
            currentArticle.content?.replace(/<[^>]*>/g, "").split(/\s+/)
              .length || 0;
          const computedReadTime =
            Math.max(1, Math.ceil(words / 200)) + " min read";

          const formattedDate = currentArticle.created_at
            ? new Date(currentArticle.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Recent";

          const loadedPost: BlogPost = {
            id: currentArticle.id,
            slug: currentArticle.slug,
            title: currentArticle.title,
            excerpt: currentArticle.excerpt,
            content: currentArticle.content,
            category: currentArticle.category || "Corporate Law",
            date: formattedDate,
            readTime: computedReadTime,
            image:
              currentArticle.image_url ||
              "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
            tags: currentArticle.tags || [],
          };

          setPost(loadedPost);

          // Fetch related posts
          const { data: siblingArticles } = await supabase
            .from("articles")
            .select("*")
            .neq("id", currentArticle.id)
            .limit(6);

          if (siblingArticles) {
            const formattedSiblings: BlogPost[] = siblingArticles.map(
              (article: any) => ({
                id: article.id,
                slug: article.slug,
                title: article.title,
                excerpt: article.excerpt,
                category: article.category || "Corporate Law",
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
                      (article.content?.replace(/<[^>]*>/g, "").split(/\s+/)
                        .length || 0) / 200
                    )
                  ) + " min read",
                image:
                  article.image_url ||
                  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
              })
            );

            const sortedSiblings = formattedSiblings
              .sort(
                (a, b) =>
                  (b.category === loadedPost.category ? 1 : 0) -
                  (a.category === loadedPost.category ? 1 : 0)
              )
              .slice(0, 3);

            setRelatedPosts(sortedSiblings);
          }
        }
      } catch (err) {
        console.error("❌ Error retrieving article:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchArticleDetails();
  }, [slug]);

  const handleShare = async () => {
    if (!post) return;
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };
    if (navigator.share && navigator.canShare?.(shareData)) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7F4] gap-3 text-gray-500">
        <Loader2 className="animate-spin text-[#4F2A7E]" size={40} />
        <span>Loading article...</span>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7F4] gap-6">
        <h1 className="text-4xl font-bold text-[#4F2A7E]">Article Not Found</h1>
        <Link href="/" className="text-[#D4AF37] hover:underline">
          Back to All Articles
        </Link>
      </div>
    );

  const pageUrl = `https://bt-demo-blog.vercel.app/blog/${post.slug}`;

  return (
    <div className="bg-[#F8F7F4] min-h-screen font-['Rethink_Sans']">
      {/* Client-side meta fallback */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.image} />
      <meta property="og:url" content={pageUrl} />

      <style>{`
        .blog-content h2 { 
          font-size: 1.75rem; 
          font-weight: 800; 
          color: #4F2A7E; 
          margin-top: 2rem; 
          margin-bottom: 1rem; 
          padding-left: 0.75rem; 
          border-left: 4px solid #D4AF37; 
        }
        @media (min-width: 768px) { 
          .blog-content h2 { font-size: 2.2rem; padding-left: 1rem; } 
        }
        .blog-content p { 
          line-height: 1.8; 
          margin-bottom: 1.5rem; 
          font-size: 1rem; 
          color: #374151; 
        }
        @media (min-width: 768px) { 
          .blog-content p { font-size: 1.125rem; line-height: 2.2; } 
        }
        .blog-content p:first-of-type::first-letter { 
          float: left; 
          font-size: 3.5rem; 
          line-height: 0.75; 
          color: #4F2A7E; 
          font-family: Georgia, serif; 
        }
      `}</style>

      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 h-full flex flex-col justify-end pb-12 md:pb-20 text-white">
          <Link
            href="/"
            className="mb-6 md:mb-8 inline-flex items-center gap-2 text-white/80 hover:text-white text-sm"
          >
            <ArrowLeft size={16} /> Back to All Articles
          </Link>
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#D4AF37] text-[#4F2A7E] font-bold text-xs md:text-sm w-fit">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-6xl font-bold leading-[1.1]">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-6 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} /> {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} /> {post.readTime}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 md:px-6 -mt-10 md:-mt-12 relative z-20">
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-16 shadow-sm"
        >
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#4F2A7E]/5 text-[#4F2A7E] px-3 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share + Edit Buttons */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-sm uppercase text-gray-500">
              {copied ? "Copied!" : "Share"}
            </span>
            <button
              onClick={handleShare}
              className={`p-3 rounded-2xl ${
                copied ? "bg-green-50 text-green-600" : "hover:bg-gray-100"
              }`}
            >
              {copied ? <Check size={20} /> : <Share2 size={20} />}
            </button>

            {/* NEW: Edit SEO Button */}
            <Link
              href={`/blog/${post.slug}/edit`}
              className="ml-auto flex items-center gap-2 bg-[#4F2A7E] hover:bg-[#3A1F5E] text-white px-5 py-3 rounded-2xl font-medium transition-all"
            >
              <Edit3 size={20} />
              Edit SEO
            </Link>
          </div>

          <div className="w-full max-w-full overflow-hidden">
            <div
              className="blog-content prose prose-lg max-w-none mx-[-88px]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content || post.excerpt),
              }}
            />
          </div>
        </motion.article>
      </main>

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-bold text-[#4F2A7E] mb-12">
          Continue Reading
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {relatedPosts.map((related) => (
            <Link
              key={related.id}
              href={`/blog/${related.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={related.image}
                  className="w-full h-full object-cover"
                  alt={related.title}
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#4F2A7E] text-lg mb-2">
                  {related.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {related.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}