"use client";

import { Row, Col, Card } from "react-bootstrap";

export default function DashboardV2() {
  return (
    <div>
      <h3 className="mb-4 fw-bold">Dashboard v2</h3>

      {/* BAGIAN 1: INFO BOXES (4 Kotak Warna-warni di atas) */}
      <Row className="mb-4">
        {/* Kotak 1: Total Produk */}
        <Col md={3}>
          <Card className="bg-info text-white shadow-sm mb-3 border-0">
            <Card.Body>
              <h6>Total Produk</h6>
              <h2 className="fw-bold">150</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Kotak 2: Pengunjung */}
        <Col md={3}>
          <Card className="bg-success text-white shadow-sm mb-3 border-0">
            <Card.Body>
              <h6>Pengunjung Unik</h6>
              <h2 className="fw-bold">53%</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Kotak 3: Pendaftar / User */}
        <Col md={3}>
          <Card className="bg-warning text-dark shadow-sm mb-3 border-0">
            <Card.Body>
              <h6>Pesan Masuk</h6>
              <h2 className="fw-bold">44</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Kotak 4: Laporan */}
        <Col md={3}>
          <Card className="bg-danger text-white shadow-sm mb-3 border-0">
            <Card.Body>
              <h6>Laporan Baru</h6>
              <h2 className="fw-bold">65</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* BAGIAN 2: AREA GRAFIK & TABEL TERBARU */}
      <Row>
        {/* Kolom Kiri yang Lebar (Untuk Grafik/Tabel Utama) */}
        <Col md={8}>
          <Card className="shadow-sm mb-4 border-0">
            <Card.Header className="bg-white fw-bold py-3">
              Laporan Penjualan (Bulanan)
            </Card.Header>
            <Card.Body>
              {/* Ini kotak abu-abu sebagai tempat dummy untuk Grafik nantinya */}
              <div
                className="d-flex align-items-center justify-content-center bg-light rounded"
                style={{ height: "250px" }}
              >
                <p className="text-muted mb-0">
                  Area Grafik (Bisa dipasang Chart.js ke depannya)
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Kolom Kanan yang Kecil (Untuk Daftar Singkat) */}
        <Col md={4}>
          <Card className="shadow-sm mb-4 border-0">
            <Card.Header className="bg-white fw-bold py-3">
              Produk Baru Ditambahkan
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled mb-0">
                <li className="border-bottom py-2 d-flex justify-content-between">
                  <span>🐟 Ikan Tuna Segar</span>{" "}
                  <span className="text-success">Tersedia</span>
                </li>
                <li className="border-bottom py-2 d-flex justify-content-between">
                  <span>🦐 Udang Windu</span>{" "}
                  <span className="text-success">Tersedia</span>
                </li>
                <li className="border-bottom py-2 d-flex justify-content-between">
                  <span>🦑 Cumi-cumi Besar</span>{" "}
                  <span className="text-danger">Habis</span>
                </li>
                <li className="pt-2 d-flex justify-content-between">
                  <span>🦀 Kepiting Bakau</span>{" "}
                  <span className="text-success">Tersedia</span>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
