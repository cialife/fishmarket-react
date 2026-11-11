"use client";

import React, { useState, useEffect } from "react";
import { Card, Table, Form } from "react-bootstrap";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import {
  getKategori,
  addKategori,
  updateKategori,
  deleteKategori,
  KategoriItem,
} from "@/lib/kategori";

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<KategoriItem[]>([]);

  // State Modal Form (Tambah / Edit)
  const [showFormModal, setShowFormModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [namaInput, setNamaInput] = useState("");

  // State Modal Konfirmasi Hapus
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<KategoriItem | null>(null);

  // State Modal Notifikasi Sukses
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setCategories(getKategori());
  }, []);

  const handleOpenAdd = () => {
    setEditId(null);
    setNamaInput("");
    setShowFormModal(true);
  };

  const handleOpenEdit = (item: KategoriItem) => {
    setEditId(item.id);
    setNamaInput(item.nama);
    setShowFormModal(true);
  };

  const openDeleteModal = (item: KategoriItem) => {
    setDeleteTarget(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      const updated = deleteKategori(deleteTarget.id);
      setCategories(updated);
      setSuccessMessage(`Kategori "${deleteTarget.nama}" berhasil dihapus!`);
      setShowSuccessModal(true);
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleSubmit = () => {
    if (!namaInput.trim()) return;

    if (editId) {
      const updated = updateKategori(editId, namaInput.trim());
      setCategories(updated);
      setSuccessMessage(`Kategori "${namaInput}" berhasil diperbarui!`);
    } else {
      const updated = addKategori(namaInput.trim());
      setCategories(updated);
      setSuccessMessage(`Kategori "${namaInput}" berhasil ditambahkan!`);
    }

    setShowFormModal(false);
    setShowSuccessModal(true);
  };

  return (
    <>
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-dark mb-0">
              <i className="fa-solid fa-tags me-2"></i>
              <span className="roman">Kelola Kategori Produk</span>
            </h4>
            <Button
              onClick={handleOpenAdd}
              className="btn btn-primary rounded-3"
            >
              <i className="fa-solid fa-plus me-1"></i> Tambah Kategori
            </Button>
          </div>

          <Table responsive hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>No</th>
                <th>Nama Kategori</th>
                <th className="text-center" style={{ width: "200px" }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{item.nama}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        onClick={() => handleOpenEdit(item)}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                      </Button>
                      <Button
                        onClick={() => openDeleteModal(item)}
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
        title={editId ? "Edit Kategori" : "Tambah Kategori Baru"}
        confirmText="Simpan Kategori"
        cancelText="Batal"
        confirmClassName="primary"
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
              <Form.Label className="fw-bold text-dark">
                Nama Kategori
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Contoh: Udang & Kepiting"
                required
                value={namaInput}
                onChange={(e) => setNamaInput(e.target.value)}
              />
            </Form.Group>
          </Form>
        }
      />

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Konfirmasi Hapus Kategori"
        message={`Apakah Anda yakin ingin menghapus kategori "${deleteTarget?.nama}"?`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        confirmClassName="primary"
        cancelClassName="btn btn-outline-light"
        onConfirm={confirmDelete}
      />

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title="Pemberitahuan"
        message={successMessage}
        confirmText="OK"
        confirmClassName="primary"
        cancelClassName="btn btn-outline-light"
        onConfirm={() => setShowSuccessModal(false)}
      />
    </>
  );
}
