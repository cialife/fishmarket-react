"use client";

import { useState, useMemo, useEffect } from "react";
import Hero from "@/components/Hero";
import Title from "@/components/Title";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import ProductCard from "@/components/ProductCard";
import InfoRow from "@/components/InfoRow";
import PriceTable from "@/components/PriceTable";
import MiniCarousel from "@/components/MiniCarousel";
import type { ProductItem } from "@/app/data/dataProduct";
import { getProduk } from "@/lib/produk";
import { getKategori, KategoriItem } from "@/lib/kategori";

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);

  const [categories, setCategories] = useState<KategoriItem[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const [priceSort, setPriceSort] = useState<string>("default");

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadProduk = () => setProducts(getProduk());
    const loadKategori = () => setCategories(getKategori());

    // muat data awal
    loadProduk();
    loadKategori();

    // sinkron kalau admin ubah data (tab lain / halaman lain)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "products") loadProduk();
      if (e.key === "categories_data") loadKategori();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("kategoriUpdated", loadKategori);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("kategoriUpdated", loadKategori);
    };
  }, []);

  useEffect(() => {
    if (
      selectedCategory !== "Semua" &&
      !categories.some((k) => k.nama === selectedCategory)
    ) {
      setSelectedCategory("Semua");
    }
  }, [categories, selectedCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || item.kategori === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if  (priceSort === "low-high") return a.harga - b.harga;
      if (priceSort === "high-low") return b.harga - a.harga;

      if (a.kategori !== b.kategori) {
        return a.kategori.localeCompare(b.kategori);
      }
      return 0;
    });
  }, [products, searchQuery, selectedCategory, priceSort]);

  const handleSuccessAdd = (namaProduk: string) => {
    setSuccessMessage(`Berhasil menambah "${namaProduk}" ke daftar pesanan!`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <>
      <title>Katalog Produk | Muara Baru</title>
      {successMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1050,
            minWidth: "320px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <Alert
            variant="success"
            className="text-center mb-0 fw-semibold py-3 border-0"
          >
            {successMessage}
          </Alert>
        </div>
      )}

      <Hero
        videoSrc="/videos/catalog.mp4"
        title="Katalog Produk Pasar Ikan Muara Baru"
        sub="Nikmati segarnya ikan dari laut"
        buttonText="Lihat katalog"
        buttonLink="content"
      />
      <div id="content">
        <Title
          title="ㆍ Temukan Ikan Terbaik ㆍ"
          sub="Hasil tangkapan segar dari nelayan setempat, langsung ke meja Anda."
        ></Title>
      </div>
      <Container className="container-catalog mb-5">
        <div className="mb-5">
          <InfoRow
            title="Tabel Harga"
            text="Kami menyediakan berbagai pilihan ikan segar dan berkualitas yang dipilih dari nelayan lokal dan pemasok terpercaya. Setiap ikan dapat diolah dengan berbagai cara, seperti mentah, dikukus, atau dibakar. Kami berkomitmen menyediakan ikan yang segar, lezat, dan bergizi dengan harga yang terjangkau untuk keluarga maupun restoran."
            media={<PriceTable />}
          >
            <MiniCarousel />
          </InfoRow>
        </div>
        <div className="mb-5">
          <Title
            title="ㆍ Pesan Ikan Anda ㆍ"
            sub="Hasil tangkapan segar dari nelayan setempat, langsung ke meja Anda."
          ></Title>
          <div className="mb-4 p-4 bg-light rounded-4 shadow-sm">
            <Row className="align-items-center g-3">
              <Col xs={12} md={4}>
                <Form.Control
                  type="text"
                  placeholder="Cari nama ikan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Col>
              <Col xs={12} md={4}>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="Semua">Semua Kategori</option>
                  {categories.map((kat) => (
                    <option key={kat.id} value={kat.nama}>
                      {kat.nama}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={4}>
                <Form.Select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                >
                  <option value="default">Urutkan Harga</option>
                  <option value="low-high">Harga Terendah</option>
                  <option value="high-low">Harga Tertinggi</option>
                </Form.Select>
              </Col>
            </Row>
          </div>
          <div className="mb-5">
            <Container>
              {filteredProducts.length > 0 ? (
                <Row className="g-4">
                  {filteredProducts.map((item: ProductItem) => (
                    <Col
                      key={item.id}
                      xs={12}
                      md={4}
                      className="d-flex justify-content-center"
                    >
                      <ProductCard
                        {...item}
                        // Fungsi success setelah klik tambah pesanan
                        onAddSuccess={() => handleSuccessAdd(item.nama)}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-center">
                  Tidak ada produk yang sesuai dengan kriteria pencarian.
                </p>
              )}
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
}