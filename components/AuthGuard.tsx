"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const customerAuth = sessionStorage.getItem("customerAuth");
    const adminAuth = sessionStorage.getItem("adminAuth");

    // halaman login admin
    if (pathname === "/admin/login") {
      if (adminAuth === "true") {
        router.replace("/admin");
      } else {
        setAuthorized(true); // Belum login, izinkan akses form login
      }
      return;
    }

    // panel admin lain
    if (pathname.startsWith("/admin")) {
      if (adminAuth !== "true") {
        router.replace("/admin/login");
      } else {
        setAuthorized(true); // Sudah login, izinkan masuk panel
      }
      return;
    }

    // login / register pelanggan
    if (pathname === "/login" || pathname === "/register") {
      if (customerAuth === "true") {
        router.replace("/");
      } else {
        setAuthorized(true);
      }
      return;
    }

    if (customerAuth !== "true") {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
