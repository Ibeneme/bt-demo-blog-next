// app/blog/[slug]/edit/BlogEditClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { supabase } from "../../../../configs/supabase";

interface Article {
  id: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  image_url: string | null;
  excerpt: string | null;
  content: string | null; // ← Added
  slug: string;
  category: string;
  structured_data: string | null;
}

export default function BlogEditClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    meta_title: "",
    meta_description: "",
    og_image_url: "",
    title: "",
    excerpt: "",
    content: "", // ← Added
  });

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      if (data) {
        setArticle(data);
        setFormData({
          meta_title: data.meta_title || data.title,
          meta_description: data.meta_description || data.excerpt || "",
          og_image_url: data.og_image_url || data.image_url || "",
          title: data.title,
          excerpt: data.excerpt || "",
          content: data.content || "", // ← Added
        });
      }
    } catch (err) {
      console.error("Error fetching article:", err);
      alert("Failed to load article");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;

    setSaving(true);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from("articles")
        .update({
          meta_title: formData.meta_title,
          meta_description: formData.meta_description,
          og_image_url: formData.og_image_url,
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content, // ← Added
          structured_data: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: formData.title,
            description: formData.meta_description,
            url: `https://bt-demo-blog.vercel.app/blog/${slug}`,
            image: formData.og_image_url || formData.og_image_url,
          }),
        })
        .eq("id", article.id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push(`/blog/${slug}`);
      }, 1500);
    } catch (err: any) {
      console.error(err);
      alert("Failed to update: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <Loader2 className="animate-spin text-[#4F2A7E]" size={50} />
      </div>
    );
  }

  if (!article) {
    return <div className="text-center py-20">Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-['Rethink_Sans'] py-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-[#4F2A7E] hover:underline mb-8"
        >
          <ArrowLeft size={18} /> Back to Article
        </Link>

        <div className="bg-white rounded-3xl shadow-sm p-10">
          <h1 className="text-4xl font-bold text-[#4F2A7E] mb-2">
            Edit Article
          </h1>
          <p className="text-gray-600 mb-10">
            Update SEO metadata and full content
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Article Title */}
            <div>
              <label className="block text-sm font-semibold text-[#000] mb-2">
                Article Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-5 py-4 text-[#000] border border-gray-200 rounded-2xl focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Title (SEO)
              </label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                className="w-full text-[#000] px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#D4AF37]"
                placeholder="Title for search engines"
              />
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                rows={3}
                className="w-full  text-[#000] px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#D4AF37]"
                placeholder="Short description for Google"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Excerpt / Summary
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full text-[#000] px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Open Graph Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Open Graph Image URL (1200x630 recommended)
              </label>
              <input
                type="text"
                name="og_image_url"
                value={formData.og_image_url}
                onChange={handleChange}
                className="w-full text-[#000] px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#D4AF37]"
                placeholder="https://..."
              />
              {formData.og_image_url && (
                <img
                  src={formData.og_image_url}
                  alt="OG Preview"
                  className="mt-4 max-h-48 rounded-2xl border"
                />
              )}
            </div>

            {/* FULL CONTENT - Editable Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Article Content (HTML supported)
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={20}
                className="w-full text-[#000] px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#D4AF37] font-mono text-sm"
                placeholder="Write your full article content here..."
              />
              <p className="text-xs text-gray-500 mt-2">
                You can paste HTML here (headings, paragraphs, lists, etc.)
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#4F2A7E] hover:bg-[#3A1F5E] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={22} /> Saving
                  Changes...
                </>
              ) : (
                <>
                  <Save size={22} /> Save All Changes
                </>
              )}
            </button>
          </form>

          {success && (
            <p className="text-green-600 text-center mt-6 font-medium">
              ✅ Article updated successfully! Redirecting...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
