"use client";

import Hero from "@/components/Hero";
import Title from "@/components/Title";
import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { galleryData, GalleryItem } from "@/app/data/dataGallery";
import GalleryCard from "@/components/GalleryCard"; // Diperbarui agar sesuai dengan alias path root

export default function Gallery() {
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const handleClose = () => setLightboxItem(null);

  const filteredData = galleryData.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <>
      <Hero
        videoSrc="/videos/gallery.mp4"
        title="Galeri Pasar Ikan Modern Muara Baru"
        sub="Apa saja yang dilakukan di Pasar?"
        buttonText="Lihat Galeri"
        buttonLink="content"
      />

      <Container className="my-5" id="content">
        <Title
          title="Momen yang Terdokumentasi"
          sub="Keseharian para nelayan lokal dan suasana Pasar Ikan Modern Muara Baru"
        />

        <div className="pure-css-gallery">
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

          <Row className="g-4">
            {filteredData.map((item) => (
              <Col xs={12} md={6} lg={4} key={item.id}>
                <GalleryCard 
                  item={item} 
                  onSelect={(selected: GalleryItem) => setLightboxItem(selected)} 
                />
              </Col>
            ))}
          </Row>

          <Modal show={lightboxItem !== null} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton className="border-0 bg-dark text-white">
              <Modal.Title>{lightboxItem?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-center p-0">
              {lightboxItem?.type === "photo" ? (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="img-fluid w-100 image-contain"
                  style={{ maxHeight: "80vh" }}
                />
              ) : (
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