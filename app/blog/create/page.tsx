"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Link2,
  Quote,
  Code as CodeIcon,
  Undo,
  Redo,
  Trash2,
  Palette,
  Highlighter,
  Edit3,
  Upload,
  CheckCircle,
  XCircle,
  Globe,
  Search,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "../../../configs/supabase"; // Adjust path as needed
import RichTextEditor from "@/components/Richtexteditor";
import { convertToJpeg } from "@/lib/imageUse";
import AdminGuard from "@/app/admin/AdminGuard";

export default function CreateArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "General",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    structuredData: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [ogImage, setOgImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ogPreview, setOgPreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [apiError, setApiError] = useState<string | null>(null);

  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [isMetaTitleCustomized, setIsMetaTitleCustomized] = useState(false);
  const [isMetaDescCustomized, setIsMetaDescCustomized] = useState(false);
  const [isStructuredDataCustomized, setIsStructuredDataCustomized] =
    useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ogInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const structuredDataRef = useRef<HTMLTextAreaElement>(null);

  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [currentFontSize, setCurrentFontSize] = useState("16");
  const [currentLineHeight, setCurrentLineHeight] = useState("1.6");

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48];
  const lineHeights = [
    { label: "1.0", value: "1.0" },
    { label: "1.2", value: "1.2" },
    { label: "1.4", value: "1.4" },
    { label: "1.6", value: "1.6" },
    { label: "1.8", value: "1.8" },
    { label: "2.0", value: "2.0" },
    { label: "2.5", value: "2.5" },
    { label: "3.0", value: "3.0" },
  ];

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const generateStructuredData = (data: typeof formData): string => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";
    const articleUrl =
      data.canonicalUrl ||
      `${baseUrl}/blog/${data.slug || generateSlug(data.title)}`;
    const structured = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      url: articleUrl,
      headline: data.title || "Untitled Article",
      description: data.excerpt || data.metaDescription || "",
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: "ARIAD Psychological Services", // Adjust per project
      },
      publisher: {
        "@type": "Organization",
        name: "ARIAD Psychological Services",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
    };
    return JSON.stringify(structured, null, 2);
  };

  useEffect(() => {
    if (!isStructuredDataCustomized && (formData.title || formData.excerpt)) {
      const newStructured = generateStructuredData(formData);
      setFormData((prev) => ({ ...prev, structuredData: newStructured }));
    }
  }, [
    formData.title,
    formData.excerpt,
    formData.slug,
    formData.canonicalUrl,
    isStructuredDataCustomized,
  ]);

  const handleStructuredDataChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIsStructuredDataCustomized(true);
    setFormData((prev) => ({ ...prev, structuredData: e.target.value }));
  };

  const resetToAutoStructured = () => {
    setIsStructuredDataCustomized(false);
    const autoData = generateStructuredData(formData);
    setFormData((prev) => ({ ...prev, structuredData: autoData }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "title" && !isSlugCustomized) {
      const newSlug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        slug: newSlug,
        metaTitle: isMetaTitleCustomized
          ? prev.metaTitle
          : `${value} | ARIAD Psychological Services`,
        canonicalUrl: `${
          process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com"
        }/blog/${newSlug}`,
      }));
    }

    if (name === "excerpt" && !isMetaDescCustomized) {
      const truncated =
        value.length > 155 ? value.slice(0, 152) + "..." : value;
      setFormData((prev) => ({ ...prev, metaDescription: truncated }));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugCustomized(e.target.value.trim() !== "");
    setFormData((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleMetaTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMetaTitleCustomized(e.target.value.trim() !== "");
    setFormData((prev) => ({ ...prev, metaTitle: e.target.value }));
  };

  const handleMetaDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsMetaDescCustomized(e.target.value.trim() !== "");
    setFormData((prev) => ({ ...prev, metaDescription: e.target.value }));
  };

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
    } else {
      setImage(file);
      setImagePreview(previewUrl);
    }
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

  // Rich Text Editor Logic
  const escapeHtml = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const syncContent = () => {
    if (contentRef.current) {
      setFormData((prev) => ({
        ...prev,
        content: contentRef.current!.innerHTML,
      }));
    }
  };

  const getBlockElement = (
    node: Node | null,
    editor: HTMLElement
  ): HTMLElement | null => {
    const BLOCK = /^(P|H[1-6]|BLOCKQUOTE|DIV|LI|UL|OL)$/;
    while (node && node !== editor) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        BLOCK.test((node as Element).tagName)
      ) {
        return node as HTMLElement;
      }
      node = node.parentNode;
    }
    return null;
  };

  const updateActiveFormats = () => {
    const editor = contentRef.current;
    if (!editor) return;
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0 || !selection.anchorNode) {
      setActiveFormats(new Set());
      return;
    }
    if (!editor.contains(selection.anchorNode)) {
      setActiveFormats(new Set());
      return;
    }
    const next = new Set<string>();
    const toggleCommands = [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "insertUnorderedList",
      "insertOrderedList",
    ];
    toggleCommands.forEach((cmd) => {
      try {
        if (document.queryCommandState(cmd)) next.add(cmd);
      } catch {}
    });
    try {
      const block = document.queryCommandValue("formatBlock").toLowerCase();
      if (["h1", "h2", "h3", "h4", "blockquote"].includes(block)) {
        next.add(block);
      }
    } catch {}
    let detectedLineHeight = "1.6";
    const anchorBlock = getBlockElement(selection.anchorNode, editor);
    if (anchorBlock) {
      const computed = window.getComputedStyle(anchorBlock).lineHeight;
      if (computed === "normal") detectedLineHeight = "1.6";
      else if (computed.endsWith("px")) {
        const px = parseFloat(computed);
        detectedLineHeight = (px / 16).toFixed(1);
      } else {
        detectedLineHeight = parseFloat(computed).toFixed(1);
      }
    }
    setCurrentLineHeight(detectedLineHeight);
    setActiveFormats(next);
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () =>
      document.removeEventListener("selectionchange", updateActiveFormats);
  }, []);

  const exec = (command: string, value?: string) => {
    const editor = contentRef.current;
    if (!editor) return;
    document.execCommand(command, false, value);
    editor.focus();
    syncContent();
    updateActiveFormats();
  };

  const toggleHeading = (tag: "h1" | "h2" | "h3" | "h4") => {
    const editor = contentRef.current;
    if (!editor) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    let node: Node | null = sel.anchorNode;
    let blockEl: HTMLElement | null = null;
    while (node && node !== editor) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        /^(P|H[1-6]|BLOCKQUOTE|DIV|LI)$/.test((node as Element).tagName)
      ) {
        blockEl = node as HTMLElement;
        break;
      }
      node = node.parentNode;
    }
    if (!blockEl) {
      document.execCommand("formatBlock", false, `<${tag}>`);
      editor.focus();
      syncContent();
      updateActiveFormats();
      return;
    }
    const currentTag = blockEl.tagName.toLowerCase();
    if (currentTag === tag) {
      const p = document.createElement("p");
      p.innerHTML = blockEl.innerHTML;
      blockEl.replaceWith(p);
      const range = document.createRange();
      range.selectNodeContents(p);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      const newEl = document.createElement(tag);
      newEl.innerHTML = blockEl.innerHTML;
      blockEl.replaceWith(newEl);
      const range = document.createRange();
      range.selectNodeContents(newEl);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    editor.focus();
    syncContent();
    updateActiveFormats();
  };

  const applyLineHeight = (value: string) => {
    const editor = contentRef.current;
    if (!editor) return;
    setCurrentLineHeight(value);
    const sel = window.getSelection();
    const BLOCK = /^(P|H[1-6]|BLOCKQUOTE|DIV|LI|UL|OL)$/;
    const getBlock = (node: Node | null): HTMLElement | null => {
      while (node && node !== editor) {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          BLOCK.test((node as Element).tagName)
        ) {
          return node as HTMLElement;
        }
        node = node.parentNode;
      }
      return null;
    };
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      const walker = document.createTreeWalker(
        editor,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (n) =>
            BLOCK.test((n as Element).tagName)
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP,
        }
      );
      let node;
      while ((node = walker.nextNode())) {
        (node as HTMLElement).style.lineHeight = value;
      }
      editor.focus();
      syncContent();
      return;
    }
    const range = sel.getRangeAt(0);
    const affected = new Set<HTMLElement>();
    const ab = getBlock(sel.anchorNode);
    if (ab) affected.add(ab);
    const fb = getBlock(sel.focusNode);
    if (fb) affected.add(fb);
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) => {
        if (!BLOCK.test((n as Element).tagName)) return NodeFilter.FILTER_SKIP;
        const nr = document.createRange();
        nr.selectNode(n);
        return range.compareBoundaryPoints(Range.END_TO_START, nr) <= 0 &&
          range.compareBoundaryPoints(Range.START_TO_END, nr) >= 0
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });
    let node;
    while ((node = walker.nextNode())) {
      affected.add(node as HTMLElement);
    }
    if (affected.size === 0) {
      editor.style.lineHeight = value;
    } else {
      affected.forEach((el) => {
        el.style.lineHeight = value;
      });
    }
    editor.focus();
    syncContent();
  };

  const applyStyle = (style: string, value: string) => {
    const editor = contentRef.current;
    if (!editor) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    document.execCommand(
      "insertHTML",
      false,
      `<span style="${style}:${value}">${selection.toString() || "text"}</span>`
    );
    syncContent();
    updateActiveFormats();
  };

  const removeFormatting = () => {
    exec("removeFormat");
    setCurrentFontSize("16");
    setCurrentLineHeight("1.6");
  };

  const insertCode = () => {
    const editor = contentRef.current;
    if (!editor) return;
    const sel = window.getSelection();
    const text = sel && sel.toString() ? sel.toString() : "code";
    document.execCommand(
      "insertHTML",
      false,
      `<code>${escapeHtml(text)}</code>`
    );
    syncContent();
  };

  const insertLink = () => {
    const editor = contentRef.current;
    if (!editor) return;
    const sel = window.getSelection();
    const text = sel && sel.toString() ? sel.toString() : "link text";
    const url = window.prompt("Enter URL:", "https://");
    if (!url) return;
    document.execCommand(
      "insertHTML",
      false,
      `<a href="${escapeHtml(url)}">${escapeHtml(text)}</a>`
    );
    syncContent();
  };

  const handleFontSizeChange = (size: string) => {
    applyStyle("font-size", `${size}px`);
    setCurrentFontSize(size);
  };

  const handleContentInput = () => syncContent();

  const toolbarButtons = [
    {
      icon: <Bold size={16} />,
      label: "Bold",
      key: "bold",
      action: () => exec("bold"),
    },
    {
      icon: <Italic size={16} />,
      label: "Italic",
      key: "italic",
      action: () => exec("italic"),
    },
    {
      icon: <Underline size={16} />,
      label: "Underline",
      key: "underline",
      action: () => exec("underline"),
    },
    {
      icon: <Strikethrough size={16} />,
      label: "Strikethrough",
      key: "strikeThrough",
      action: () => exec("strikeThrough"),
    },
    {
      icon: <Heading1 size={16} />,
      label: "Heading 1",
      key: "h1",
      action: () => toggleHeading("h1"),
    },
    {
      icon: <Heading2 size={16} />,
      label: "Heading 2",
      key: "h2",
      action: () => toggleHeading("h2"),
    },
    {
      icon: <Heading3 size={16} />,
      label: "Heading 3",
      key: "h3",
      action: () => toggleHeading("h3"),
    },
    {
      icon: <Heading4 size={16} />,
      label: "Heading 4",
      key: "h4",
      action: () => toggleHeading("h4"),
    },
    {
      icon: <AlignLeft size={16} />,
      label: "Align Left",
      key: "justifyLeft",
      action: () => exec("justifyLeft"),
    },
    {
      icon: <AlignCenter size={16} />,
      label: "Center",
      key: "justifyCenter",
      action: () => exec("justifyCenter"),
    },
    {
      icon: <AlignRight size={16} />,
      label: "Align Right",
      key: "justifyRight",
      action: () => exec("justifyRight"),
    },
    {
      icon: <List size={16} />,
      label: "Bullet List",
      key: "insertUnorderedList",
      action: () => exec("insertUnorderedList"),
    },
    {
      icon: <ListOrdered size={16} />,
      label: "Numbered List",
      key: "insertOrderedList",
      action: () => exec("insertOrderedList"),
    },
    {
      icon: <Quote size={16} />,
      label: "Quote",
      key: "blockquote",
      action: () => exec("formatBlock", "<blockquote>"),
    },
    { icon: <CodeIcon size={16} />, label: "Code", action: insertCode },
    { icon: <Link2 size={16} />, label: "Link", action: insertLink },
  ];

  const validateForm = () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      setError("Title, excerpt, and content are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");
    setApiError(null);

    try {
      const finalSlug = formData.slug || generateSlug(formData.title);

      // Check for duplicate slug
      const { data: existing } = await supabase
        .from("articles")
        .select("slug")
        .eq("slug", finalSlug)
        .maybeSingle();

      let uniqueSlug = finalSlug;
      if (existing) {
        const randomId = Math.random().toString(36).substring(2, 6);
        uniqueSlug = `${finalSlug}-${randomId}`;
      }

      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("slug", uniqueSlug);
      formPayload.append("category", formData.category);
      formPayload.append("excerpt", formData.excerpt);
      formPayload.append("content", formData.content);
      formPayload.append("meta_title", formData.metaTitle);
      formPayload.append("meta_description", formData.metaDescription);
      formPayload.append("canonical_url", formData.canonicalUrl);
      if (formData.structuredData) {
        formPayload.append("structured_data", formData.structuredData);
      }

      let imageUrl = null;
      let ogImageUrl = null;

      if (image)
        imageUrl = await uploadImage(await convertToJpeg(image), "featured");
      if (ogImage)
        ogImageUrl = await uploadImage(await convertToJpeg(ogImage), "og");

      // Insert to DB (adjust schema as needed)
      const { error: insertError } = await supabase.from("articles").insert([
        {
          title: formData.title,
          slug: uniqueSlug,
          category: formData.category,
          excerpt: formData.excerpt,
          content: formData.content,
          image_url: imageUrl,
          og_image_url: ogImageUrl,
          meta_title: formData.metaTitle,
          meta_description: formData.metaDescription,
          canonical_url: formData.canonicalUrl,
          structured_data: formData.structuredData
            ? JSON.parse(formData.structuredData)
            : null,
        },
      ]);

      if (insertError) throw insertError;

      setModalType("success");
      setShowModal(true);
      setSuccess("Article published successfully!");
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Failed to create article");
      setModalType("error");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalType === "success") {
      router.push("/admin/dashboard");
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F1F4F9] py-12 px-4 md:px-8 font-['Rethink_Sans']">
        <style>{`
        .rich-content-editor:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
        }
        .rich-content-editor h1 { font-size: 1.75rem; font-weight: 700; margin: 0.6em 0; }
        .rich-content-editor h2 { font-size: 1.4rem; font-weight: 700; margin: 0.6em 0; }
        .rich-content-editor h3 { font-size: 1.15rem; font-weight: 700; margin: 0.5em 0; }
        .rich-content-editor h4 { font-size: 1rem; font-weight: 700; margin: 0.5em 0; }
        .rich-content-editor blockquote {
          border-left: 3px solid #067F76;
          padding-left: 1em;
          color: #475569;
          margin: 0.6em 0;
        }
        .rich-content-editor code {
          background: #e2e8f0;
          padding: 0.15em 0.4em;
          border-radius: 0.3em;
          font-family: ui-monospace, monospace;
          font-size: 0.9em;
        }
        .rich-content-editor ul, .rich-content-editor ol {
          padding-left: 1.8em !important;
          margin: 0.5em 0 !important;
        }
        .rich-content-editor a { color: #067F76; text-decoration: underline; }
      `}</style>

        <div className="max-w-4xl mx-auto mt-[120px]">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-[#023B37] font-semibold mb-6 hover:underline"
          >
            <ArrowLeft size={18} /> Back to Dashboard
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
                <h1 className="text-2xl font-bold text-slate-900">
                  Create New Article
                </h1>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Article Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Understanding ADHD in Adults"
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleSlugChange}
                    placeholder="your-article-title"
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
                    />
                  </div>

                  {/* Featured Image */}
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
                          ? "Change Image"
                          : "Upload Featured Image"}
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
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Excerpt (Summary) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="excerpt"
                    required
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    placeholder="A short preview..."
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
                  />
                </div>

                {/* Rich Editor */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Content <span className="text-red-500">*</span>
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

            {/* SEO Section - Blended styles */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
                <Search size={20} /> SEO & Metadata
              </h2>
              <div className="space-y-5">
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleMetaTitleChange}
                  placeholder="Meta Title (auto-generated from title)"
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
                />
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleMetaDescChange}
                  rows={2}
                  placeholder="Meta Description (auto from excerpt)"
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
                />
                <input
                  type="url"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      canonicalUrl: e.target.value,
                    }))
                  }
                  placeholder="Canonical URL (auto-generated)"
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
                />
              </div>
            </div>

            {/* OG Image and Structured Data */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
              {/* OG Image */}
              <div>
                <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5 mb-2">
                  <Globe size={16} /> Open Graph Social Cover Image
                </label>
                <div
                  onClick={() => ogInputRef.current?.click()}
                  className="border border-dashed border-slate-300 rounded-2xl p-6 text-center cursor-pointer hover:border-[#067F76]"
                >
                  <input
                    ref={ogInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, true)}
                    className="hidden"
                  />
                  {ogPreview ? (
                    <div className="relative h-48 rounded-xl overflow-hidden">
                      <img
                        src={ogPreview}
                        alt="OG"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => ogInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <p className="text-slate-500">
                      Upload OG Image (1200x630 recommended)
                    </p>
                  )}
                </div>
              </div>

              {/* Structured Data */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <Edit3 size={20} /> Structured Data (Schema.org)
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
                  onChange={handleStructuredDataChange}
                  className="w-full h-80 font-mono text-sm p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 outline-none resize-y"
                  spellCheck={false}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#023B37] hover:bg-[#067F76] text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <Save size={22} /> Publish Article
                </>
              )}
            </button>
          </motion.form>
        </div>

        {/* Modal */}
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
                      Article Published!
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Your article is now live.
                    </p>
                    <button
                      onClick={handleModalClose}
                      className="w-full py-3 bg-[#067F76] text-white rounded-2xl font-semibold"
                    >
                      Go to Dashboard
                    </button>
                  </>
                ) : (
                  <>
                    <XCircle className="mx-auto h-16 w-16 text-red-600 mb-6" />
                    <h3 className="text-2xl font-bold text-red-600 mb-2">
                      Error
                    </h3>
                    <p className="text-gray-600 mb-8">{apiError}</p>
                    <button
                      onClick={handleModalClose}
                      className="w-full py-3 bg-slate-800 text-white rounded-2xl font-semibold"
                    >
                      Try Again
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}
