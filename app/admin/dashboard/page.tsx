// app/admin/dashboard/page.tsx
import { Metadata } from "next";
import DashboardWithToggle from "./DashboardWithToggle";

export const metadata: Metadata = {
  title: "Blog Dashboard | ARIAD Admin",
  robots: "noindex, nofollow",
};

export default function BlogDashboardPage() {
  return <DashboardWithToggle />;
}