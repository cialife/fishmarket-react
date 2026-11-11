"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Card, Row, Col, Table, Form } from "react-bootstrap";
import { getUsers, deleteUser, User } from "@/lib/auth";
import { getProduk } from "@/lib/produk";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import {
  getTransaksiList,
  updateTransaksiStatus,
  deleteTransaksi,
  Transaksi,
} from "@/lib/pesanan";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState<number | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [targetUser, setTargetUser] = useState<User | null>(null);

  useEffect(() => {
    const users = getUsers().filter((u) => u.role !== "admin");
    setUserList(users);
    setTotalUser(users.length);
    setRecentProducts(getProduk().slice(-4).reverse());

    setTotalUser(getUsers().length);
    const allProducts = getProduk();
    setRecentProducts(allProducts.slice(-4).reverse());
    refreshTransaksi();
  }, []);

  const refreshTransaksi = () => {
    const tList = getTransaksiList();
    setTransaksiList(tList);
    setTotalOrder(tList.length);

    const omset = tList.reduce((sum, t) => sum + (t.total || 0), 0);
    setTotalOmset(omset);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateTransaksiStatus(id, newStatus);
    refreshTransaksi();
  };

  const openDeleteModal = (id: number) => {
    setTargetDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteTransaksi = () => {
    if (targetDeleteId) {
      deleteTransaksi(targetDeleteId);
      refreshTransaksi();
    }
    setShowDeleteModal(false);
    setTargetDeleteId(null);
  };

  const openDeleteUserModal = (user: User) => {
    setTargetUser(user);
    setShowDeleteUserModal(true);
  };

  const handleDeleteUser = () => {
    if (targetUser) {
      deleteUser(targetUser.email);
      const users = getUsers().filter((u) => u.role !== "admin");
      setUserList(users);
      setTotalUser(users.length);
    }
    setShowDeleteUserModal(false);
    setTargetUser(null);
  };

  const getStatusBootstrapClass = (status: string) => {
    switch (status) {
      case "Menunggu":
        return "bg-warning text-dark";
      case "Diproses":
        return "bg-info text-dark";
      case "Dikirim":
        return "bg-primary text-white";
      case "Selesai":
        return "bg-success text-white";
      case "Dibatalkan":
        return "bg-danger text-white";
      default:
        return "bg-light text-dark";
    }
  };

  const WARNA = [
    "rgba(0, 119, 182, 0.8)",
    "rgba(40, 167, 69, 0.8)",
    "rgba(255, 193, 7, 0.8)",
    "rgba(220, 53, 69, 0.8)",
    "rgba(111, 66, 193, 0.8)",
    "rgba(253, 126, 20, 0.8)",
  ];

  const chartData = useMemo(() => {
    const produkList = getProduk();

    // Daftar kategori dari produk (unik) + dari transaksi, supaya kategori lama tetap tampil
    const kategoriSet = new Set<string>();
    produkList.forEach((p) => p.kategori && kategoriSet.add(p.kategori));
    transaksiList.forEach((t) =>
      t.items?.forEach((i) => i.kategori && kategoriSet.add(i.kategori)),
    );
    const kategoriList = Array.from(kategoriSet);

    // Siapkan 7 hari untuk tiap kategori
    const totals: Record<string, number[]> = {};
    kategoriList.forEach((k) => (totals[k] = Array(7).fill(0)));

    const now = new Date();
    const offset = (now.getDay() + 6) % 7;
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - offset,
    );
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    transaksiList.forEach((t) => {
      if ((t.status || "Selesai") !== "Selesai") return;
      if (!t.tanggal) return;
      const tgl = new Date(t.tanggal);
      if (isNaN(tgl.getTime())) return;
      if (tgl < startOfWeek || tgl >= endOfWeek) return;
      const idx = (tgl.getDay() + 6) % 7;

      t.items?.forEach((item) => {
        if (!item.kategori || !totals[item.kategori]) return;
        totals[item.kategori][idx] += Number(item.jumlah) || 0;
      });
    });

    return {
      labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
      datasets: kategoriList.map((k, i) => ({
        label: `${k} (Kg)`,
        data: totals[k],
        backgroundColor: WARNA[i % WARNA.length],
        borderRadius: 4,
      })),
    };
  }, [transaksiList]);

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
              <h5 className="fw-bold mb-3 text-dark roman">Grafik Penjualan</h5>
              <div className="w-100" style={{ height: "280px" }}>
                <Bar
                  data={chartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: { beginAtZero: true, ticks: { precision: 0 } },
                    },
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3 text-dark roman">Baru Ditambahkan</h5>
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
                <i className="fa-solid fa-receipt me-2"></i>
                <span className="roman">Daftar Pesanan Masuk</span>
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
                      <th>Harga Satuan</th>
                      <th>Total Pembayaran</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaksiList.map((t) => {
                      const currentStatus = t.status || "Selesai";
                      return (
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
                                  • <strong>{item.nama}</strong> (
                                  {item.penyajian}) x {item.jumlah} kg
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul className="list-unstyled mb-0 small">
                              {t.items?.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="mb-1 text-info fw-bold"
                                >
                                  Rp{" "}
                                  {(item.hargaSatuan || 0).toLocaleString(
                                    "id-ID",
                                  )}{" "}
                                  / kg
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="fw-bold text-success">
                            Rp {(t.total || 0).toLocaleString("id-ID")}
                          </td>
                          <td className="text-center">
                            <Form.Select
                              size="sm"
                              value={currentStatus}
                              onChange={(e) =>
                                handleStatusChange(t.id, e.target.value)
                              }
                              className={`fw-bold text-center ps-4 shadow-sm ${getStatusBootstrapClass(currentStatus)}`}
                            >
                              <option
                                value="Menunggu"
                                className="bg-light text-center ps-0 text-dark"
                              >
                                Menunggu
                              </option>
                              <option
                                value="Diproses"
                                className="bg-light text-center ps-0 text-dark"
                              >
                                Diproses
                              </option>
                              <option
                                value="Dikirim"
                                className="bg-light text-center ps-0 text-dark"
                              >
                                Dikirim
                              </option>
                              <option
                                value="Selesai"
                                className="bg-light text-center ps-0 text-dark"
                              >
                                Selesai
                              </option>
                              <option
                                value="Dibatalkan"
                                className="bg-light text-center ps-0 text-dark"
                              >
                                Dibatalkan
                              </option>
                            </Form.Select>
                          </td>
                          <td className="text-center">
                            <Button
                              className="btn btn-danger btn-sm d-inline-flex align-items-center gap-1 px-3 py-1 fw-bold"
                              onClick={() => openDeleteModal(t.id)}
                            >
                              <i className="fa-solid fa-trash me-1"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3 text-dark">
                <i className="fa-solid fa-users me-2"></i>
                <span className="roman">Daftar Pelanggan</span>
              </h5>
              {userList.length === 0 ? (
                <p className="text-muted text-center py-3 mb-0">
                  Belum ada pelanggan terdaftar.
                </p>
              ) : (
                <Table responsive hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "60px" }}>No</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((u, i) => (
                      <tr key={u.email}>
                        <td>{i + 1}</td>
                        <td className="fw-bold">{u.name}</td>
                        <td>{u.email}</td>
                        <td className="text-center">
                          <Button
                            className="btn btn-danger btn-sm d-inline-flex align-items-center gap-1 px-3 py-1 fw-bold"
                            onClick={() => openDeleteUserModal(u)}
                          >
                            <i className="fa-solid fa-trash me-1"></i> Hapus
                          </Button>
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

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Konfirmasi Hapus Pesanan"
        message={`Apakah Anda yakin ingin menghapus pesanan #${targetDeleteId}?`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        confirmClassName="primary"
        cancelClassName="btn btn-danger"
        onConfirm={handleDeleteTransaksi}
      />

      <Modal
        show={showDeleteUserModal}
        onHide={() => setShowDeleteUserModal(false)}
        title="Konfirmasi Hapus Pelanggan"
        message={`Apakah Anda yakin ingin menghapus pelanggan "${targetUser?.name}" (${targetUser?.email})?`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        confirmClassName="primary"
        cancelClassName="btn btn-danger"
        onConfirm={handleDeleteUser}
      />
    </div>
  );
}
