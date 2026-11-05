"use client";

import React, { useState } from "react";
// Import data dan type dari file dataGallery.tsx
import { galleryData, GalleryItem } from "@/app/data/dataGallery";

export default function Gallery() {
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const closeLightbox = (e: React.MouseEvent) => {
    e.preventDefault();
    setLightboxItem(null);
  };

  // Filter data berdasarkan state 'filter'
  const filteredData = galleryData.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <>
      <section className="hero">
        <div className="head-video">
          <video controls autoPlay loop muted>
            <source src="/videos/gallery.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-text">
          <h1>Gallery Pasar Ikan Modern Muara Baru</h1>
          <a href="#content" className="button">
            See more <i className="fa-solid fa-circle-arrow-down"></i>
          </a>
        </div>
      </section>

      <div className="container-gallery">
        <div className="title" id="content">
          <h2>The Gallery Of The Best Fish Market</h2>
          <p>Take a glimpse on the freshness of the sea.</p>
        </div>

        <div className="pure-css-gallery">
          {/* Filter Buttons disesuaikan dengan useState */}
          <div className="gallery-filter">
            <button
              className={`filter-btn ${filter === "all" ? "active-filter" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === "photo" ? "active-filter" : ""}`}
              onClick={() => setFilter("photo")}
            >
              Photo
            </button>
            <button
              className={`filter-btn ${filter === "video" ? "active-filter" : ""}`}
              onClick={() => setFilter("video")}
            >
              Video
            </button>
          </div>

          <div className="gallery-grid">
            {filteredData.map((item) => (
              <a
                key={item.id}
                href={`#img${item.id}`}
                className={`gallery-item item-${item.type}`}
                onClick={(e) => {
                  e.preventDefault();
                  setLightboxItem(item);
                }}
              >
                <div className="image-wrapper">
                  {item.type === "photo" ? (
                    <img src={item.src} alt={item.title} />
                  ) : (
                    <iframe
                      src={item.previewSrc}
                      title={item.title}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      style={{
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        border: 0,
                      }}
                    ></iframe>
                  )}

                  <span className="zoom-badge">
                    {item.type === "photo" ? (
                      <i className="fa-solid fa-magnifying-glass"></i>
                    ) : (
                      " See It in Action"
                    )}
                  </span>
                </div>
                <div className="card-caption">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Lightbox */}
          {lightboxItem && (
            <div
              className="lightbox"
              style={{ opacity: 1, pointerEvents: "auto" }}
            >
              <a href="#" className="close-btn" onClick={closeLightbox}>
                &times;
              </a>
              <div className="lightbox-content">
                {lightboxItem.type === "photo" ? (
                  <img src={lightboxItem.src} alt={lightboxItem.title} />
                ) : (
                  <iframe
                    width="560"
                    height="315"
                    src={lightboxItem.src}
                    title={lightboxItem.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ border: 0, borderRadius: "8px", maxWidth: "100%" }}
                  ></iframe>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
