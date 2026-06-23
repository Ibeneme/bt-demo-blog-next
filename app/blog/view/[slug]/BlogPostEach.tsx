"use client";

// app/blog/[slug]/BlogPostEach.tsx
export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { supabase } from "@/lib/configs/supabase";


const heroBgFallback =
  "https://images.unsplash.com/photo-1600427652630-f97cc4db10cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface BlogPost {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  ogImage?: string;
  author?: string;
  category?: string;
}

interface BlogPostClientProps {
  slug: string;
  initialPost: any;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatArticle(data: any): BlogPost {
  const words = data.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
  const computedReadTime = Math.max(1, Math.ceil(words / 200)) + " min read";
  const formattedDate = data.created_at
    ? new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent";

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt || "",
    content: data.content || "",
    category: data.category || "General",
    date: formattedDate,
    readTime: computedReadTime,
    image: data.image_url || heroBgFallback,
    ogImage: data.og_image_url,
    author: data.author || "ARIAD Team",
  };
}

function formatRelated(article: any): BlogPost {
  const words =
    article.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt || "",
    content: article.content || "",
    category: article.category || "General",
    date: new Date(article.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }),
    readTime: Math.max(1, Math.ceil(words / 200)) + " min read",
    image: article.image_url || heroBgFallback,
    author: article.author || "ARIAD Team",
  };
}

// ── Main component ────────────────────────────────────────────────────────────

export default function BlogPostEach({
  slug,
  initialPost,
}: BlogPostClientProps) {
  const [post, setPost] = useState<BlogPost | null>(
    // Hydrate immediately from the server-fetched data — no loading flash.
    initialPost ? formatArticle(initialPost) : null
  );
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  // Only show skeleton when there is genuinely no data yet.
  const [loading, setLoading] = useState(!initialPost);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Track whether we've already fetched related posts so we don't
  // re-run when the parent re-renders and passes a new initialPost object.
  const relatedFetched = useRef(false);

  useEffect(() => {
    // If we got initialPost from the server, skip the article fetch entirely
    // and just grab related posts once.
    if (initialPost) {
      if (relatedFetched.current) return;
      relatedFetched.current = true;

      const fetchRelated = async () => {
        const { data: relatedData } = await supabase
          .from("articles")
          .select("*")
          .eq("category", initialPost.category)
          .neq("slug", slug)
          .limit(3)
          .order("created_at", { ascending: false });

        if (relatedData) {
          setRelatedPosts(relatedData.map(formatRelated));
        }
      };

      fetchRelated();
      return;
    }

    // Fallback: no initialPost — fetch everything client-side.
    const fetchPost = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error || !data) {
          console.error("Article not found:", slug);
          return;
        }

        setPost(formatArticle(data));

        const { data: relatedData } = await supabase
          .from("articles")
          .select("*")
          .eq("category", data.category)
          .neq("slug", slug)
          .limit(3)
          .order("created_at", { ascending: false });

        if (relatedData) {
          setRelatedPosts(relatedData.map(formatRelated));
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    // ⚠️ Intentionally NOT including initialPost in deps — it is a plain
    // object prop that changes reference every render. slug is the real key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // ── Share handler ───────────────────────────────────────────────────────
  const handleShare = async () => {
    if (!post) return;
    if (!navigator.share) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch (err) {
        console.error("Failed to copy link", err);
      }
      return;
    }
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } catch (err: any) {
      if (err.name !== "AbortError") console.error("Share failed:", err);
    }
  };

  if (loading) return <ArticleSkeleton />;

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center py-20">
        <h1 className="text-5xl font-bold text-[#023B37] mb-6">
          Article Not Found
        </h1>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#067F76] text-white rounded-2xl hover:bg-[#023B37] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  // Sanitize the HTML from the rich-text editor before rendering.
  // This removes <script> tags, event handlers (onclick, onerror …),
  // and any other vectors for XSS while keeping all formatting intact.
  const sanitizedContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "div",
      "br",
      "hr",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "a",
      "img",
      "span",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "style", "class"],
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      {/* ── Article content styles ─────────────────────────────────────── */}
      <style>{`
        .article-body h1 {
          font-size: 1.9rem;
          font-weight: 800;
          color: #023B37;
          margin: 1.4em 0 0.5em;
          line-height: 1.2;
        }
        .article-body h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #023B37;
          margin: 1.3em 0 0.5em;
          line-height: 1.25;
        }
        .article-body h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #023B37;
          margin: 1.1em 0 0.4em;
          line-height: 1.3;
        }
        .article-body h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #023B37;
          margin: 1em 0 0.4em;
          line-height: 1.4;
        }
        .article-body p {
          color: #334155;
          line-height: 1.85;
          margin: 0 0 1.1em;
        }
        .article-body ul {
          list-style-type: disc !important;
          padding-left: 1.75em !important;
          margin: 0.75em 0 1.1em !important;
        }
        .article-body ol {
          list-style-type: decimal !important;
          padding-left: 1.75em !important;
          margin: 0.75em 0 1.1em !important;
        }
        .article-body ul li {
          display: list-item !important;
          list-style-type: disc !important;
          color: #334155;
          line-height: 1.75;
          margin-bottom: 0.35em;
        }
        .article-body ol li {
          display: list-item !important;
          list-style-type: decimal !important;
          color: #334155;
          line-height: 1.75;
          margin-bottom: 0.35em;
        }
        .article-body blockquote {
          border-left: 4px solid #067F76;
          padding: 0.6em 1.2em;
          margin: 1.2em 0;
          color: #475569;
          font-style: italic;
          background: #f0fafa;
          border-radius: 0 0.5em 0.5em 0;
        }
        .article-body code {
          background: #e2e8f0;
          padding: 0.15em 0.45em;
          border-radius: 0.3em;
          font-family: ui-monospace, monospace;
          font-size: 0.88em;
          color: #023B37;
        }
        .article-body pre {
          background: #0f2622;
          color: #e6f3f1;
          padding: 1em;
          border-radius: 0.75em;
          overflow-x: auto;
        }
        .article-body pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }
        .article-body a {
          color: #067F76;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .article-body a:hover {
          color: #023B37;
        }
        .article-body strong {
          font-weight: 700;
          color: #023B37;
        }
        .article-body em {
          font-style: italic;
        }
        .article-body img {
          max-width: 100%;
          border-radius: 0.75em;
          margin: 1.2em 0;
        }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.2em 0;
        }
        .article-body th,
        .article-body td {
          border: 1px solid #e2e8f0;
          padding: 0.6em 0.8em;
          text-align: left;
        }
        .article-body th {
          background: #f1f4f9;
          color: #023B37;
        }
        .article-body [style*="line-height"] {
          line-height: inherit !important;
        }
      `}</style>

      {/* ── Back Button ── */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#067F76] hover:text-[#023B37] transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to All Articles
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="relative h-[70vh] flex items-end mt-5">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 text-white w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm mb-6">
            {post.category}
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 hover:text-[#67E8D6] transition-colors"
            >
              <Share2 className="w-5 h-5" />
              {shareSuccess ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <article className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 md:p-16">
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className="article-body"
          />
        </div>
      </article>

      {/* ── Related Articles ── */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-bold text-[#023B37] mb-10">
            More in {post.category}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((rel, idx) => (
              <motion.div
                key={rel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <span className="text-xs font-semibold text-[#067F76] mb-2 block">
                    {rel.category}
                  </span>
                  <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-[#067F76] transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="text-[#067F76] inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                  >
                    Read Article <ArrowLeft className="rotate-180 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.ogImage || post.image,
            datePublished: initialPost?.created_at,
            author: {
              "@type": "Organization",
              name: "ARIAD Psychological Services",
            },
            publisher: {
              "@type": "Organization",
              name: "ARIAD Psychological Services",
              logo: {
                "@type": "ImageObject",
                url: "https://ariad-nine.vercel.app/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://ariad-nine.vercel.app/blog/${post.slug}`,
            },
          }),
        }}
      />
    </div>
  );
}

// ── Shimmer Skeleton ──────────────────────────────────────────────────────────
function ArticleSkeleton() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      <style jsx global>{`
        @keyframes shimmer-sweep {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
        }
        .shimmer {
          position: relative;
          overflow: hidden;
          background-color: #e7e9ee;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.65) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 400px 100%;
          animation: shimmer-sweep 1.5s ease-in-out infinite;
        }
        .shimmer-dark {
          position: relative;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.08);
        }
        .shimmer-dark::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.18) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 400px 100%;
          animation: shimmer-sweep 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-6 pt-8">
        <div className="h-5 w-40 rounded-full shimmer" />
      </div>

      <section className="relative h-[70vh] flex items-end overflow-hidden bg-slate-800 mt-6">
        <div className="absolute inset-0 shimmer-dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full">
          <div className="h-7 w-32 rounded-full shimmer-dark mb-6" />
          <div className="space-y-4 mb-6">
            <div className="h-12 md:h-14 w-full max-w-xl rounded-2xl shimmer-dark" />
            <div className="h-12 md:h-14 w-3/4 max-w-md rounded-2xl shimmer-dark" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="h-4 w-24 rounded-full shimmer-dark" />
            <div className="h-4 w-32 rounded-full shimmer-dark" />
            <div className="h-4 w-20 rounded-full shimmer-dark" />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 space-y-5">
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-5/6 rounded-full shimmer" />
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-2/3 rounded-full shimmer" />
          <div className="pt-4" />
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-4/5 rounded-full shimmer" />
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-3/4 rounded-full shimmer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="h-8 w-64 rounded-full shimmer mb-10" />
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100"
            >
              <div className="h-52 shimmer" />
              <div className="p-8 space-y-3">
                <div className="h-4 w-full rounded-full shimmer" />
                <div className="h-4 w-2/3 rounded-full shimmer" />
                <div className="h-4 w-28 rounded-full shimmer mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
