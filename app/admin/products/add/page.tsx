"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Ikan Air Asin");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi pengaman kategori
    if (category !== "Ikan Air Asin" && category !== "Ikan Air Tawar") {
      alert(
        "Kategori produk hanya diizinkan untuk Ikan Air Asin atau Ikan Air Tawar!",
      );
      return;
    }

    // Logika simpan produk ke database/state Anda
    console.log({ productName, category, price });
    alert("Produk berhasil ditambahkan!");
    router.push("/admin");
  };

  return (
    <div
      className="container py-5"
      style={{ marginTop: "80px", maxWidth: "650px" }}
    >
      <div
        className="card p-4 shadow"
        style={{
          background: "var(--navy-900)",
          color: "var(--biru-muda)",
          borderRadius: "20px",
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{ color: "var(--kuning)", fontFamily: "HYWenHei" }}
        >
          Tambah Produk Pasar Ikan
        </h2>
        <form onSubmit={handleAddProduct}>
          <div className="mb-3">
            <label className="form-label">Nama Ikan / Produk</label>
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Contoh: Ikan Kakap / Ikan Gurame"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategori Produk</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Ikan Air Asin">Ikan Air Asin</option>
              <option value="Ikan Air Tawar">Ikan Air Tawar</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Harga (Rp)</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Contoh: 45000"
              required
            />
          </div>

          <button type="submit" className="button w-100">
            Simpan Produk
          </button>
        </form>
      </div>
    </div>
  );
}
