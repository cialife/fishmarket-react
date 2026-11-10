"use client";
// 1. IMPORT AREA
// Mengimpor komponen UI, hook React, tata letak Bootstrap, dan data galeri.
import Hero from "@/components/Hero";
import Title from "@/components/Title";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { galleryData, GalleryItem } from "@/app/data/dataGallery";
import GalleryCard from "@/components/GalleryCard";
import { getGalleryItems } from "@/lib/gallery";

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  // 2. STATE MANAGEMENT (Penyimpanan Data Dinamis)
  // State 'filter' untuk melacak kategori apa yang sedang aktif (Semua, Foto, atau Video).
  // Nilai default-nya adalah "all".
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");
  
  // State 'lightboxItem' untuk menyimpan data gambar/video mana yang sedang di-klik.
  // Jika nilainya null, berarti modal (pop-up) sedang tertutup.
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // 3. FUNGSI HANDLER
  // Fungsi ini dipanggil untuk menutup pop-up modal dengan cara mengembalikan nilainya ke null.
  const handleClose = () => setLightboxItem(null);

  useEffect(() => {
    setItems(getGalleryItems());
    const handleUpdate = () => setItems(getGalleryItems());
    window.addEventListener("galleryUpdated", handleUpdate);
    return () => window.removeEventListener("galleryUpdated", handleUpdate);
  }, [])
  // 4. LOGIKA FILTERING (Penyaringan Data)
  // Sebelum ditampilkan, data asli (galleryData) disaring terlebih dahulu sesuai state 'filter'.
  const filteredData = galleryData.filter((item) => {
    if (filter === "all") return true; // Jika "all", tampilkan semua data
    return item.type === filter;       // Jika tidak, cocokkan tipe data dengan filter aktif
  });

  // 5. RENDER UI (Tampilan Layar)
  return (
    <>
      <title>Galeri | Muara Baru</title>
      {/* BAGIAN HERO: Menampilkan video latar belakang dan judul halaman */}
      <Hero
        videoSrc="/videos/gallery.mp4"
        title="Galeri Pasar Ikan Modern Muara Baru"
        sub="Apa saja yang dilakukan di Pasar?"
        buttonText="Lihat Galeri"
        buttonLink="content"
      />

      {/* KONTEN UTAMA: Menggunakan Container agar margin kiri-kanan rapi di tengah */}
      <Container className="my-5" id="content">
        <Title
          title="Momen yang Terdokumentasi"
          sub="Keseharian para nelayan lokal dan suasana Pasar Ikan Modern Muara Baru"
        />

        <div className="pure-css-gallery">
          {/* --- BAGIAN TOMBOL FILTER --- */}
          {/* Tombol-tombol ini mengubah state 'filter' ketika di-klik (onClick) */}
          <div className="gallery-filter d-flex justify-content-center gap-3 mb-4">
            <Button
              variant={filter === "all" ? "warning" : "light"}
              className={`filter-btn rounded-pill px-4 ${filter === "all" ? "active-filter fw-bold" : "text-primary"}`}
              onClick={() => setFilter("all")}
            >
              Semua
            </Button>
            <Button
              variant={filter === "photo" ? "warning" : "light"}
              className={`filter-btn rounded-pill px-4 ${filter === "photo" ? "active-filter fw-bold" : "text-primary"}`}
              onClick={() => setFilter("photo")}
            >
              Foto
            </Button>
            <Button
              variant={filter === "video" ? "warning" : "light"}
              className={`filter-btn rounded-pill px-4 ${filter === "video" ? "active-filter fw-bold" : "text-primary"}`}
              onClick={() => setFilter("video")}
            >
              Video
            </Button>
          </div>

          {/* --- BAGIAN GRID GALERI --- */}
          {/* Row dan Col dari Bootstrap digunakan untuk membuat tata letak responsif */}
          <Row className="g-4">
            {/* Proses perulangan (mapping) dari data yang sudah difilter untuk membuat kartu-kartu galeri */}
            {filteredData.map((item) => (
              <Col xs={12} md={6} lg={4} key={item.id}>
                {/* Komponen GalleryCard menerima props 'item' dan fungsi 'onSelect' 
                    untuk memicu state lightboxItem saat kartu diklik */}
                <GalleryCard
                  item={item}
                  onSelect={(selected: GalleryItem) =>
                    setLightboxItem(selected)
                  }
                />
              </Col>
            ))}
          </Row>

          {/* --- BAGIAN MODAL / LIGHTBOX (POP-UP) --- */}
          {/* Modal ini hanya akan muncul ('show') jika lightboxItem tidak kosong (!== null) */}
          <Modal
            show={lightboxItem !== null}
            onHide={handleClose}
            centered
            size="lg"
          >
            <Modal.Header closeButton className="border-0 bg-white">
              <Modal.Title>{lightboxItem?.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-dark text-center p-0">
              {/* Conditional Rendering: Cek apakah item yang sedang dibuka adalah foto atau video */}
              {lightboxItem?.type === "photo" ? (
                // Jika FOTO: render tag <img>
                <img
                  src={lightboxItem?.src}
                  alt={lightboxItem?.title}
                  className="img-fluid w-100 image-contain"
                  style={{ maxHeight: "80vh" }}
                />
              ) : (
                // Jika VIDEO: render tag <iframe> dengan rasio layar 16:9
                <div className="ratio ratio-16x9">
                  <iframe
                    src={lightboxItem?.src}
                    title={lightboxItem?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </>
  );
}