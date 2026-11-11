"use client";
import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Alert } from "react-bootstrap";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import {
  getContent,
  saveContent,
  getDefaultContent,
  resetDefaultContent,
} from "@/lib/content";

export default function AdminContentPage() {
  const resizeImage = (file: File, maxW = 900): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxW / img.width);
          const canvas = document.createElement("canvas");
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          canvas
            .getContext("2d")!
            .drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });

  const handleHomeImage = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const src = await resizeImage(file);
    setContent((prev) => ({
      ...prev,
      homeImages: prev.homeImages.map((img, i) =>
        i === index ? { ...img, src } : img,
      ),
    }));
  };

  const [content, setContent] = useState(getDefaultContent());
  const [successMsg, setSuccessMsg] = useState("");

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    setContent(getContent());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSaveModal(true); // jangan save di sini
  };

  const confirmSaveContent = () => {
    const ok = saveContent(content);
    setShowSaveModal(false);
    if (!ok) {
      alert(
        "Gagal menyimpan: penyimpanan browser penuh. Gunakan gambar yang lebih kecil.",
      );
      return;
    }
    window.dispatchEvent(new Event("contentUpdated"));
    setSuccessMsg("Konten berhasil diperbarui!");
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const confirmResetContent = () => {
    resetDefaultContent();
    const defaultData = getDefaultContent();
    setContent(defaultData);
    window.dispatchEvent(new Event("contentUpdated"));
    setShowResetModal(false);
    setSuccessMsg("Konten berhasil dikembalikan ke pengaturan default!");
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  return (
    <Row className="justify-content-center">
      <Col md={10}>
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body className="p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold text-dark mb-0">
                <i className="fa-solid fa-pen-to-square me-2"></i>{" "}
                <span className="roman">
                  Edit Konten Beranda & Tentang Kami
                </span>
              </h4>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill"
                onClick={() => setShowResetModal(true)}
              >
                <i className="fa-solid fa-rotate-left me-1"></i> Reset Content
                by Default
              </button>
            </div>

            {successMsg && (
              <Alert variant="success" className="mb-4 fw-semibold border-0">
                {successMsg}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <h5 className="text-primary fw-bold mb-3 border-bottom pb-2">
                Bagian Beranda (Home)
              </h5>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Judul Utama Hero (Home)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="homeTitle"
                  value={content.homeTitle}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  Sub-Judul / Slogan Hero
                </Form.Label>
                <Form.Control
                  type="text"
                  name="homeSub"
                  value={content.homeSub}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Judul Section (H2)</Form.Label>
                <Form.Control
                  type="text"
                  name="homeH2"
                  value={content.homeH2}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Paragraf Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="homeP"
                  value={content.homeP}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Label className="fw-bold">Gambar Beranda</Form.Label>
              <Row className="g-3 mb-4">
                {content.homeImages.map((img, i) => (
                  <Col xs={6} md={3} key={i}>
                    <div className="border rounded p-2 text-center bg-light">
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={{
                          width: "100%",
                          height: 100,
                          objectFit: "cover",
                        }}
                        className="rounded mb-2"
                      />
                      <Form.Control
                        size="sm"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleHomeImage(
                            i,
                            e as React.ChangeEvent<HTMLInputElement>,
                          )
                        }
                      />
                    </div>
                  </Col>
                ))}
              </Row>

              <h5 className="text-primary fw-bold mb-3 border-bottom pb-2 pt-2">
                Bagian Tentang Kami (About)
              </h5>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Judul Section Founder
                </Form.Label>
                <Form.Control
                  type="text"
                  name="aboutFounderTitle"
                  value={content.aboutFounderTitle}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Teks Deskripsi Founder
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="aboutFounderText"
                  value={content.aboutFounderText}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Judul Section Sejarah (Sejak 2019)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="aboutSejakTitle"
                  value={content.aboutSejakTitle}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  Teks Deskripsi Sejarah
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="aboutSejakText"
                  value={content.aboutSejakText}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className="primary w-100 py-2 fs-5">
                Simpan Perubahan Konten
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Modal
        show={showSaveModal}
        onHide={() => setShowSaveModal(false)}
        title="Konfirmasi Simpan Konten"
        message="Apakah Anda yakin ingin menyimpan perubahan konten website ini?"
        confirmText="Ya, Simpan"
        cancelText="Batal"
        confirmClassName="btn btn-primary"
        cancelClassName="btn btn-outline-light"
        onConfirm={confirmSaveContent}
      />
      <Modal
        show={showResetModal}
        onHide={() => setShowResetModal(false)}
        title="Konfirmasi Reset Konten"
        message="Apakah Anda yakin ingin mengembalikan seluruh teks konten ke pengaturan awal (default)?"
        confirmText="Ya, Reset Default"
        cancelText="Batal"
        confirmClassName="btn btn-danger"
        cancelClassName="btn btn-outline-light"
        onConfirm={confirmResetContent}
      />
    </Row>
  );
}
