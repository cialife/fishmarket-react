"use client";
import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { getProduk, deleteProduk, resetProduk } from "@/lib/produk";
import Modal from "@/components/Modal";
import { open } from "node:inspector/promises";

export default function ManageProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    nama: string;
  } | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    setProducts(getProduk());
  }, []);

  const openDeleteModal = (id: number, nama: string) => {
    setDeleteTarget({ id, nama });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      const updated = deleteProduk(deleteTarget.id);
      setProducts(updated);
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const confirmReset = () => {
    setProducts(resetProduk());
    setShowResetModal(false);
  };

  return (
    <>
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0 text-dark">
              <i className="fa-solid fa-list me-2"></i>
              <span className="roman">Kelola Produk Katalog</span>
            </h4>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill"
                onClick={() => setShowResetModal(true)}
              >
                <i className="fa-solid fa-rotate-left me-1"></i> Reset Produk
                Katalog ke Default
              </button>
            </div>
          </div>
          <Table responsive hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>Foto</th>
                <th>Nama Ikan</th>
                <th>Kategori</th>
                <th>Harga / Kg</th>
                <th>Deskripsi</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.src} alt={p.nama} className="img-thumb-md" />
                  </td>
                  <td className="fw-bold">{p.nama}</td>
                  <td>{p.kategori}</td>
                  <td>Rp {p.harga.toLocaleString("id-ID")}</td>
                  <td
                    className="text-muted"
                    style={{
                      maxWidth: "300px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      textAlign: "justify",
                      lineHeight: "1.5",
                    }}
                  >
                    <span className="text-muted d-inline-block">
                      {p.desc || "-"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        href={`/admin/products/edit/${p.id}`}
                        variant="warning"
                        size="sm"
                      >
                        <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openDeleteModal(p.id, p.nama)}
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
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Konfirmasi Hapus Produk"
        message={`Apakah Anda yakin ingin menghapus ikan "${deleteTarget?.nama}" dari katalog?`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        confirmClassName="primary"
        cancelClassName="btn btn-outline-light"
        onConfirm={confirmDelete}
      />

      <Modal
        show={showResetModal}
        onHide={() => setShowResetModal(false)}
        title="Konfirmasi Reset Produk Katalog"
        message="Semua perubahan produk katalog akan dihapus dan dikembalikan ke data awal. Lanjutkan?"
        confirmText="Ya, Reset"
        cancelText="Batal"
        confirmClassName="primary"
        onConfirm={confirmReset}
      />
    </>
  );
}
