"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
<<<<<<< HEAD
import { createClient } from "@/lib/supabase/client";
=======
>>>>>>> feature/improved-dashboard

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
<<<<<<< HEAD

  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
=======
  const router = useRouter();
  const pathname = usePathname();
>>>>>>> feature/improved-dashboard

  useEffect(() => {
    // Skip guard for login page
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      setChecking(false);
      return;
    }

<<<<<<< HEAD
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const token = localStorage.getItem("adminToken");

        if (session || token) {
          setIsAuthorized(true);
        } else {
          router.replace("/admin/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [router, supabase, pathname]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#067F76] border-t-transparent rounded-full mx-auto mb-4" />
=======
    // Define protected routes
    const isProtectedRoute =
      pathname.startsWith("/admin/") ||
      pathname.startsWith("/blog/create") ||
      pathname.match(/^\/blog\/[^/]+\/edit$/);

    // If not a protected route, allow access
    if (!isProtectedRoute) {
      setIsAuthorized(true);
      setChecking(false);
      return;
    }

    // Check for admin token
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.replace("/admin/login");
      setChecking(false);
      return;
    }

    // Token exists → authorized
    setIsAuthorized(true);
    setChecking(false);
  }, [router, pathname]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4" />
>>>>>>> feature/improved-dashboard
          <p className="text-slate-500">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
