"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip guard for login page
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      setChecking(false);
      return;
    }

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
          <p className="text-slate-500">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
