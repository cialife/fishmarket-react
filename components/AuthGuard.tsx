"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const adminAuth = sessionStorage.getItem("adminAuth");
    const user = getCurrentUser();

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
      if (user) {
        // Jika akun pelanggan masih ada & aktif, alihkan ke beranda
        router.replace("/");
      } else {
        // Jika belum login atau akun sudah dihapus, izinkan buka form login
        setAuthorized(true);
      }
      return;
    }

    const isProtectedCustomerRoute =
      pathname === "/pesanan" || pathname === "/pesanan/riwayat";

    if (isProtectedCustomerRoute && !user) {
      router.replace("/login");
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
