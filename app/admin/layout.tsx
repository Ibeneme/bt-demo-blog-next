// // app/admin/layout.tsx
 import AdminGuard from "./AdminGuard";

 export default function AdminLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
   return <AdminGuard>{children}</AdminGuard>;
 }
