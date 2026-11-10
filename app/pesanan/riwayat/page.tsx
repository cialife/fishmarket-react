"use client";

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Link from "next/link";
import Title from "@/components/Title";
import Button from "@/components/Button";
import { getTransaksiList, Transaksi } from "@/lib/pesanan";
import { getCurrentUser } from "@/lib/auth";

export default function RiwayatPesananPage() {
  const [list, setList] = useState<Transaksi[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    const email = user?.email.toLowerCase();
    setList(
      email
        ? getTransaksiList().filter(
            (t) => t.pemesan?.email?.toLowerCase() === email,
          )
        : [],
    );
  }, []);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Menunggu":
        return (
          <Badge bg="warning" text="dark">
            Menunggu Konfirmasi
          </Badge>
        );
      case "Diproses":
        return (
          <Badge bg="info" text="dark">
            Diproses
          </Badge>
        );
      case "Dikirim":
        return <Badge bg="primary">Dalam Pengiriman</Badge>;
      case "Selesai":
        return <Badge bg="success">Selesai</Badge>;
      case "Dibatalkan":
        return <Badge bg="danger">Dibatalkan</Badge>;
      default:
        return <Badge bg="secondary">Selesai</Badge>;
    }
  };

  return (
    <>
      <title>Riwayat Pemesanan | Muara Baru</title>
      <Container className="py-5 mt-4">
        <Title
          title="Riwayat Pemesanan Pelanggan"
          sub="Pantau status transaksi dan riwayat pembelian ikan segar Anda."
        />

        {list.length === 0 ? (
          <Card className="text-center p-5 shadow-sm border-0 rounded-4">
            <Card.Body>
              <i className="fa-solid fa-folder-open fs-1 text-muted mb-3 d-block"></i>
              <h5>Belum ada riwayat pemesanan.</h5>
              <p className="text-muted">
                Ayo belanja ikan segar sekarang di katalog kami!
              </p>
              <Button href="/catalog" className="primary mt-2">
                Ke Katalog Produk
              </Button>
            </Card.Body>
          </Card>
        ) : (
          list.map((t) => (
            <Card
              key={t.id}
              className="mb-4 shadow-sm border-0 rounded-4 overflow-hidden"
            >
              <Card.Header className="bg-light text-dark d-flex justify-content-between align-items-center py-3 px-4">
                <div>
                  <span className="fw-bold text-dark me-2">No. #{t.id}</span>
                  <small className="text-secondary fw-semibold">| {t.tanggal}</small>
                </div>
                <div>{getStatusBadge(t.status)}</div>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="mb-3">
                  <strong className="text-dark">{t.pemesan?.nama}</strong> (
                  {t.pemesan?.email})
                  <br />
                  <small className="text-muted">
                    <i className="fa-solid fa-location-dot me-1"></i>
                    {t.pemesan?.alamat}
                  </small>
                </div>

                <Table
                  responsive
                  borderless
                  hover
                  size="sm"
                  className="align-middle mb-0"
                >
                  <thead className="table-light border-bottom">
                    <tr>
                      <th>Produk</th>
                      <th>Penyajian</th>
                      <th>Jumlah</th>
                      <th>Harga Satuan</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.items?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="fw-bold">{item.nama}</td>
                        <td>{item.penyajian}</td>
                        <td>{item.jumlah} kg</td>
                        <td>
                          Rp{" "}
                          {(
                            item.hargaSatuan ||
                            Math.round(item.total / item.jumlah)
                          ).toLocaleString("id-ID")}
                          /kg
                        </td>
                        <td className="text-end fw-bold">
                          Rp {item.total.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {t.items?.some((i) => i.catatan) && (
                  <div className="mt-3 p-2 bg-light rounded border">
                    <strong className="small text-dark d-block mb-1">
                      Catatan Pesanan:
                    </strong>
                    {t.items.map(
                      (item, idx) =>
                        item.catatan && (
                          <div key={idx} className="small text-muted ms-2">
                            • <strong>{item.nama}</strong>: {item.catatan}
                          </div>
                        ),
                    )}
                  </div>
                )}

                <hr className="my-3" />
                <div className="d-flex justify-content-between align-items-center fw-bold fs-5">
                  <span>Total Pembayaran</span>
                  <span className="text-primary">
                    Rp {t.total.toLocaleString("id-ID")}
                  </span>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}
