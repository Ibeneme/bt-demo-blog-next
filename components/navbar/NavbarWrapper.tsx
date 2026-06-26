"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

<<<<<<< HEAD
  // Hide Navbar if the route starts with /admin
=======
>>>>>>> feature/improved-dashboard
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
}
