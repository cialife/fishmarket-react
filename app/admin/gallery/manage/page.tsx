"use client";

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

import {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/lib/gallery";
import { GalleryItem } from "@/app/data/dataGallery";

export default function ManageGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  // State Modal Form (Tambah/Edit)
  const [showFormModal, setShowFormModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // State Modal Konfirmasi Hapus
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    title: string;
  } | null>(null);

  // State Modal Notifikasi Sukses (Tambah/Edit)
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    desc: "",
    type: "photo" as "photo" | "video",
    src: "",
  });

  useEffect(() => {
    setItems(getGalleryItems());
  }, []);

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ title: "", desc: "", type: "photo", src: "" });
    setShowFormModal(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      desc: item.desc,
      type: item.type,
      src: item.src,
    });
    setShowFormModal(true);
  };

  const openDeleteModal = (id: number, title: string) => {
    setDeleteTarget({ id, title });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      const updated = deleteGalleryItem(deleteTarget.id);
      setItems(updated);
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleSubmit = () => {
    if (!form.title || !form.src || !form.desc) {
      return;
    }

    if (editId) {
      updateGalleryItem({
        id: editId,
        ...form,
        previewSrc: form.type === "video" ? form.src : undefined,
      });
      setSuccessMessage(`Galeri "${form.title}" berhasil diperbarui!`);
    } else {
      addGalleryItem({
        ...form,
        previewSrc: form.type === "video" ? form.src : undefined,
      });
      setSuccessMessage(`Galeri "${form.title}" berhasil ditambahkan!`);
    }

    setItems(getGalleryItems());
    setShowFormModal(false); // Tutup Form Modal
    setShowSuccessModal(true); // Buka Modal Sukses
  };

  return (
    <>
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-dark mb-0">
              <i className="fa-solid fa-images me-2"></i> Kelola Galeri
            </h4>
            <Button
              onClick={handleOpenAdd}
              className="btn btn-primary rounded-3"
            >
              <i className="fa-solid fa-plus me-1"></i> Tambah Galeri
            </Button>
          </div>

          <Table responsive hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Preview</th>
                <th>Judul</th>
                <th>Tipe</th>
                <th>Deskripsi</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.type === "photo" ? (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="img-thumb-md"
                      />
                    ) : (
                      <span className="badge bg-dark">
                        <i className="fa-solid fa-video me-1"></i> Video
                      </span>
                    )}
                  </td>
                  <td className="fw-bold">{item.title}</td>
                  <td>
                    <span
                      className={`badge bg-${item.type === "photo" ? "info" : "warning"} text-dark`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td>{item.desc}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        onClick={() => handleOpenEdit(item)}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                      </Button>
                      <Button
                        onClick={() => openDeleteModal(item.id, item.title)}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="fa-solid fa-trash me-1"></i> Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        title={editId ? "Edit Galeri" : "Tambah Galeri Baru"}
        confirmText="Simpan"
        cancelText="Batal"
        confirmClassName="btn btn-primary"
        cancelClassName="btn btn-secondary"
        onConfirm={handleSubmit}
        message={
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Judul</Form.Label>
              <Form.Control
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Tipe</Form.Label>
              <Form.Select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as any })
                }
              >
                <option value="photo">Foto</option>
                <option value="video">Video</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">
                URL / Path Media
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  form.type === "photo"
                    ? "/images/gallery/nama.png"
                    : "https://www.youtube.com/embed/..."
                }
                required
                value={form.src}
                onChange={(e) => setForm({ ...form, src: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">
                Deskripsi Singkat
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                required
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </Form.Group>
          </Form>
        }
      />

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Konfirmasi Hapus Galeri"
        message={`Apakah Anda yakin ingin menghapus galeri "${deleteTarget?.title}"?`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        confirmClassName="btn btn-danger"
        cancelClassName="btn btn-outline-light"
        onConfirm={confirmDelete}
      />

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title="Berhasil"
        message={successMessage}
        confirmText="OK"
        cancelText="Tutup"
        confirmClassName="btn btn-success"
        cancelClassName="btn btn-outline-light"
        onConfirm={() => setShowSuccessModal(false)}
      />
    </>
  );
}
