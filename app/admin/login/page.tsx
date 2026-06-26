// app/admin/login/page.tsx
import { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Login | ARIAD Psychological Services",
  description: "Secure admin access",
  robots: "noindex, nofollow",
};

export default function AdminLoginPage() {
  return (
    <>
      <AdminLoginClient />
    </>
  );
}
