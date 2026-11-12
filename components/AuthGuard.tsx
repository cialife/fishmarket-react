"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser, isAccountDeleted, logoutUser } from "@/lib/auth";
import Modal from "@/components/Modal";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

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

    // semua halaman pelanggan lain wajib login
    if (!user) {
      // cegah halaman sempat terlihat sebelum redirect
      setAuthorized(false);
      router.replace("/login");
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const check = () => {
      if (isAccountDeleted()) setShowDeleted(true);
    };
    check();
    window.addEventListener("storage", check);
    window.addEventListener("focus", check);
    const timer = setInterval(check, 3000);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener("focus", check);
      clearInterval(timer);
    };
  }, [pathname]);

  const handleDeletedConfirm = () => {
    setShowDeleted(false);
    logoutUser();
    router.replace("/login");
  };

  const deletedModal = (
    <Modal
      show={showDeleted}
      onHide={handleDeletedConfirm}
      title="Akun Dihapus"
      message="Sesi Anda Berakhir. Silakan login kembali."
      confirmText="OK"
      confirmClassName="primary"
      hideCancel
      onConfirm={handleDeletedConfirm}
    />
  );

  // bagian return paling bawah:
  if (!authorized) return deletedModal;
  return (
    <>
      {children}
      {deletedModal}
    </>
  );
}
