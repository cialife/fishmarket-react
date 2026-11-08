"use client";
import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { getProduk, deleteProduk } from "@/lib/produk";

export default function ManageProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setProducts(getProduk());
  }, []);

  const handleDelete = (id: number, nama: string) => {
    if (confirm(`Yakin ingin menghapus ikan "${nama}" dari katalog?`)) {
      const updated = deleteProduk(id);
      setProducts(updated);
    }
  };

  return (
    <Card className="shadow-sm border-0 rounded-4">
      <Card.Body className="p-4">
        <h4 className="fw-bold mb-4 text-dark">
          <i className="fa-solid fa-list me-2"></i> Kelola Produk Katalog
        </h4>
        <Table responsive hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "80px" }}>Foto</th>
              <th>Nama Ikan</th>
              <th>Kategori</th>
              <th>Harga / Kg</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  {/* MEMAKAI CLASS CSS EKSTERNAL .img-thumb-md */}
                  <img src={p.src} alt={p.nama} className="img-thumb-md" />
                </td>
                <td className="fw-bold">{p.nama}</td>
                <td>{p.kategori}</td>
                <td>Rp {p.harga.toLocaleString("id-ID")}</td>
                <td className="text-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(p.id, p.nama)}
                  >
                    <i className="fa-solid fa-trash me-1"></i> Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
