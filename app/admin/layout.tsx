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
    const isAuthPage =
      pathname === "/admin/login" || pathname === "/admin/register";

    const loggedStatus = localStorage.getItem("adminAuth");

    if (loggedStatus === "true") {
      setIsLoggedIn(true);
    } else if (!isAuthPage) {
      router.replace("/admin/login");
      return;
    }

    setIsLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsLoggedIn(false);
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return <>{children}</>;
  }

  if (isLoading) {
    return <div className="text-center p-5">Memuat...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div
      className="d-flex admin-wrapper"
    >
      <div
        className="admin-sidebar bg-dark text-white p-3 d-flex flex-column justify-content-between"
      >
        <div>
          <h4 className="text-center py-3 border-bottom text-white fw-bold">
            Admin Panel
          </h4>
          <Nav className="flex-column mt-3">
            <Nav.Link href="/admin" className="text-white mb-2">
              📊 Dashboard
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
