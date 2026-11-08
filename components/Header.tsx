"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getPesanan } from "@/lib/pesanan";
import Badge from "react-bootstrap/Badge";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import { logoutUser } from "@/lib/auth";

export default function Header() {
  const [showProduk, setShowProduk] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [jumlahPesanan, setJumlahPesanan] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updatePesanan = () => {
      setJumlahPesanan(getPesanan().length);
    };
    updatePesanan();

    window.addEventListener("pesananUpdated", updatePesanan);

    return () => {
      window.removeEventListener("pesananUpdated", updatePesanan);
    };
  }, []);

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  const handleLogoutConfirm = () => {
    sessionStorage.removeItem("customerAuth");
    logoutUser();
    setShowModal(false);
    router.push("/login");
  };

  return (
    <Navbar fixed="top" expand="lg" className="navbar-custom">
      <Container fluid className="px-4 px-lg-5">
        <Navbar.Brand as={Link} href="/home">
          <i className="fa-solid fa-fish" /> Muara Baru
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              href="/"
              className={pathname === "/" ? "active" : ""}
            >
              Beranda
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/about"
              className={pathname === "/about" ? "active" : ""}
            >
              Tentang Kami
            </Nav.Link>
            <NavDropdown
              title="Produk"
              id="basic-nav-dropdown"
              show={showProduk}
              onMouseEnter={() => setShowProduk(true)}
              onMouseLeave={() => setShowProduk(false)}
              onToggle={(isOpen) => setShowProduk(isOpen)}
            >
              <NavDropdown.Item href="/catalog">
                Katalog Produk
              </NavDropdown.Item>
              <NavDropdown.Item href="/pesanan">
                Pesanan
                {jumlahPesanan > 0 && (
                  <Badge bg="danger" pill className="ms-2">
                    {jumlahPesanan}
                  </Badge>
                )}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              as={Link}
              href="/gallery"
              className={pathname === "/gallery" ? "active" : ""}
            >
              Galeri
            </Nav.Link>
            <Nav.Link
              as="button"
              className="text-danger fw-bold border-0 bg-transparent d-flex align-items-center ms-lg-2"
              onClick={() => setShowModal(true)}
            >
              <i className="fa-solid fa-right-from-bracket me-1"></i>Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="custom-dark-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin keluar dari akun?</Modal.Body>
        <Modal.Footer>
          <BootstrapButton
            variant="outline-light"
            onClick={() => setShowModal(false)}
          >
            Batal
          </BootstrapButton>
          <BootstrapButton variant="danger" onClick={handleLogoutConfirm}>
            Ya, Logout
          </BootstrapButton>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}