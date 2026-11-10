"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Badge } from "react-bootstrap";
import { getUsers } from "@/lib/auth";
import { getProduk } from "@/lib/produk";
import { getTransaksiList, Transaksi } from "@/lib/pesanan";
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
  const [totalOmset, setTotalOmset] = useState(0);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [transaksiList, setTransaksiList] = useState<Transaksi[]>([]);

  useEffect(() => {
    setTotalUser(getUsers().length);

    const allProducts = getProduk();
    setRecentProducts(allProducts.slice(-4).reverse());

    const tList = getTransaksiList();
    setTransaksiList(tList);
    setTotalOrder(tList.length);

    // Hitung total omset
    const omset = tList.reduce((sum, t) => sum + (t.total || 0), 0);
    setTotalOmset(omset);
  }, []);

  const chartData = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Ikan Air Asin (Kg)",
        data: [8, 12, 10, 15, 14, 20, 18],
        backgroundColor: "rgba(0, 119, 182, 0.8)",
        borderRadius: 4,
      },
      {
        label: "Ikan Air Tawar (Kg)",
        data: [4, 7, 5, 10, 8, 10, 10],
        backgroundColor: "rgba(40, 167, 69, 0.8)",
        borderRadius: 4,
      },
    ],
  };

  return (
    <div>
      <Row className="mb-4 g-3">
        <Col md={3} sm={6}>
          <Card className="shadow-sm border-0 bg-primary text-white h-100 rounded-4">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
              <i className="fa-solid fa-users fs-1 mb-2"></i>
              <h6 className="fw-light mb-1">Total Pelanggan</h6>
              <h3 className="fw-bold mb-0">{totalUser}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6}>
          <Card className="shadow-sm border-0 bg-success text-white h-100 rounded-4">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
              <i className="fa-solid fa-box-open fs-1 mb-2"></i>
              <h6 className="fw-light mb-1">Total Katalog</h6>
              <h3 className="fw-bold mb-0">{getProduk().length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6}>
          <Card className="shadow-sm border-0 bg-danger text-white h-100 rounded-4">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
              <i className="fa-solid fa-cart-shopping fs-1 mb-2"></i>
              <h6 className="fw-light mb-1">Pesanan Baru</h6>
              <h3 className="fw-bold mb-0">{totalOrder}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6}>
          <Card className="shadow-sm border-0 bg-info text-white h-100 rounded-4">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
              <i className="fa-solid fa-wallet fs-1 mb-2"></i>
              <h6 className="fw-light mb-1">Total Omset</h6>
              <h5 className="fw-bold mb-0">
                Rp {totalOmset.toLocaleString("id-ID")}
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm border-0 rounded-4 mb-4 mb-md-0 h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3 text-dark">
                Grafik Penjualan (Air Asin vs Air Tawar)
              </h5>
              <div className="w-100" style={{ height: "280px" }}>
                <Bar
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3 text-dark">Baru Ditambahkan</h5>
              <div className="d-flex flex-column gap-3">
                {recentProducts.map((p) => (
                  <div
                    key={p.id}
                    className="d-flex align-items-center border-bottom pb-2"
                  >
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

      <Row>
        <Col xs={12}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3 text-dark">
                <i className="fa-solid fa-receipt me-2"></i> Daftar Pesanan
                Masuk
              </h5>
              {transaksiList.length === 0 ? (
                <p className="text-muted text-center py-3 mb-0">
                  Belum ada pesanan masuk dari pelanggan.
                </p>
              ) : (
                <Table responsive hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>No Pesanan</th>
                      <th>Pelanggan</th>
                      <th>Menu / Produk Dipilih</th>
                      <th>Total Pembayaran</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaksiList.map((t) => (
                      <tr key={t.id}>
                        <td className="fw-bold text-primary">#{t.id}</td>
                        <td>
                          <div className="fw-bold">
                            {t.pemesan?.nama || "Tanpa Nama"}
                          </div>
                          <small className="text-muted">
                            {t.pemesan?.email || "-"}
                          </small>
                        </td>
                        <td>
                          <ul className="list-unstyled mb-0 small">
                            {t.items?.map((item, idx) => (
                              <li key={idx}>
                                • <strong>{item.nama}</strong> ({item.penyajian}
                                ) x {item.jumlah} kg
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="fw-bold text-success">
                          Rp {(t.total || 0).toLocaleString("id-ID")}
                        </td>
                        <td className="text-center">
                          <Badge bg="success" className="px-2 py-1">
                            {t.status || "Selesai"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
