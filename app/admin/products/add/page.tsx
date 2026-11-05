"use client";

import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Ikan Segar");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Produk "${productName}" berhasil ditambahkan ke katalog UMKM!`);
    router.push("/admin");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Tambah Produk Baru</h3>
        <Button variant="outline-secondary" size="sm" href="/admin">
          ← Kembali ke Dashboard
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3" controlId="productName">
                  <Form.Label className="fw-semibold">Nama Produk</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contoh: Ikan Tuna Segar Muara Baru"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label className="fw-semibold">Kategori</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Ikan Segar">Ikan Segar</option>
                    <option value="Udang & Kerang">Udang & Kerang</option>
                    <option value="Cumi & Sotong">Cumi & Sotong</option>
                    <option value="Olahan Ikan">Olahan Ikan</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label className="fw-semibold">Harga (Rp)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Contoh: 45000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="stock">
                  <Form.Label className="fw-semibold">
                    Stok (Kg / Porsi)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Contoh: 100"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="description">
              <Form.Label className="fw-semibold">Deskripsi Produk</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Tuliskan deskripsi singkat mengenai kesegaran atau asal produk..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" href="/admin">
                Batal
              </Button>
              <Button variant="success" type="submit">
                Simpan Produk
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
