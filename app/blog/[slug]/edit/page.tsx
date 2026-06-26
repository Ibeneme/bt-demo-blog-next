// app/blog/[slug]/edit/page.tsx
import AdminGuard from "@/app/admin/AdminGuard";
import { supabase } from "../../../../configs/supabase";
import BlogEditClient from "./BlogEditClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `Edit SEO - ${slug} | Blessing Attorney`,
  };
}

export default async function BlogEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <AdminGuard>
      <BlogEditClient slug={slug} />
    </AdminGuard>
  );
}
