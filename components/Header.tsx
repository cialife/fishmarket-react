"use client";

import { useState } from "react";
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
  const [showProduk, setShowProduk] = useState(false);
  return (
    <Navbar fixed="top" expand="lg" className="navbar-custom">
      <Container fluid className="px-4 px-lg-5">
        <Navbar.Brand as={Link} href="/home">
            <i className="fa-solid fa-fish"/> Muara Baru
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/">Beranda</Nav.Link>
            <Nav.Link as={Link} href="/about">Tentang Kami</Nav.Link>
            <NavDropdown 
                title="Produk" 
                id="basic-nav-dropdown"
                show={showProduk}
                onMouseEnter={() => setShowProduk(true)}
                onMouseLeave={() => setShowProduk(false)}
                onToggle={(isOpen) => setShowProduk(isOpen)}
            >
              <NavDropdown.Item href="/product-saltwater-fish">Ikan Air Asin</NavDropdown.Item>
              <NavDropdown.Item href="/product-freshwater-fish">
                Ikan Air Tawar
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/gallery">Galeri</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}