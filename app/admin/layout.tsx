"use client";
import { Nav, Navbar, Button as BootstrapButton, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isAuthPage =
      pathname === "/admin/login" || pathname === "/admin/register";
    const loggedStatus = sessionStorage.getItem("adminAuth");
    if (loggedStatus === "true") {
      setIsLoggedIn(true);
    } else if (!isAuthPage) {
      router.replace("/admin/login");
      return;
    }
    setIsLoading(false);
  }, [pathname, router]);

  const handleLogoutConfirm = () => {
    sessionStorage.removeItem("adminAuth");
    setIsLoggedIn(false);
    setShowModal(false);
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return <>{children}</>;
  }
  if (isLoading) return <div className="text-center p-5">Memuat...</div>;
  if (!isLoggedIn) return null;

  return (
    <>
      <title>Admin Panel | Muara Baru</title>
      <div className="d-flex admin-wrapper">
        <div className="col-md-2 p-0 shadow-sm d-flex flex-column admin-sidebar-custom">
          <div className="p-4 text-center border-bottom border-secondary">
            <h4 className="admin-brand-logo lost-fish mb-0 fs-5 text-nowrap">
              <i className="fa-solid fa-fish me-1"></i> Muara Baru
            </h4>
            <small className="text-white-50 roman">Admin Panel</small>
          </div>

          <Nav className="flex-column mt-3 px-3 flex-grow-1">
            <Nav.Link
              as={Link}
              href="/admin"
              className={`mb-2 rounded sidebar-link-text ${pathname === "/admin" ? "active" : ""}`}
            >
              <i className="fa-solid fa-chart-pie me-2"></i> Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/admin/kategori/manage"
              className={`mb-2 rounded sidebar-link-text ${pathname === "/admin/kategori/manage" ? "active" : ""}`}
            >
              <i className="fa-solid fa-tags me-2"></i> Kelola Kategori
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/admin/products/add"
              className={`mb-2 rounded sidebar-link-text ${pathname === "/admin/products/add" ? "active" : ""}`}
            >
              <i className="fa-solid fa-plus me-2"></i> Tambah Produk
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/admin/products/manage"
              className={`mb-2 rounded sidebar-link-text ${pathname === "/admin/products/manage" ? "active" : ""}`}
            >
              <i className="fa-solid fa-box me-2"></i> Kelola Produk
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/admin/content"
              className={`mb-2 rounded sidebar-link-text ${pathname === "/admin/content" ? "active" : ""}`}
            >
              <i className="fa-solid fa-pen-to-square me-2"></i> Edit Konten
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/admin/gallery/manage"
              className={`mb-2 rounded sidebar-link-text ${pathname === "/admin/gallery/manage" ? "active" : ""}`}
            >
              <i className="fa-solid fa-images me-2"></i> Kelola Galeri
            </Nav.Link>
          </Nav>

          {/* mt-auto AKAN MENDORONG BAGIAN INI KE BAWAH, TAPI TETAP AMAN DARI FOOTER KARENA PADDING CSS */}
          <div className="p-3 border-top border-secondary mt-auto">
            <Link
              href="/"
              className="btn btn-outline-info w-100 mb-3 d-flex align-items-center justify-content-center btn-rounded-10"
            >
              <i className="fa-solid fa-globe me-2"></i> Ke Website
            </Link>
            <BootstrapButton
              variant="danger"
              className="w-100 rounded-3"
              onClick={() => setShowModal(true)}
            >
              <i className="fa-solid fa-right-from-bracket me-2"></i> Logout
            </BootstrapButton>
          </div>
        </div>

        <div className="flex-grow-1 bg-light">
          <Navbar
            bg="white"
            expand="lg"
            className="border-bottom px-4 shadow-sm py-3"
          >
            <Navbar.Brand className="fw-bold text-dark">
              Dashboard Admin
            </Navbar.Brand>
          </Navbar>
          <div className="p-4">{children}</div>
        </div>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Konfirmasi Logout"
          message="Apakah Anda yakin ingin keluar dari Admin Panel?"
          confirmText="Ya, Logout"
          cancelText="Batal"
          cancelClassName="btn btn-outline-light"
          confirmClassName="btn btn-danger"
          onConfirm={handleLogoutConfirm}
        />
      </div>
    </>
  );
}
