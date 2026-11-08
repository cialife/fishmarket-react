"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { getUsers } from "@/lib/auth";
import { getProduk } from "@/lib/produk";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function AdminDashboard() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    setTotalUser(getUsers().length);
    
    const allProducts = getProduk();
    // Ambil maksimal 4 produk terbaru
    setRecentProducts(allProducts.slice(-4).reverse());

    const transaksiList = JSON.parse(localStorage.getItem("transaksi") || "[]");
    const activePesanan = JSON.parse(localStorage.getItem("pesanan") || "[]");
    setTotalOrder(
      transaksiList.length > 0 ? transaksiList.length : activePesanan.length,
    );
  }, []);

  const chartData = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Ikan Air Asin (Kg)",
        data: [8, 12, 10, 15, 14, 20, 18],
        backgroundColor: "rgba(0, 119, 182, 0.8)", // Biru Laut
        borderRadius: 4,
      },
      {
        label: "Ikan Air Tawar (Kg)",
        data: [4, 7, 5, 10, 8, 10, 10],
        backgroundColor: "rgba(40, 167, 69, 0.8)", // Hijau Tawar
        borderRadius: 4,
      },
    ],
  };

  return (
    <div>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 bg-primary text-white h-100 rounded-4">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
              <i className="fa-solid fa-users fs-1 mb-2"></i>
              <h5 className="fw-light">Total Pelanggan Terdaftar</h5>
              <h1 className="fw-bold">{totalUser}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 bg-success text-white h-100 rounded-4">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
              <i className="fa-solid fa-box-open fs-1 mb-2"></i>
              <h5 className="fw-light">Total Produk Katalog</h5>
              <h1 className="fw-bold">{getProduk().length}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 bg-danger text-white h-100 rounded-4">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
              <i className="fa-solid fa-cart-shopping fs-1 mb-2"></i>
              <h5 className="fw-light">Pesanan Baru</h5>
              <h1 className="fw-bold">{totalOrder}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="shadow-sm border-0 rounded-4 mb-4">
            <Card.Body>
              <h5 className="fw-bold mb-4 text-dark">
                Grafik Penjualan Terakhir
              </h5>
              <div className="w-100" style={{ height: "300px" }}>
                <Bar
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body>
              <h5 className="fw-bold mb-3 text-dark">Baru Ditambahkan</h5>
              <div className="d-flex flex-column gap-3">
                {recentProducts.map((p) => (
                  <div
                    key={p.id}
                    className="d-flex align-items-center border-bottom pb-2"
                  >
                    {/* IMPLEMENTASI CLASS CSS .admin-recent-img DI SINI */}
                    <img
                      src={p.src}
                      alt={p.nama}
                      className="admin-recent-img me-3"
                    />

                    <div>
                      <h6 className="mb-0 fw-bold">{p.nama}</h6>
                      <small className="text-muted">
                        Rp {p.harga.toLocaleString("id-ID")}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
