"use client";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Link from "next/link";

const MENU_ITEMS = [
  { href: "/admin", icon: "fa-chart-pie", label: "Dashboard" },
  { href: "/admin/kategori/manage", icon: "fa-tags", label: "Kelola Kategori" },
  { href: "/admin/products/add", icon: "fa-plus", label: "Tambah Produk" },
  { href: "/admin/products/manage", icon: "fa-box", label: "Kelola Produk" },
  { href: "/admin/content", icon: "fa-pen-to-square", label: "Edit Konten" },
  { href: "/admin/gallery/manage", icon: "fa-images", label: "Kelola Galeri" },
];

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
  const [showMenu, setShowMenu] = useState(false);

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

  // tutup menu burger setiap pindah halaman
  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  const openLogoutModal = () => {
    setShowMenu(false);
    setShowModal(true);
  };

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

  const menu = (
    <>
      <Nav className="flex-column mt-3 px-3 flex-grow-1">
        {MENU_ITEMS.map((item) => (
          <Nav.Link
            key={item.href}
            as={Link}
            href={item.href}
            className={`mb-2 rounded sidebar-link-text ${pathname === item.href ? "active" : ""}`}
          >
            <i className={`fa-solid ${item.icon} me-2`}></i> {item.label}
          </Nav.Link>
        ))}
      </Nav>

      <div className="p-3 border-top border-secondary mt-auto">
        <Link
          href="/"
          className="btn btn-outline-info w-100 mb-3 d-flex align-items-center justify-content-center btn-rounded-10"
        >
          <i className="fa-solid fa-globe me-2"></i> Ke Website
        </Link>
        <Button
          className="btn btn-danger w-100 rounded-3"
          onClick={openLogoutModal}
        >
          <i className="fa-solid fa-right-from-bracket me-2"></i> Logout
        </Button>
      </div>
    </>
  );
  return (
    <>
      <title>Admin Panel | Muara Baru</title>
      <div className="d-flex admin-wrapper">
        <div className="d-none d-md-flex flex-column col-md-2 p-0 shadow-sm admin-sidebar-custom">
          <div className="p-4 text-center border-bottom border-secondary">
            <h4 className="admin-brand-logo lost-fish mb-0 fs-5 text-nowrap">
              <i className="fa-solid fa-fish me-1"></i> Muara Baru
            </h4>
            <small className="text-white-50 roman">Admin Panel</small>
          </div>
          {menu}
        </div>

        <Offcanvas
          show={showMenu}
          onHide={() => setShowMenu(false)}
          className="d-md-none admin-offcanvas"
        >
          <Offcanvas.Header
            closeButton
            className="border-bottom border-secondary"
          >
            <Offcanvas.Title className="admin-brand-logo lost-fish fs-5">
              <i className="fa-solid fa-fish me-1"></i> Muara Baru
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column p-0">
            {menu}
          </Offcanvas.Body>
        </Offcanvas>

        <div className="flex-grow-1 bg-light admin-main">
          <Navbar
            bg="white"
            className="border-bottom px-3 px-md-4 shadow-sm py-3 justify-content-start"
          >
            <button
              type="button"
              className="btn btn-outline-dark d-md-none me-3"
              onClick={() => setShowMenu(true)}
              aria-label="Buka menu"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <Navbar.Brand className="fw-bold text-dark roman">
              Dashboard Admin
            </Navbar.Brand>
          </Navbar>
          <div className="p-3 p-md-4">{children}</div>
        </div>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Konfirmasi Logout"
          message="Apakah Anda yakin ingin keluar dari Admin Panel?"
          confirmText="Ya, Logout"
          cancelText="Batal"
          cancelClassName="btn btn-outline-light"
          confirmClassName="primary"
          onConfirm={handleLogoutConfirm}
        />
      </div>
    </>
  );
}
