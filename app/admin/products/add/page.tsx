"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Form, Row, Col } from "react-bootstrap";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { getProduk, saveProduk } from "@/lib/produk";
import { getKategori, KategoriItem } from "@/lib/kategori";

export default function AddProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<KategoriItem[]>([]);
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "Ikan Air Asin",
    harga: "",
    desc: "",
  });
  const [image64, setImage64] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const loadKategori = () => {
      const list = getKategori();
      setCategories(list);
      // pilih kategori pertama jika kategori terpilih belum valid
      setFormData((prev) =>
        list.some((k) => k.nama === prev.kategori)
          ? prev
          : { ...prev, kategori: list[0]?.nama ?? "" },
      );
    };

    loadKategori();
    window.addEventListener("kategoriUpdated", loadKategori);
    window.addEventListener("storage", loadKategori);
    return () => {
      window.removeEventListener("kategoriUpdated", loadKategori);
      window.removeEventListener("storage", loadKategori);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage64(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentProducts = getProduk();
    const newProduct = {
      id: Date.now(),
      nama: formData.nama,
      kategori: formData.kategori,
      harga: Number(formData.harga),
      desc: formData.desc,
      src: image64,
    };
    saveProduk([...currentProducts, newProduct]);
    setShowSuccessModal(true);
  };

  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    router.push("/admin/products/manage");
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body className="p-4 p-md-5">
            <h4 className="fw-bold mb-4 text-dark">
              <i className="fa-solid fa-plus-circle me-2"></i> Tambah Produk
              Baru
            </h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nama Ikan</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  placeholder="Contoh: Ikan Kerapu Macan"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Kategori</Form.Label>
                    <Form.Select
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleChange}
                      required
                    >
                      {categories.length === 0 && (
                        <option value="">Belum ada kategori</option>
                      )}
                      {categories.map((kat) => (
                        <option key={kat.id} value={kat.nama}>
                          {kat.nama}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">
                      Harga per Kg (Rp)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="harga"
                      placeholder="Contoh: 50000"
                      value={formData.harga}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Deskripsi / Info Singkat
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="desc"
                  placeholder="Tuliskan deskripsi ikan..."
                  value={formData.desc}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Upload Foto Produk</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required={!image64}
                />
                {image64 && (
                  <div className="mt-3 text-center bg-light p-3 rounded">
                    <p className="small text-muted mb-2">Preview Foto:</p>
                    <img
                      src={image64}
                      alt="Preview"
                      className="img-preview-lg shadow-sm"
                    />
                  </div>
                )}
              </Form.Group>
              <Button type="submit" className="primary w-100 py-2 fs-5">
                Simpan Produk ke Katalog
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Modal
        show={showSuccessModal}
        onHide={handleModalConfirm}
        title="Berhasil"
        message={`Produk "${formData.nama}" berhasil ditambahkan ke katalog!`}
        confirmText="Lihat Kelola Produk"
        cancelText="Tutup"
        confirmClassName="btn btn-success"
        cancelClassName="btn btn-outline-light"
        onConfirm={handleModalConfirm}
      />
    </Row>
  );
}
