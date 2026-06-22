"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Search,
} from "lucide-react";
import Image from "next/image";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
  read_time: string;
};

export default function BlogDashboardClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const router = useRouter();
  const supabase = createClient();

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else if (data) {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [supabase]);

  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    setDeletingId(postToDelete.id);

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", postToDelete.id);

    if (error) {
      alert("Failed to delete article: " + error.message);
    } else {
      setPosts(posts.filter((p) => p.id !== postToDelete.id));
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto pt-[60px]">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#023B37]">
              Blog Management
            </h1>
            <p className="text-slate-500 font-medium">
              ARIAD Psychological Insights
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-4 rounded-full  focus:outline-none focus:ring-2 focus:ring-[#067F76] shadow-sm w-full sm:w-64"
              />
            </div>

            <button
              onClick={() => router.push("/admin/blog/create")}
              className="flex items-center justify-center gap-2 bg-[#023B37] text-white px-6 py-4 rounded-full font-bold hover:bg-[#067F76] transition-all shadow-xl shadow-[#023B37]/20"
            >
              <Plus size={18} /> Create New
            </button>
          </div>
        </div>

        <div className="relative">
          {filteredPosts.length === 0 && !loading ? (
            <div className="bg-white p-12 rounded-3xl text-center ">
              <p className="text-slate-400">
                No articles found matching "{searchQuery}".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(loading ? Array.from({ length: 6 }) : filteredPosts).map(
                (post: any, idx) => (
                  <BlogCard
                    key={loading ? `skeleton-${idx}` : post.id}
                    post={loading ? undefined : post}
                    onEdit={() => router.push(`/admin/blog/edit/${post?.id}`)}
                    onDelete={() => handleDeleteClick(post)}
                    onView={() =>
                      router.push(`/blog/view/${post?.slug || post?.id}`)
                    }
                  />
                )
              )}
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 -m-2 flex items-center justify-center rounded-3xl bg-[#F1F4F9]/60 backdrop-blur-md z-10">
              <div className="flex flex-col items-center gap-4 bg-white/70 backdrop-blur-xl px-10 py-8 rounded-3xl ">
                <Loader2 className="animate-spin text-[#023B37]" size={40} />
                <p className="font-bold text-[#023B37]">Fetching insights...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && postToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Delete Article?
            </h2>
            <p className="text-slate-600 mb-8">
              Are you sure you want to delete{" "}
              <strong>"{postToDelete.title}"</strong>?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-4 border rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-4 bg-red-600 text-white rounded-2xl"
              >
                {deletingId ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BlogCard({
  post,
  onEdit,
  onDelete,
  onView,
}: {
  post?: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}) {
  if (!post) {
    return <div className="bg-white rounded-3xl h-80  animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden  hover:shadow-xl cursor transition-all">
      <div className="h-48 relative overflow-hidden">
        <Image
          src={post.image_url || "/placeholder.png"}
          alt={post.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase text-[#023B37]">
          {post.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{post.title}</h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 ">
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold">
            <span>
              <Calendar size={12} className="inline mr-1" />{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <span>
              <Clock size={12} className="inline mr-1" /> {post.read_time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-[#067F76] hover:bg-slate-100 rounded-full"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full"
            >
              <Trash2 size={18} />
            </button>
            <div
              onClick={onView}
              className="bg-slate-50 p-2 rounded-full cursor-pointer"
            >
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
