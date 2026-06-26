// app/blog/[slug]/edit/BlogEditClient.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Edit3,
  CheckCircle,
  XCircle,
  Globe,
  Search,
  Hash,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../../configs/supabase";
import RichTextEditor from "@/components/Richtexteditor";
import { convertToJpeg } from "@/lib/imageUse";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  image_url: string | null;
  og_image_url: string | null;
  structured_data: any;
}

const slugify = (input: string) =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export default function BlogEditClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [apiError, setApiError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    structuredData: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [ogImage, setOgImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ogPreview, setOgPreview] = useState<string | null>(null);
  const [ogRemoved, setOgRemoved] = useState(false);

  const [isStructuredDataCustomized, setIsStructuredDataCustomized] =
    useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ogInputRef = useRef<HTMLInputElement>(null);
  const structuredDataRef = useRef<HTMLTextAreaElement>(null);

  // Fetch Article
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
          title: data.title,
          slug: data.slug,
          category: data.category || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          metaTitle: data.meta_title || data.title,
          metaDescription: data.meta_description || "",
          canonicalUrl:
            data.canonical_url ||
            `https://bt-demo-blog.vercel.app/blog/${data.slug}`,
          structuredData: data.structured_data
            ? typeof data.structured_data === "string"
              ? data.structured_data
              : JSON.stringify(data.structured_data, null, 2)
            : "",
        });

        if (data.image_url) setImagePreview(data.image_url);
        if (data.og_image_url) setOgPreview(data.og_image_url);
      }
    } catch (err: any) {
      console.error("Error fetching article:", err);
      setError("Failed to load article");
    } finally {
      setLoading(false);
    }
  };

  const generateStructuredData = (data: typeof formData): string => {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://bt-demo-blog.vercel.app";
    const articleUrl =
      data.canonicalUrl || `${baseUrl}/blog/${data.slug || slug}`;
    const structured = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      url: articleUrl,
      headline: data.title || "Untitled Article",
      description: data.excerpt || data.metaDescription || "",
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      author: { "@type": "Organization", name: "Blessing Attorney" },
      publisher: {
        "@type": "Organization",
        name: "Blessing Attorney",
        logo: { "@type": "ImageObject", url: `${baseUrl}/logo.png` },
      },
    };
    return JSON.stringify(structured, null, 2);
  };

  const resetToAutoStructured = () => {
    setIsStructuredDataCustomized(false);
    const autoData = generateStructuredData(formData);
    setFormData((prev) => ({ ...prev, structuredData: autoData }));
  };

  // ==================== SLUG HANDLING ====================
  const handleSlugChange = (raw: string) => {
    setSlugError(null);
    setFormData((prev) => ({ ...prev, slug: raw }));
  };

  const handleSlugBlur = async () => {
    const cleaned = slugify(formData.slug);
    setFormData((prev) => ({ ...prev, slug: cleaned }));

    if (!cleaned) {
      setSlugError("Slug can't be empty");
      return;
    }
    if (cleaned === article?.slug) {
      setSlugError(null);
      return;
    }

    setCheckingSlug(true);
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", cleaned)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setSlugError("This slug is already in use by another article");
      } else {
        setSlugError(null);
      }
    } catch (err) {
      console.error("Slug check failed:", err);
    } finally {
      setCheckingSlug(false);
    }
  };

  // ==================== IMAGE HANDLING ====================
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isOg: boolean
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    if (isOg) {
      setOgImage(file);
      setOgPreview(previewUrl);
      setOgRemoved(false);
    } else {
      setImage(file);
      setImagePreview(previewUrl);
    }
  };

  const removeOgImage = () => {
    setOgImage(null);
    setOgPreview(null);
    setOgRemoved(true);
    if (ogInputRef.current) ogInputRef.current.value = "";
  };

  const uploadImage = async (
    file: File,
    folder: string
  ): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(`${folder}/${fileName}`, file, {
        cacheControl: "3600",
        upsert: true,
      });
    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(`${folder}/${fileName}`);
    return urlData.publicUrl;
  };

  // ==================== SUBMIT ====================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;

    if (!formData.title || !formData.excerpt || !formData.content) {
      setError("Title, excerpt, and content are required");
      return;
    }

    const cleanedSlug = slugify(formData.slug);
    if (!cleanedSlug) {
      setError("Slug can't be empty");
      return;
    }
    if (!formData.category.trim()) {
      setError("Category is required");
      return;
    }
    if (slugError) {
      setError(slugError);
      return;
    }

    setSaving(true);
    setError("");

    try {
      let finalImageUrl = article.image_url;
      let finalOgUrl: string | null = article.og_image_url;

      if (image) {
        finalImageUrl = await uploadImage(
          await convertToJpeg(image),
          "featured"
        );
      }
      if (ogRemoved) {
        finalOgUrl = null;
      }
      if (ogImage) {
        finalOgUrl = await uploadImage(await convertToJpeg(ogImage), "og");
      }

      const { error } = await supabase
        .from("articles")
        .update({
          title: formData.title,
          slug: cleanedSlug,
          category: formData.category.trim(),
          excerpt: formData.excerpt,
          content: formData.content,
          meta_title: formData.metaTitle,
          meta_description: formData.metaDescription,
          canonical_url: formData.canonicalUrl,
          image_url: finalImageUrl,
          og_image_url: finalOgUrl,
          structured_data: formData.structuredData
            ? JSON.parse(formData.structuredData)
            : null,
        })
        .eq("id", article.id);

      if (error) throw error;

      setModalType("success");
      setShowModal(true);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Failed to update article");
      setModalType("error");
      setShowModal(true);
    } finally {
      setSaving(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalType === "success") {
      router.push(`/admin/dashboard`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F4F9]">
        <Loader2 className="animate-spin text-[#067F76]" size={60} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F4F9] py-12 px-4 md:px-8 font-['Rethink_Sans']">
      <div className="max-w-4xl mx-auto pt-[120px]">
        <Link
          href={`/blog/${article?.slug || slug}`}
          className="inline-flex items-center gap-2 text-[#023B37] font-semibold mb-6 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Article
        </Link>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#067F76]/10 text-[#067F76] rounded-2xl">
                <Save />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                Edit Article
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Article Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    <Hash size={13} /> Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    onBlur={handleSlugBlur}
                    className={`w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:border-[#067F76] font-mono text-sm ${
                      slugError ? "border-red-400" : "border-slate-200"
                    }`}
                    placeholder="article-url-slug"
                  />
                  <p className="text-xs mt-1.5 text-slate-500">
                    {checkingSlug
                      ? "Checking availability..."
                      : slugError
                      ? slugError
                      : "Used in the URL — changing this changes the article's link."}
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    <Tag size={13} /> Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
                    placeholder="e.g. Child Psychology"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Featured Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#067F76]"
                >
                  <ImageIcon className="text-slate-400" size={24} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, false)}
                    className="hidden"
                  />
                  <span className="text-sm text-slate-600">
                    {imagePreview
                      ? "Change Featured Image"
                      : "Upload New Image"}
                  </span>
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="mt-3 rounded-xl max-h-48 object-cover w-full"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={3}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
                />
              </div>

              {/* RICH TEXT EDITOR */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Full Content
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(html) =>
                    setFormData((prev) => ({ ...prev, content: html }))
                  }
                  stickyTopOffset={96} // match your nav height
                />
              </div>
            </div>
          </div>

          {/* SEO & Metadata */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
              <Search size={20} /> SEO & Metadata
            </h2>
            <div className="space-y-5">
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) =>
                  setFormData({ ...formData, metaTitle: e.target.value })
                }
                placeholder="Meta Title"
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
              />
              <textarea
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData({ ...formData, metaDescription: e.target.value })
                }
                rows={3}
                placeholder="Meta Description"
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
              />
              <input
                type="url"
                value={formData.canonicalUrl}
                onChange={(e) =>
                  setFormData({ ...formData, canonicalUrl: e.target.value })
                }
                placeholder="Canonical URL"
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
              />
            </div>
          </div>

          {/* OG Image & Structured Data */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-8">
            <div>
              <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5 mb-3">
                <Globe size={16} /> Open Graph Image
              </label>

              <input
                ref={ogInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, true)}
                className="hidden"
              />

              {ogPreview ? (
                <div className="group relative h-48 rounded-2xl overflow-hidden border border-slate-200">
                  <img
                    src={ogPreview}
                    alt="OG Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-all group-hover:bg-black/50 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        ogInputRef.current?.click();
                      }}
                      className="px-4 py-2 bg-white text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-100"
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeOgImage();
                      }}
                      className="px-4 py-2 bg-white/90 text-red-600 rounded-xl text-sm font-semibold hover:bg-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => ogInputRef.current?.click()}
                  className="border border-dashed border-slate-300 rounded-2xl p-6 text-center cursor-pointer hover:border-[#067F76]"
                >
                  <p className="text-slate-500">
                    Upload OG Image (1200x630 recommended)
                  </p>
                </div>
              )}

              <p className="text-xs mt-2 text-slate-500">
                Uploaded images are converted to JPEG automatically — AVIF isn't
                reliably rendered by iMessage, Slack, and some link previews.
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <Edit3 size={20} /> Structured Data
                </h3>
                <button
                  type="button"
                  onClick={resetToAutoStructured}
                  className="text-sm text-[#067F76] hover:underline"
                >
                  Reset to Auto
                </button>
              </div>
              <textarea
                ref={structuredDataRef}
                value={formData.structuredData}
                onChange={(e) => {
                  setIsStructuredDataCustomized(true);
                  setFormData({ ...formData, structuredData: e.target.value });
                }}
                className="w-full h-80 font-mono text-sm p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 outline-none resize-y"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={saving || checkingSlug || !!slugError}
            className="w-full bg-[#023B37] hover:bg-[#067F76] text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <Save size={22} /> Save Changes
              </>
            )}
          </button>
        </motion.form>
      </div>

      {/* Success/Error Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={handleModalClose}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center z-10"
            >
              {modalType === "success" ? (
                <>
                  <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-6" />
                  <h3 className="text-2xl font-bold text-[#067F76] mb-2">
                    Article Updated!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Changes saved successfully.
                  </p>
                  <button
                    onClick={handleModalClose}
                    className="w-full py-3 bg-[#067F76] text-white rounded-2xl font-semibold"
                  >
                    View Article
                  </button>
                </>
              ) : (
                <>
                  <XCircle className="mx-auto h-16 w-16 text-red-600 mb-6" />
                  <h3 className="text-2xl font-bold text-red-600 mb-2">
                    Update Failed
                  </h3>
                  <p className="text-gray-600 mb-8">{apiError}</p>
                  <button
                    onClick={handleModalClose}
                    className="w-full py-3 bg-slate-800 text-white rounded-2xl font-semibold"
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
