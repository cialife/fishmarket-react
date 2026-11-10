"use client";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { ProductItem } from "@/app/data/dataProduct";
import { getProduk } from "@/lib/produk";

type Props = {
  kategori?: "Ikan Air Asin" | "Ikan Air Tawar"; // kosong = semua ikan
  height?: string;
};

export default function MiniCarousel({ kategori, height = "180px" }: Props) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  
  useEffect(() => {
    setProducts(getProduk());
  
    const onStorage = (e: StorageEvent) => {
      if (e.key === "products") setProducts(getProduk());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const items = kategori
    ? products.filter((p) => p.kategori === kategori)
    : products;
    
  return (
    <Carousel
      interval={2500}
      indicators={false}
      className="mini-carousel rounded-4 overflow-hidden"
    >
      {items.map((item) => (
        <Carousel.Item key={item.id}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height, background: "#fff" }}
          >
            <img
              src={item.src}
              alt={item.nama}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <Carousel.Caption className="pb-2">
            <small className="fw-bold">{item.nama}</small>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}