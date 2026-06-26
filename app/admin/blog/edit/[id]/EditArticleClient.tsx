// "use client";
// export const dynamic = "force-dynamic";

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Loader2,
//   ArrowLeft,
//   Save,
//   Image as ImageIcon,
//   Bold,
//   Italic,
//   Underline,
//   Strikethrough,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   Heading1,
//   Heading2,
//   Heading3,
//   Heading4,
//   List,
//   ListOrdered,
//   Link2,
//   Quote,
//   Code as CodeIcon,
//   Undo,
//   Redo,
//   Trash2,
//   Palette,
//   Highlighter,
//   Edit3,
// } from "lucide-react";
// import Link from "next/link";
// import { createClient } from "@/lib/supabase/client";

// export default function EditArticleClient({
//   article,
//   id,
// }: {
//   article: any;
//   id: string;
// }) {
//   const router = useRouter();
//   const supabase = createClient();

//   const [formData, setFormData] = useState({
//     title: article.title || "",
//     slug: article.slug || "",
//     category: article.category || "General",
//     excerpt: article.excerpt || "",
//     content: article.content || "",
//     metaTitle: article.meta_title || "",
//     metaDescription: article.meta_description || "",
//     canonicalUrl: article.canonical_url || "",
//     structuredData: article.structured_data
//       ? JSON.stringify(article.structured_data, null, 2)
//       : "",
//   });

//   const [image, setImage] = useState<File | null>(null);
//   const [ogImage, setOgImage] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [imagePreview, setImagePreview] = useState<string | null>(
//     article.image_url || null
//   );
//   const [ogPreview, setOgPreview] = useState<string | null>(
//     article.og_image_url || null
//   );
//   const [currentImageUrl] = useState(article.image_url || "");
//   const [currentOgImageUrl] = useState(article.og_image_url || "");

//   const [isSlugCustomized, setIsSlugCustomized] = useState(false);
//   const [isMetaTitleCustomized, setIsMetaTitleCustomized] = useState(false);
//   const [isMetaDescCustomized, setIsMetaDescCustomized] = useState(false);
//   const [isStructuredDataCustomized, setIsStructuredDataCustomized] =
//     useState(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const structuredDataRef = useRef<HTMLTextAreaElement>(null);

//   const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
//   const [currentFontSize, setCurrentFontSize] = useState("16");
//   const [currentLineHeight, setCurrentLineHeight] = useState("1.6");

//   const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48];
//   const lineHeights = [
//     { label: "1.0", value: "1.0" },
//     { label: "1.2", value: "1.2" },
//     { label: "1.4", value: "1.4" },
//     { label: "1.6", value: "1.6" },
//     { label: "1.8", value: "1.8" },
//     { label: "2.0", value: "2.0" },
//     { label: "2.5", value: "2.5" },
//     { label: "3.0", value: "3.0" },
//   ];

//   const generateSlug = (text: string): string => {
//     return text
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-");
//   };

//   // ==================== STRUCTURED DATA AUTO-GENERATION ====================
//   const generateStructuredData = (data: typeof formData): string => {
//     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
//     const articleUrl =
//       data.canonicalUrl ||
//       `${process.env.NEXT_PUBLIC_SITE_URL}/blog/view/${data.slug || generateSlug(data.title)}`;

//     const structured = {
//       "@context": "https://schema.org",
//       "@type": "NewsArticle",
//       url: articleUrl,
//       headline: data.title || "Untitled Article",
//       description: data.excerpt || data.metaDescription || "",
//       datePublished: new Date().toISOString(),
//       dateModified: new Date().toISOString(),
//       author: {
//         "@type": "Organization",
//         name: "ARIAD Psychological Services",
//       },
//       publisher: {
//         "@type": "Organization",
//         name: "ARIAD Psychological Services",
//         logo: {
//           "@type": "ImageObject",
//           url: "https://ariadpsychservices.com/logo.png",
//         },
//       },
//       mainEntityOfPage: {
//         "@type": "WebPage",
//         "@id": articleUrl,
//       },
//     };

//     return JSON.stringify(structured, null, 2);
//   };

//   // Auto-update structured data when fields change (if not manually customized)
//   useEffect(() => {
//     if (!isStructuredDataCustomized && (formData.title || formData.excerpt)) {
//       const newStructured = generateStructuredData(formData);
//       setFormData((prev) => ({ ...prev, structuredData: newStructured }));
//     }
//   }, [
//     formData.title,
//     formData.excerpt,
//     formData.slug,
//     formData.canonicalUrl,
//     isStructuredDataCustomized,
//   ]);

//   const handleStructuredDataChange = (
//     e: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setIsStructuredDataCustomized(true);
//     setFormData((prev) => ({ ...prev, structuredData: e.target.value }));
//   };

//   const resetToAutoStructured = () => {
//     setIsStructuredDataCustomized(false);
//     const autoData = generateStructuredData(formData);
//     setFormData((prev) => ({ ...prev, structuredData: autoData }));
//   };

//   useEffect(() => {
//     if (!loading && contentRef.current) {
//       contentRef.current.innerHTML = formData.content || "";
//     }
//   }, [loading, formData.content]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === "title" && !isSlugCustomized) {
//       const newSlug = generateSlug(value);
//       setFormData((prev) => ({
//         ...prev,
//         slug: newSlug,
//         metaTitle: isMetaTitleCustomized
//           ? prev.metaTitle
//           : `${value} | ARIAD Psychological Services`,
//         canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/view${newSlug}`,
//       }));
//     }

//     if (name === "excerpt" && !isMetaDescCustomized) {
//       const truncated =
//         value.length > 155 ? value.slice(0, 152) + "..." : value;
//       setFormData((prev) => ({ ...prev, metaDescription: truncated }));
//     }
//   };

//   const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setIsSlugCustomized(true);
//     setFormData((prev) => ({ ...prev, slug: e.target.value }));
//   };

//   const handleMetaTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setIsMetaTitleCustomized(true);
//     setFormData((prev) => ({ ...prev, metaTitle: e.target.value }));
//   };

//   const handleMetaDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setIsMetaDescCustomized(true);
//     setFormData((prev) => ({ ...prev, metaDescription: e.target.value }));
//   };

//   const handleImageChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     isOg: boolean
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const previewUrl = URL.createObjectURL(file);
//     if (isOg) {
//       setOgImage(file);
//       setOgPreview(previewUrl);
//     } else {
//       setImage(file);
//       setImagePreview(previewUrl);
//     }
//   };

//   const uploadImage = async (
//     file: File,
//     folder: string
//   ): Promise<string | null> => {
//     const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
//     const { error: uploadError } = await supabase.storage
//       .from("blog-images")
//       .upload(`${folder}/${fileName}`, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });
//     if (uploadError) throw uploadError;
//     const { data } = supabase.storage
//       .from("blog-images")
//       .getPublicUrl(`${folder}/${fileName}`);
//     return data.publicUrl;
//   };

//   // ---------- RICH TEXT EDITOR LOGIC ----------

//   const escapeHtml = (str: string) =>
//     str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

//   const syncContent = () => {
//     if (contentRef.current) {
//       setFormData((prev) => ({
//         ...prev,
//         content: contentRef.current!.innerHTML,
//       }));
//     }
//   };

//   const updateActiveFormats = () => {
//     const editor = contentRef.current;
//     if (!editor) return;

//     const selection = document.getSelection();
//     if (!selection || selection.rangeCount === 0 || !selection.anchorNode) {
//       setActiveFormats(new Set());
//       return;
//     }
//     if (!editor.contains(selection.anchorNode)) {
//       setActiveFormats(new Set());
//       return;
//     }

//     const next = new Set<string>();
//     const toggleCommands = [
//       "bold",
//       "italic",
//       "underline",
//       "strikeThrough",
//       "justifyLeft",
//       "justifyCenter",
//       "justifyRight",
//       "insertUnorderedList",
//       "insertOrderedList",
//     ];

//     toggleCommands.forEach((cmd) => {
//       try {
//         if (document.queryCommandState(cmd)) next.add(cmd);
//       } catch {}
//     });

//     try {
//       const block = document.queryCommandValue("formatBlock").toLowerCase();
//       if (["h1", "h2", "h3", "h4", "blockquote"].includes(block)) {
//         next.add(block);
//       }
//     } catch {}

//     let detectedLineHeight = "1.6";
//     const anchorBlock = getBlockElement(selection.anchorNode, editor);
//     if (anchorBlock) {
//       const computed = window.getComputedStyle(anchorBlock).lineHeight;
//       if (computed === "normal") detectedLineHeight = "1.6";
//       else if (computed.endsWith("px")) {
//         const px = parseFloat(computed);
//         detectedLineHeight = (px / 16).toFixed(1);
//       } else {
//         detectedLineHeight = parseFloat(computed).toFixed(1);
//       }
//     }
//     setCurrentLineHeight(detectedLineHeight);

//     setActiveFormats(next);
//   };

//   const getBlockElement = (
//     node: Node | null,
//     editor: HTMLElement
//   ): HTMLElement | null => {
//     const BLOCK = /^(P|H[1-6]|BLOCKQUOTE|DIV|LI|UL|OL)$/;
//     while (node && node !== editor) {
//       if (
//         node.nodeType === Node.ELEMENT_NODE &&
//         BLOCK.test((node as Element).tagName)
//       ) {
//         return node as HTMLElement;
//       }
//       node = node.parentNode;
//     }
//     return null;
//   };

//   const exec = (command: string, value?: string) => {
//     const editor = contentRef.current;
//     if (!editor) return;
//     document.execCommand(command, false, value);
//     editor.focus();
//     syncContent();
//     updateActiveFormats();
//   };

//   const toggleHeading = (tag: "h1" | "h2" | "h3" | "h4") => {
//     const editor = contentRef.current;
//     if (!editor) return;

//     const sel = window.getSelection();
//     if (!sel || sel.rangeCount === 0) return;

//     let node: Node | null = sel.anchorNode;
//     let blockEl: HTMLElement | null = null;
//     while (node && node !== editor) {
//       if (
//         node.nodeType === Node.ELEMENT_NODE &&
//         /^(P|H[1-6]|BLOCKQUOTE|DIV|LI)$/.test((node as Element).tagName)
//       ) {
//         blockEl = node as HTMLElement;
//         break;
//       }
//       node = node.parentNode;
//     }

//     if (!blockEl) {
//       document.execCommand("formatBlock", false, `<${tag}>`);
//       editor.focus();
//       syncContent();
//       updateActiveFormats();
//       return;
//     }

//     const currentTag = blockEl.tagName.toLowerCase();

//     if (currentTag === tag) {
//       const p = document.createElement("p");
//       p.innerHTML = blockEl.innerHTML;
//       blockEl.replaceWith(p);
//       const range = document.createRange();
//       range.selectNodeContents(p);
//       range.collapse(false);
//       sel.removeAllRanges();
//       sel.addRange(range);
//     } else {
//       const newEl = document.createElement(tag);
//       newEl.innerHTML = blockEl.innerHTML;
//       blockEl.replaceWith(newEl);
//       const range = document.createRange();
//       range.selectNodeContents(newEl);
//       range.collapse(false);
//       sel.removeAllRanges();
//       sel.addRange(range);
//     }

//     editor.focus();
//     syncContent();
//     updateActiveFormats();
//   };

//   const applyLineHeight = (value: string) => {
//     const editor = contentRef.current;
//     if (!editor) return;

//     setCurrentLineHeight(value);

//     const sel = window.getSelection();
//     const BLOCK = /^(P|H[1-6]|BLOCKQUOTE|DIV|LI|UL|OL)$/;

//     const getBlock = (node: Node | null): HTMLElement | null => {
//       while (node && node !== editor) {
//         if (
//           node.nodeType === Node.ELEMENT_NODE &&
//           BLOCK.test((node as Element).tagName)
//         ) {
//           return node as HTMLElement;
//         }
//         node = node.parentNode;
//       }
//       return null;
//     };

//     if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
//       const walker = document.createTreeWalker(
//         editor,
//         NodeFilter.SHOW_ELEMENT,
//         {
//           acceptNode: (n) =>
//             BLOCK.test((n as Element).tagName)
//               ? NodeFilter.FILTER_ACCEPT
//               : NodeFilter.FILTER_SKIP,
//         }
//       );
//       let node;
//       while ((node = walker.nextNode())) {
//         (node as HTMLElement).style.lineHeight = value;
//       }
//       if (!editor.hasChildNodes()) editor.style.lineHeight = value;
//       editor.focus();
//       syncContent();
//       return;
//     }

//     const range = sel.getRangeAt(0);
//     const affected = new Set<HTMLElement>();

//     const ab = getBlock(sel.anchorNode);
//     if (ab) affected.add(ab);
//     const fb = getBlock(sel.focusNode);
//     if (fb) affected.add(fb);

//     const walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
//       acceptNode: (n) => {
//         if (!BLOCK.test((n as Element).tagName)) return NodeFilter.FILTER_SKIP;
//         const nr = document.createRange();
//         nr.selectNode(n);
//         return range.compareBoundaryPoints(Range.END_TO_START, nr) <= 0 &&
//           range.compareBoundaryPoints(Range.START_TO_END, nr) >= 0
//           ? NodeFilter.FILTER_ACCEPT
//           : NodeFilter.FILTER_SKIP;
//       },
//     });

//     let node;
//     while ((node = walker.nextNode())) {
//       affected.add(node as HTMLElement);
//     }

//     if (affected.size === 0) {
//       editor.style.lineHeight = value;
//     } else {
//       affected.forEach((el) => {
//         el.style.lineHeight = value;
//       });
//     }

//     editor.focus();
//     syncContent();
//   };

//   const applyStyle = (
//     style: string,
//     value: string,
//     currentValue: string,
//     setCurrent: (v: string) => void
//   ) => {
//     const editor = contentRef.current;
//     if (!editor) return;
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0) return;

//     if (currentValue === value) {
//       document.execCommand("removeFormat", false, style);
//       setCurrent(style === "font-size" ? "16" : "");
//     } else {
//       document.execCommand(
//         "insertHTML",
//         false,
//         `<span style="${style}:${value}">${
//           selection.toString() || "text"
//         }</span>`
//       );
//       setCurrent(value);
//     }

//     syncContent();
//     updateActiveFormats();
//   };

//   const removeFormatting = () => {
//     exec("removeFormat");
//     setCurrentFontSize("16");
//     setCurrentLineHeight("1.6");
//   };

//   const insertCode = () => {
//     const editor = contentRef.current;
//     if (!editor) return;
//     const sel = window.getSelection();
//     const text = sel && sel.toString() ? sel.toString() : "code";
//     document.execCommand(
//       "insertHTML",
//       false,
//       `<code>${escapeHtml(text)}</code>`
//     );
//     syncContent();
//   };

//   const insertLink = () => {
//     const editor = contentRef.current;
//     if (!editor) return;
//     const sel = window.getSelection();
//     const text = sel && sel.toString() ? sel.toString() : "link text";
//     const url = window.prompt("Enter URL:", "https://");
//     if (!url) return;
//     document.execCommand(
//       "insertHTML",
//       false,
//       `<a href="${escapeHtml(url)}">${escapeHtml(text)}</a>`
//     );
//     syncContent();
//   };

//   const handleFontSizeChange = (size: string) => {
//     applyStyle("font-size", `${size}px`, currentFontSize, setCurrentFontSize);
//   };

//   const handleContentInput = () => {
//     syncContent();
//   };

//   const toolbarButtons: {
//     icon: React.ReactNode;
//     label: string;
//     key?: string;
//     action: () => void;
//   }[] = [
//     {
//       icon: <Bold size={16} />,
//       label: "Bold",
//       key: "bold",
//       action: () => exec("bold"),
//     },
//     {
//       icon: <Italic size={16} />,
//       label: "Italic",
//       key: "italic",
//       action: () => exec("italic"),
//     },
//     {
//       icon: <Underline size={16} />,
//       label: "Underline",
//       key: "underline",
//       action: () => exec("underline"),
//     },
//     {
//       icon: <Strikethrough size={16} />,
//       label: "Strikethrough",
//       key: "strikeThrough",
//       action: () => exec("strikeThrough"),
//     },
//     {
//       icon: <Heading1 size={16} />,
//       label: "Heading 1",
//       key: "h1",
//       action: () => toggleHeading("h1"),
//     },
//     {
//       icon: <Heading2 size={16} />,
//       label: "Heading 2",
//       key: "h2",
//       action: () => toggleHeading("h2"),
//     },
//     {
//       icon: <Heading3 size={16} />,
//       label: "Heading 3",
//       key: "h3",
//       action: () => toggleHeading("h3"),
//     },
//     {
//       icon: <Heading4 size={16} />,
//       label: "Heading 4",
//       key: "h4",
//       action: () => toggleHeading("h4"),
//     },
//     {
//       icon: <AlignLeft size={16} />,
//       label: "Align Left",
//       key: "justifyLeft",
//       action: () => exec("justifyLeft"),
//     },
//     {
//       icon: <AlignCenter size={16} />,
//       label: "Center",
//       key: "justifyCenter",
//       action: () => exec("justifyCenter"),
//     },
//     {
//       icon: <AlignRight size={16} />,
//       label: "Align Right",
//       key: "justifyRight",
//       action: () => exec("justifyRight"),
//     },
//     {
//       icon: <List size={16} />,
//       label: "Bullet List",
//       key: "insertUnorderedList",
//       action: () => exec("insertUnorderedList"),
//     },
//     {
//       icon: <ListOrdered size={16} />,
//       label: "Numbered List",
//       key: "insertOrderedList",
//       action: () => exec("insertOrderedList"),
//     },
//     {
//       icon: <Quote size={16} />,
//       label: "Quote",
//       key: "blockquote",
//       action: () => exec("formatBlock", "<blockquote>"),
//     },
//     { icon: <CodeIcon size={16} />, label: "Code", action: insertCode },
//     { icon: <Link2 size={16} />, label: "Link", action: insertLink },
//   ];

//   // ---------- END RICH TEXT EDITOR LOGIC ----------

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.title || !formData.excerpt || !formData.content) {
//       setError("Title, excerpt, and content are required");
//       return;
//     }

//     setSubmitting(true);
//     setError("");

//     try {
//       let imageUrl = image
//         ? await uploadImage(image, "articles")
//         : currentImageUrl;
//       let ogImageUrl = ogImage
//         ? await uploadImage(ogImage, "og")
//         : currentOgImageUrl;

//       const articleData = {
//         title: formData.title,
//         slug: formData.slug || generateSlug(formData.title),
//         category: formData.category,
//         excerpt: formData.excerpt,
//         content: formData.content,
//         image_url: imageUrl,
//         og_image_url: ogImageUrl || imageUrl,
//         meta_title:
//           formData.metaTitle ||
//           `${formData.title} | ARIAD Psychological Services`,
//         meta_description:
//           formData.metaDescription || formData.excerpt.slice(0, 155),
//         canonical_url:
//           formData.canonicalUrl ||
//           `${process.env.NEXT_PUBLIC_SITE_URL}/blog/view/${formData.slug}`,
//         structured_data: formData.structuredData
//           ? JSON.parse(formData.structuredData)
//           : null,
//         updated_at: new Date().toISOString(),
//       };

//       const res = await fetch(`/api/articles?id=${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(articleData),
//       });

//       const result = await res.json();

//       if (!res.ok) throw new Error(result.error || "Failed to update article");

//       setSuccess("Article updated successfully!");
//       setTimeout(() => {
//         router.push("/admin/dashboard");
//         router.refresh();
//       }, 1200);
//     } catch (err: any) {
//       setError(err.message || "Failed to update article");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#F1F4F9] flex items-center justify-center">
//         <Loader2 className="animate-spin text-[#067F76]" size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F1F4F9] py-12 px-4 md:px-8">
//       <style>{`
//         .rich-content-editor:empty:before {
//           content: attr(data-placeholder);
//           color: #94a3b8;
//         }
//         .rich-content-editor h1 { font-size: 1.75rem; font-weight: 700; margin: 0.6em 0; }
//         .rich-content-editor h2 { font-size: 1.4rem; font-weight: 700; margin: 0.6em 0; }
//         .rich-content-editor h3 { font-size: 1.15rem; font-weight: 700; margin: 0.5em 0; }
//         .rich-content-editor h4 { font-size: 1rem; font-weight: 700; margin: 0.5em 0; }
//         .rich-content-editor blockquote {
//           border-left: 3px solid #067F76;
//           padding-left: 1em;
//           color: #475569;
//           margin: 0.6em 0;
//         }
//         .rich-content-editor code {
//           background: #e2e8f0;
//           padding: 0.15em 0.4em;
//           border-radius: 0.3em;
//           font-size: 0.9em;
//         }
//         .rich-content-editor ul, .rich-content-editor ol {
//           padding-left: 1.8em !important;
//           margin: 0.5em 0 !important;
//         }
//         .rich-content-editor a { color: #067F76; text-decoration: underline; }
//       `}</style>

//       <div className="max-w-4xl mx-auto">
//         <Link
//           href="/admin/dashboard"
//           className="inline-flex items-center gap-2 text-[#023B37] font-semibold mb-6 hover:underline"
//         >
//           <ArrowLeft size={18} /> Back to Dashboard
//         </Link>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-3 bg-[#067F76]/10 text-[#067F76] rounded-2xl">
//                 <Save />
//               </div>
//               <h1 className="text-2xl font-bold text-slate-900">
//                 Edit Article
//               </h1>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
//                   Article Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   required
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
//                   URL Slug <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="slug"
//                   value={formData.slug}
//                   onChange={handleSlugChange}
//                   className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-[#067F76]"
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
//                     Featured Image
//                   </label>
//                   <div
//                     onClick={() => fileInputRef.current?.click()}
//                     className="cursor-pointer flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#067F76]"
//                   >
//                     <ImageIcon className="text-slate-400" size={24} />
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleImageChange(e, false)}
//                       className="hidden"
//                     />
//                     <span className="text-sm text-slate-600">
//                       {imagePreview ? "Change Image" : "Upload New Image"}
//                     </span>
//                   </div>
//                   {imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="preview"
//                       className="mt-3 rounded-xl max-h-48 object-cover w-full"
//                     />
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
//                   Excerpt <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   name="excerpt"
//                   required
//                   value={formData.excerpt}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
//                   Content <span className="text-red-500">*</span>
//                 </label>

//                 <div className="sticky top-0 z-20 flex flex-wrap items-center gap-2 p-3 mb-3 bg-slate-100 rounded-xl border border-slate-200 shadow-sm">
//                   <div className="flex gap-1 pr-3 border-r border-slate-300">
//                     <button
//                       type="button"
//                       onClick={() => exec("undo")}
//                       className="p-2 hover:bg-white rounded-lg"
//                       title="Undo"
//                     >
//                       <Undo size={18} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => exec("redo")}
//                       className="p-2 hover:bg-white rounded-lg"
//                       title="Redo"
//                     >
//                       <Redo size={18} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={removeFormatting}
//                       className="p-2 hover:bg-white rounded-lg"
//                       title="Clear Formatting"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>

//                   <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
//                     <select
//                       value={currentFontSize}
//                       onChange={(e) => handleFontSizeChange(e.target.value)}
//                       className="bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#067F76]"
//                     >
//                       {fontSizes.map((size) => (
//                         <option key={size} value={size}>
//                           {size}px
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
//                     <select
//                       value={currentLineHeight}
//                       onChange={(e) => applyLineHeight(e.target.value)}
//                       className="bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#067F76]"
//                       title="Line Height"
//                     >
//                       {lineHeights.map((lh) => (
//                         <option key={lh.value} value={lh.value}>
//                           ↕ {lh.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="flex gap-1 pr-3 border-r border-slate-300">
//                     <label
//                       className="cursor-pointer p-2 hover:bg-white rounded-lg"
//                       title="Text Color"
//                     >
//                       <Palette size={18} />
//                       <input
//                         type="color"
//                         onChange={(e) =>
//                           applyStyle("color", e.target.value, "", () => {})
//                         }
//                         className="hidden"
//                       />
//                     </label>
//                     <label
//                       className="cursor-pointer p-2 hover:bg-white rounded-lg"
//                       title="Highlight Color"
//                     >
//                       <Highlighter size={18} />
//                       <input
//                         type="color"
//                         onChange={(e) =>
//                           applyStyle(
//                             "background-color",
//                             e.target.value,
//                             "",
//                             () => {}
//                           )
//                         }
//                         className="hidden"
//                       />
//                     </label>
//                   </div>

//                   <div className="flex flex-wrap gap-1">
//                     {toolbarButtons.map((btn) => {
//                       const isActive = btn.key
//                         ? activeFormats.has(btn.key)
//                         : false;
//                       return (
//                         <button
//                           key={btn.label}
//                           type="button"
//                           title={btn.label}
//                           onMouseDown={(e) => e.preventDefault()}
//                           onClick={btn.action}
//                           className={`p-2 rounded-lg transition-colors ${
//                             isActive
//                               ? "bg-[#067F76] text-white shadow-sm"
//                               : "text-slate-600 hover:bg-white hover:text-[#067F76] hover:shadow-sm"
//                           }`}
//                         >
//                           {btn.icon}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div
//                   ref={contentRef}
//                   contentEditable
//                   suppressContentEditableWarning
//                   onInput={handleContentInput}
//                   onKeyUp={updateActiveFormats}
//                   onMouseUp={updateActiveFormats}
//                   onClick={updateActiveFormats}
//                   data-placeholder="Write your article here..."
//                   className="rich-content-editor w-full min-h-[400px] p-6 bg-white rounded-2xl border border-slate-200 outline-none focus:border-[#067F76] text-base leading-relaxed"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* SEO Section */}
//           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
//             <h2 className="text-lg font-bold text-slate-900 mb-6">
//               SEO & Metadata
//             </h2>
//             <div className="space-y-5">
//               <input
//                 type="text"
//                 name="metaTitle"
//                 value={formData.metaTitle}
//                 onChange={handleMetaTitleChange}
//                 placeholder="Meta Title"
//                 className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
//               />
//               <textarea
//                 name="metaDescription"
//                 value={formData.metaDescription}
//                 onChange={handleMetaDescChange}
//                 rows={2}
//                 placeholder="Meta Description"
//                 className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
//               />
//               <input
//                 type="url"
//                 name="canonicalUrl"
//                 value={formData.canonicalUrl}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     canonicalUrl: e.target.value,
//                   }))
//                 }
//                 placeholder="Canonical URL"
//                 className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none"
//               />
//             </div>
//           </div>

//           {/* Structured Data Section */}
//           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
//                 <Edit3 size={20} />
//                 Structured Data (Schema.org)
//               </h2>
//               <button
//                 type="button"
//                 onClick={resetToAutoStructured}
//                 className="text-sm text-[#067F76] hover:underline flex items-center gap-1"
//               >
//                 Reset to Auto-generated
//               </button>
//             </div>

//             <p className="text-sm text-slate-600 mb-4">
//               Auto-generated based on title & excerpt. You can edit it manually
//               below.
//             </p>

//             <textarea
//               ref={structuredDataRef}
//               value={formData.structuredData}
//               onChange={handleStructuredDataChange}
//               className="w-full h-80 font-mono text-sm p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 outline-none focus:border-[#067F76] resize-y"
//               spellCheck={false}
//             />

//             {formData.structuredData && (
//               <div className="mt-3 text-xs text-emerald-600 font-medium">
//                 ✓ Valid JSON • Ready for Google Rich Results
//               </div>
//             )}
//           </div>

//           {error && (
//             <p className="text-red-600 text-center font-medium">{error}</p>
//           )}
//           {success && (
//             <p className="text-green-600 text-center font-medium">{success}</p>
//           )}

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full bg-[#023B37] hover:bg-[#067F76] text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70"
//           >
//             {submitting ? (
//               <Loader2 className="animate-spin" size={24} />
//             ) : (
//               <>
//                 <Save size={22} /> Update Article
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
