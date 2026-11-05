"use client";

import { Nav, Navbar, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cek apakah user sedang berada di halaman login atau register
    const isAuthPage =
      pathname === "/admin/login" || pathname === "/admin/register";

    // Cek status login dari localStorage
    const loggedStatus = localStorage.getItem("admin_logged_in");

    if (loggedStatus === "true") {
      setIsLoggedIn(true);
    } else if (!isAuthPage) {
      // Jika belum login dan bukan di halaman auth, lempar ke halaman login
      router.push("/admin/login");
    }

    setIsLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);
    router.push("/admin/login");
  };

  // Jika sedang di halaman login atau register, tampilkan halamannya saja tanpa Sidebar & Navbar admin
  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return <>{children}</>;
  }

  if (isLoading) {
    return <div className="text-center p-5">Memuat...</div>;
  }

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}
    >
      {/* SIDEBAR (Kiri) */}
      <div
        className="bg-dark text-white p-3 d-flex flex-column justify-content-between"
        style={{ width: "250px" }}
      >
        <div>
          <h4 className="text-center py-3 border-bottom text-white fw-bold">
            Admin Panel
          </h4>
          <Nav className="flex-column mt-3">
            <Nav.Link href="/admin" className="text-white mb-2">
              📊 Dashboard v2
            </Nav.Link>
            <Nav.Link href="/admin/products/add" className="text-white mb-2">
              ➕ Tambah Produk
            </Nav.Link>
          </Nav>
        </div>

        <div>
          <Nav.Link href="/" className="text-warning mb-3">
            ← Kembali ke Website
          </Nav.Link>
          <Button
            variant="outline-light"
            size="sm"
            className="w-100"
            onClick={handleLogout}
          >
            Keluar (Logout)
          </Button>
        </div>
      </div>

      {/* AREA KONTEN UTAMA (Kanan) */}
      <div className="flex-grow-1">
        <Navbar bg="white" expand="lg" className="border-bottom px-4 shadow-sm">
          <Navbar.Brand href="/admin" className="fw-bold text-secondary">
            UMKM Muara Baru - Admin
          </Navbar.Brand>
        </Navbar>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
