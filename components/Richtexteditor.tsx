"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
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
} from "lucide-react";

interface RichTextEditorProps {
  /** Current HTML content */
  value: string;
  /** Called with the new HTML whenever the content changes */
  onChange: (html: string) => void;
  placeholder?: string;
  /**
   * Pixels the toolbar should sit below the top of the viewport when stuck.
   * Set this to the height of your site's fixed nav bar (e.g. 96 if your
   * header is 96px tall) so the toolbar parks just under it instead of
   * disappearing behind it.
   */
  stickyTopOffset?: number;
  className?: string;
  minHeight?: number;
}

const BLOCK_TAGS = /^(P|H[1-6]|BLOCKQUOTE|DIV|LI|UL|OL)$/;

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  stickyTopOffset = 96,
  className = "",
  minHeight = 450,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const didInit = useRef(false);

  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [fontSize, setFontSize] = useState("16");
  const [lineHeight, setLineHeight] = useState("1.6");

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48];
  const lineHeights = ["1.0", "1.2", "1.4", "1.6", "1.8", "2.0", "2.5", "3.0"];

  // Initialize content once, and use CSS-based execCommand output
  // (span style="color:..." instead of legacy <font>/<strike> tags).
  // This is what makes color/highlight reliably "stick".
  useEffect(() => {
    try {
      document.execCommand("styleWithCSS", false, "true" as any);
    } catch {}
    if (editorRef.current && !didInit.current) {
      editorRef.current.innerHTML = value || "";
      didInit.current = true;
    }
  }, [value]);

  const escapeHtml = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const syncContent = useCallback(() => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const getBlockElement = (
    node: Node | null,
    editor: HTMLElement
  ): HTMLElement | null => {
    while (node && node !== editor) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        BLOCK_TAGS.test((node as Element).tagName)
      ) {
        return node as HTMLElement;
      }
      node = node.parentNode;
    }
    return null;
  };

  const updateActiveFormats = useCallback(() => {
    const editor = editorRef.current;
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
    [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "insertUnorderedList",
      "insertOrderedList",
    ].forEach((cmd) => {
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

    let detectedLH = "1.6";
    const anchorBlock = getBlockElement(selection.anchorNode, editor);
    if (anchorBlock) {
      const computed = window.getComputedStyle(anchorBlock).lineHeight;
      if (computed === "normal") detectedLH = "1.6";
      else if (computed.endsWith("px")) {
        detectedLH = (parseFloat(computed) / 16).toFixed(1);
      } else {
        detectedLH = parseFloat(computed).toFixed(1);
      }
    }
    setLineHeight(detectedLH);
    setActiveFormats(next);
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () =>
      document.removeEventListener("selectionchange", updateActiveFormats);
  }, [updateActiveFormats]);

  const exec = (command: string, val?: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, val);
    syncContent();
    updateActiveFormats();
  };

  const toggleHeading = (tag: "h1" | "h2" | "h3" | "h4") => {
    const editor = editorRef.current;
    if (!editor) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const blockEl = getBlockElement(sel.anchorNode, editor);
    if (!blockEl) {
      document.execCommand("formatBlock", false, `<${tag}>`);
      editor.focus();
      syncContent();
      updateActiveFormats();
      return;
    }

    const currentTag = blockEl.tagName.toLowerCase();
    const newEl = document.createElement(currentTag === tag ? "p" : tag);
    newEl.innerHTML = blockEl.innerHTML;
    blockEl.replaceWith(newEl);

    const range = document.createRange();
    range.selectNodeContents(newEl);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);

    editor.focus();
    syncContent();
    updateActiveFormats();
  };

  const applyLineHeight = (val: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    setLineHeight(val);
    editor.focus();
    const sel = window.getSelection();

    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      editor
        .querySelectorAll<HTMLElement>(
          "p,h1,h2,h3,h4,h5,h6,blockquote,div,li,ul,ol"
        )
        .forEach((el) => (el.style.lineHeight = val));
      syncContent();
      return;
    }

    const range = sel.getRangeAt(0);
    const affected = new Set<HTMLElement>();
    const ab = getBlockElement(sel.anchorNode, editor);
    if (ab) affected.add(ab);
    const fb = getBlockElement(sel.focusNode, editor);
    if (fb) affected.add(fb);

    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) => {
        if (!BLOCK_TAGS.test((n as Element).tagName))
          return NodeFilter.FILTER_SKIP;
        const nr = document.createRange();
        nr.selectNode(n);
        return range.compareBoundaryPoints(Range.END_TO_START, nr) <= 0 &&
          range.compareBoundaryPoints(Range.START_TO_END, nr) >= 0
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });
    let node;
    while ((node = walker.nextNode())) affected.add(node as HTMLElement);

    if (affected.size === 0) editor.style.lineHeight = val;
    else affected.forEach((el) => (el.style.lineHeight = val));

    syncContent();
  };

  // ---- FIXED: text color, highlight, and font size ----
  // These now use native execCommand instead of rebuilding the
  // selection from plain text, so they no longer wipe out any
  // bold/italic/links already inside the selected text.

  const applyTextColor = (color: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand("foreColor", false, color);
    syncContent();
  };

  const applyHighlight = (color: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    let ok = false;
    try {
      ok = document.execCommand("hiliteColor", false, color);
    } catch {
      ok = false;
    }
    if (!ok) {
      try {
        document.execCommand("backColor", false, color);
      } catch {}
    }
    syncContent();
  };

  const applyFontSize = (px: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    setFontSize(px);
    editor.focus();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;

    // Use size "7" as a marker (largest legacy size, unlikely to collide),
    // then swap the resulting <font size="7"> for a span with the real px size.
    document.execCommand("fontSize", false, "7");
    editor.querySelectorAll('font[size="7"]').forEach((el) => {
      const span = document.createElement("span");
      span.style.fontSize = `${px}px`;
      span.innerHTML = el.innerHTML;
      el.replaceWith(span);
    });
    syncContent();
    updateActiveFormats();
  };

  const removeFormatting = () => {
    exec("removeFormat");
    setFontSize("16");
    setLineHeight("1.6");
  };

  const insertCode = () => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    const sel = window.getSelection();
    const text = sel && sel.toString() ? sel.toString() : "code";
    document.execCommand("insertHTML", false, `<code>${escapeHtml(text)}</code>`);
    syncContent();
  };

  const insertLink = () => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
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

  const toolbarButtons = [
    { icon: <Bold size={16} />, label: "Bold", key: "bold", action: () => exec("bold") },
    { icon: <Italic size={16} />, label: "Italic", key: "italic", action: () => exec("italic") },
    { icon: <Underline size={16} />, label: "Underline", key: "underline", action: () => exec("underline") },
    { icon: <Strikethrough size={16} />, label: "Strikethrough", key: "strikeThrough", action: () => exec("strikeThrough") },
    { icon: <Heading1 size={16} />, label: "Heading 1", key: "h1", action: () => toggleHeading("h1") },
    { icon: <Heading2 size={16} />, label: "Heading 2", key: "h2", action: () => toggleHeading("h2") },
    { icon: <Heading3 size={16} />, label: "Heading 3", key: "h3", action: () => toggleHeading("h3") },
    { icon: <Heading4 size={16} />, label: "Heading 4", key: "h4", action: () => toggleHeading("h4") },
    { icon: <AlignLeft size={16} />, label: "Align Left", key: "justifyLeft", action: () => exec("justifyLeft") },
    { icon: <AlignCenter size={16} />, label: "Center", key: "justifyCenter", action: () => exec("justifyCenter") },
    { icon: <AlignRight size={16} />, label: "Align Right", key: "justifyRight", action: () => exec("justifyRight") },
    { icon: <List size={16} />, label: "Bullet List", key: "insertUnorderedList", action: () => exec("insertUnorderedList") },
    { icon: <ListOrdered size={16} />, label: "Numbered List", key: "insertOrderedList", action: () => exec("insertOrderedList") },
    { icon: <Quote size={16} />, label: "Quote", key: "blockquote", action: () => exec("formatBlock", "<blockquote>") },
    { icon: <CodeIcon size={16} />, label: "Code", action: insertCode },
    { icon: <Link2 size={16} />, label: "Link", action: insertLink },
  ];

  return (
    <div className={className}>
      <style>{`
        .rte-toolbar {
          position: sticky;
          top: ${stickyTopOffset}px;
          z-index: 30;
        }
        .rte-content:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
        }
        .rte-content h1 { font-size: 1.75rem; font-weight: 700; margin: 0.6em 0; }
        .rte-content h2 { font-size: 1.4rem; font-weight: 700; margin: 0.6em 0; }
        .rte-content h3 { font-size: 1.15rem; font-weight: 700; margin: 0.5em 0; }
        .rte-content h4 { font-size: 1rem; font-weight: 700; margin: 0.5em 0; }
        .rte-content blockquote {
          border-left: 3px solid #067F76;
          padding-left: 1em;
          color: #475569;
          margin: 0.6em 0;
        }
        .rte-content code {
          background: #e2e8f0;
          padding: 0.15em 0.4em;
          border-radius: 0.3em;
          font-family: ui-monospace, monospace;
          font-size: 0.9em;
        }
        .rte-content ul, .rte-content ol {
          padding-left: 1.8em !important;
          margin: 0.5em 0 !important;
        }
        .rte-content a { color: #067F76; text-decoration: underline; }
      `}</style>

      <div className="rte-toolbar flex flex-wrap items-center gap-2 p-3 mb-3 bg-slate-100 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex gap-1 pr-3 border-r border-slate-300">
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("undo")} className="p-2 hover:bg-white rounded-lg" title="Undo">
            <Undo size={18} />
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("redo")} className="p-2 hover:bg-white rounded-lg" title="Redo">
            <Redo size={18} />
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={removeFormatting} className="p-2 hover:bg-white rounded-lg" title="Clear formatting">
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
          <select
            value={fontSize}
            onChange={(e) => applyFontSize(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#067F76]"
            title="Select text first, then choose a size"
          >
            {fontSizes.map((s) => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 pr-3 border-r border-slate-300">
          <select
            value={lineHeight}
            onChange={(e) => applyLineHeight(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#067F76]"
          >
            {lineHeights.map((lh) => (
              <option key={lh} value={lh}>↕ {lh}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-1 pr-3 border-r border-slate-300">
          <label className="cursor-pointer p-2 hover:bg-white rounded-lg" title="Text color (select text first)">
            <Palette size={18} />
            <input type="color" onChange={(e) => applyTextColor(e.target.value)} className="hidden" />
          </label>
          <label className="cursor-pointer p-2 hover:bg-white rounded-lg" title="Highlight (select text first)">
            <Highlighter size={18} />
            <input type="color" defaultValue="#fff59d" onChange={(e) => applyHighlight(e.target.value)} className="hidden" />
          </label>
        </div>

        <div className="flex flex-wrap gap-1">
          {toolbarButtons.map((btn, i) => {
            const isActive = btn.key ? activeFormats.has(btn.key) : false;
            return (
              <button
                key={i}
                type="button"
                title={btn.label}
                onMouseDown={(e) => e.preventDefault()}
                onClick={btn.action}
                className={`p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#067F76] text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-[#067F76] hover:shadow-sm"
                }`}
              >
                {btn.icon}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncContent}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onClick={updateActiveFormats}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="rte-content w-full p-6 bg-white rounded-2xl border border-slate-200 outline-none focus:border-[#067F76] text-base leading-relaxed"
      />
    </div>
  );
}