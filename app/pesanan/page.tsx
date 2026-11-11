"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "@/components/Alert";
import Modal from "@/components/Modal";
import Title from "@/components/Title";
import Button from "@/components/Button";
import { getCurrentUser } from "@/lib/auth";
import {
  getPesanan,
  deletePesanan,
  clearPesanan,
  saveTransaksi,
  type Pesanan,
} from "@/lib/pesanan";

export default function PesananPage() {
  const router = useRouter();
  const [data, setData] = useState<Pesanan[]>([]);
  const [form, setForm] = useState({ nama: "", email: "", alamat: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    setData(getPesanan());
    const user = getCurrentUser();
    if (user) {
      setForm((f) => ({ ...f, nama: user.name, email: user.email }));
    }
  }, []);

  const ubah = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalSemua = data.reduce((sum, p) => sum + p.total, 0);

  const handleHapus = (id: number, namaProduk: string) => {
    deletePesanan(id);
    setData(getPesanan());
    setDeleteMessage(`Berhasil menghapus "${namaProduk}" dari pesanan.`);
    setTimeout(() => {
      setDeleteMessage("");
    }, 3000);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah form reload langsung
    if (data.length === 0) return;
    setShowConfirmModal(true);
  };

  const handleProsesKirim = () => {
    setShowConfirmModal(false);
    saveTransaksi({
      id: Date.now(),
      tanggal: new Date().toISOString(),
      pemesan: form,
      items: data,
      total: totalSemua,
      status: "Menunggu",
    });
    setIsSuccess(true);
    clearPesanan();

    setTimeout(() => {
      router.push("/struk");
    }, 1200);
  };

  return (
    <>
      <title>Pesanan | Muara Baru</title>
      <Container className="py-5">
        <Title
          title="ㆍ Pesanan Anda ㆍ"
          sub="Silahkan isi form pemesanan dengan lengkap."
        ></Title>
        {isSuccess && (
          <Alert
            message="Pesanan berhasil dikirim! Mengalihkan ke halaman struk..."
            variant="success"
          />
        )}

        {deleteMessage && (
          <Alert
            message={deleteMessage}
            variant="danger"
            onClose={() => setDeleteMessage("")}
          />
        )}
        <Row className="g-4">
          <Col xs={12} md={6}>
            <Form onSubmit={submitForm}>
              <Card className="p-3 shadow-sm">
                <Form.Group className="mb-3" controlId="nama">
                  <Form.Label className="fw-bold">Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan nama Anda"
                    name="nama"
                    value={form.nama}
                    onChange={ubah}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukkan email Anda"
                    name="email"
                    value={form.email}
                    onChange={ubah}
                    readOnly
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="alamat">
                  <Form.Label className="fw-bold">Alamat</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Masukkan alamat pengiriman"
                    name="alamat"
                    value={form.alamat}
                    onChange={ubah}
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  disabled={data.length === 0}
                  className="primary"
                >
                  <i className="fa-solid fa-paper-plane" /> Kirim Pesanan
                </Button>
              </Card>
            </Form>
          </Col>

          <Col xs={12} md={6}>
            {data.length === 0 && (
              <div className="alert alert-danger text-center fw-semibold py-4 border-0 rounded-4 shadow-sm">
                <i className="fa-solid fa-cart-arrow-down fs-2 d-block mb-2 text-danger"></i>
                Keranjang masih kosong. Pilih produk di katalog terlebih dahulu!
              </div>
            )}

            {data.map((p) => (
              <Card
                key={p.id}
                className="mb-3 shadow-sm overflow-hidden rounded-4"
              >
                <Row className="g-0 h-100">
                  <Col xs={4}>
                    <img
                      src={p.src}
                      alt={p.nama}
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  <Col xs={8} className="d-flex">
                    <Card.Body className="d-flex flex-column justify-content-between w-100">
                      <Card.Title>{p.nama}</Card.Title>
                      <p className="mb-1 text-muted">
                        {p.penyajian} · {p.jumlah} kg
                      </p>
                      <p className="fw-bold mb-0">
                        Rp {p.total.toLocaleString("id-ID")}
                      </p>
                      <div className="text-end mt-2">
                        <Button
                          className="mt-auto ms-auto primary min-btn"
                          onClick={() => handleHapus(p.id, p.nama)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}

            {data.length > 0 && (
              <div className="mb-5 border rounded-3 p-3 bg-white shadow-sm mt-3 d-flex justify-content-between align-items-center fw-bold fs-5">
                <span>Total</span>
                <span>Rp {totalSemua.toLocaleString("id-ID")}</span>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        title="Konfirmasi Pesanan"
        message={
          <div>
            <p className="mb-2">
              Apakah Anda yakin ingin mengirimkan pesanan ini?
            </p>
            <ul className="small text-muted mb-0">
              <li>Total Item: {data.length} jenis ikan</li>
              <li>
                Total Pembayaran:{" "}
                <strong>Rp {totalSemua.toLocaleString("id-ID")}</strong>
              </li>
            </ul>
          </div>
        }
        confirmText="Ya, Kirim Pesanan"
        cancelText="Batal"
        cancelClassName="btn btn-outline-light"
        confirmClassName="btn btn-success"
        onConfirm={handleProsesKirim}
      />
    </>
  );
}
