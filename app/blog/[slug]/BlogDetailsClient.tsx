"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Share2, User, Edit3 } from "lucide-react";
import { supabase } from "../../../configs/supabase";
import DOMPurify from "dompurify";

interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  created_at?: string;
}

interface BlogDetailsClientProps {
  slug: string;
}

const fallbackImage =
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80";

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
    image: data.image_url || fallbackImage,
    author: data.author || "ARIAD Team",
    created_at: data.created_at,
  };
}

export default function BlogDetailsClient({ slug }: BlogDetailsClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for admin token
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);

    window.scrollTo(0, 0);

    async function fetchArticleDetails() {
      try {
        setLoading(true);
        const { data: currentArticle, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error || !currentArticle)
          throw error || new Error("Article not found");

        const formattedPost = formatArticle(currentArticle);
        setPost(formattedPost);

        // Related posts
        const { data: siblings } = await supabase
          .from("articles")
          .select("*")
          .neq("id", currentArticle.id)
          .limit(6);

        if (siblings) {
          const formatted = siblings.map(formatArticle);
          const sorted = formatted
            .sort(
              (a, b) =>
                (b.category === formattedPost.category ? 1 : 0) -
                (a.category === formattedPost.category ? 1 : 0)
            )
            .slice(0, 3);
          setRelatedPosts(sorted);
        }
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchArticleDetails();
  }, [slug]);

  const handleShare = async () => {
    if (!post) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2200);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Share failed", err);
      }
    }
  };

  const sanitizedContent = post?.content
    ? DOMPurify.sanitize(post.content, {
        ALLOWED_TAGS: [
          "h1",
          "h2",
          "h3",
          "h4",
          "p",
          "div",
          "br",
          "strong",
          "em",
          "b",
          "i",
          "ul",
          "ol",
          "li",
          "blockquote",
          "code",
          "pre",
          "a",
          "img",
          "table",
          "th",
          "td",
          "tr",
          "span",
          "hr",
        ],
        ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "class", "style"],
      })
    : "";

  if (loading) return <ArticleSkeleton />;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <Link href="/blog" className="text-[#067F76] hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#067F76] hover:underline text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5" /> Back to All Articles
        </Link>
      </div>

      {/* Hero Section - More Responsive */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-end mt-4">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16 text-white w-full">
          <div className="inline-flex items-center px-4 py-1.5 bg-white/10 rounded-full text-xs sm:text-sm mb-6">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm opacity-90">
            <span>
              <User className="inline w-4 h-4 mr-1" /> {post.author}
            </span>
            <span>
              <Calendar className="inline w-4 h-4 mr-1" /> {post.date}
            </span>
            <span>
              <Clock className="inline w-4 h-4 mr-1" /> {post.readTime}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              {shareSuccess ? "Link Copied!" : "Share"}
            </button>


            {isAdmin && (
            <Link
              href={`/blog/${post.slug}/edit`}
              className="ml-auto flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-2xl font-medium transition-all"
            >
              <Edit3 size={18} />
              Edit
            </Link>
          )}
          </div>

   
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-16 shadow-xl">
          <style jsx global>{`
            .article-body {
              font-size: 1.05rem;
              line-height: 1.85;
              color: #374151;
            }
            .article-body h1,
            .article-body h2,
            .article-body h3 {
              font-weight: 700;
              margin-top: 2.25rem;
              margin-bottom: 1.25rem;
              scroll-margin-top: 80px;
              color: #1f2937;
            }
            .article-body h2 {
              font-size: 1.75rem;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 0.75rem;
            }
            .article-body h3 {
              font-size: 1.45rem;
            }
            .article-body p {
              margin-bottom: 1.35rem;
            }
            .article-body ul,
            .article-body ol {
              margin-bottom: 1.5rem;
              padding-left: 1.6rem;
            }
            .article-body ul {
              list-style-type: disc;
            }
            .article-body ol {
              list-style-type: decimal;
            }
            .article-body li {
              margin-bottom: 0.65rem;
              padding-left: 0.25rem;
            }
            .article-body strong,
            .article-body b {
              color: #1f2937;
              font-weight: 600;
            }
            .article-body blockquote {
              border-left: 4px solid #067f76;
              padding-left: 1.25rem;
              color: #4b5563;
              font-style: italic;
              margin: 2rem 0;
            }
            .article-body a {
              color: #067f76;
              text-decoration: underline;
            }
            .article-body a:hover {
              color: #045c55;
            }
          `}</style>
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className="article-body prose prose-lg max-w-none"
          />
        </div>
      </article>

      {/* Related Posts - Fixed Mobile Overflow + Better Responsive */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-gray-900">
            More in {post.category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedPosts.map((rel, index) => {
              console.log(
                `🔗 Rendering related post #${index + 1}:`,
                rel.title
              );
              return (
                <Link
                  key={rel.id}
                  href={`/blog/view/${rel.slug}`}
                  className="block group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#067F76]/20"
                >
                  <div className="relative h-48 sm:h-52 lg:h-56">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="font-bold text-lg sm:text-xl mb-3 group-hover:text-[#067F76] transition-colors line-clamp-2">
                      {rel.title}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                      {rel.excerpt}
                    </p>
                    <span className="text-[#067F76] font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                      Read Article →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

// Skeleton
function ArticleSkeleton() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <div className="h-5 w-40 bg-slate-200 rounded-full animate-pulse" />
      </div>

      <section className="relative h-[65vh] bg-slate-200 animate-pulse mt-6" />

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-12 space-y-6 border border-slate-100">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
