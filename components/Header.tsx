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

export default function Header() {
  const [showProduk, setShowProduk] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [jumlahPesanan, setJumlahPesanan] = useState(0);

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

  const handleLogout = () => {
    localStorage.removeItem("customerAuth"); // Hapus sesi
    router.push("/login"); // Kembalikan ke halaman login
  };

  return (
    <Navbar fixed="top" expand="lg" className="navbar-custom">
      <Container fluid className="px-4 px-lg-5">
        <Navbar.Brand as={Link} href="/home">
            <i className="fa-solid fa-fish"/> Muara Baru
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/" className={pathname === "/" ? "active" : ""}>Beranda</Nav.Link>
            <Nav.Link as={Link} href="/about" className={pathname === "/about" ? "active" : ""}>Tentang Kami</Nav.Link>
            <NavDropdown
              title="Produk"
              id="basic-nav-dropdown"
              show={showProduk}
              onMouseEnter={() => setShowProduk(true)}
              onMouseLeave={() => setShowProduk(false)}
              onToggle={(isOpen) => setShowProduk(isOpen)}
            >
              <NavDropdown.Item href="/catalog">Katalog Produk</NavDropdown.Item>
              <NavDropdown.Item href="/pesanan">
                Pesanan
                {jumlahPesanan > 0 && (
                  <Badge bg="danger" pill className="ms-2">
                      {jumlahPesanan}
                  </Badge>
                )}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/gallery" className={pathname === "/gallery" ? "active" : ""}>Galeri</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}