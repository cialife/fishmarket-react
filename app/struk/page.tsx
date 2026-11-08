"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "@/components/Button";
import { getTransaksi, type Transaksi } from "@/lib/pesanan";

export default function StrukPage() {
  const [t, setT] = useState<Transaksi | null>(null);
  const [siap, setSiap] = useState(false);
  const [printMessage, setPrintMessage] = useState("");

  useEffect(() => {
    setT(getTransaksi());
    setSiap(true);
  }, []);

  const handlePrint = () => {
    setPrintMessage("Menyiapkan dokumen struk untuk dicetak...");
    
    setTimeout(() => {
      setPrintMessage("");
      window.print();
    }, 1500);
  };

  if (!siap) return null;

  if (!t) {
    return (
      <Container className="py-5 text-center">
        <p>Belum ada struk.</p>
        <Link href="/pesanan">Ke halaman pesanan</Link>
      </Container>
    );
  }

  return (
    <>
        <title>Struk | Muara Baru</title>
        <Container className="py-5 mt-5" style={{ maxWidth: "480px" }}>
            {printMessage && (
            <Alert variant="success" className="text-center mb-3 fw-semibold border-0 shadow-sm d-print-none">
            {printMessage}
            </Alert>
        )}
            <Card className="p-4 shadow-sm">
                <div className="text-center mb-3">
                <h4 className="mb-0 lost-fish"><i className="fa-solid fa-fish"/> MUARA BARU</h4>
                <small>Pasar Ikan Modern Muara Baru</small>
                <div className="mt-2 text-muted">
                    <small>No. {t.id}</small>
                    <br />
                    <small>{t.tanggal}</small>
                </div>
                </div>

                <hr className="w-100 my-3" style={{ borderTop: "2px dashed #000", opacity: 1 }} />

                <div className="mb-3">
                    <div>
                        <strong>{t.pemesan.nama}</strong>
                    </div>
                    <div>{t.pemesan.email}</div>
                    <div>{t.pemesan.alamat}</div>
                </div>

                <hr className="w-100 my-3" style={{ borderTop: "2px dashed #000", opacity: 1 }} />

                <Table size="sm" borderless className="mb-0">
                    <tbody>
                        {t.items.map((p) => (
                        <tr key={p.id}>
                            <td>
                            {p.nama}
                            <br />
                            <small className="text-muted">
                                {p.penyajian} x {p.jumlah} kg
                            </small>
                            </td>
                            <td className="text-end align-top">Rp {p.total.toLocaleString("id-ID")}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>

                <hr className="w-100 my-3" style={{ borderTop: "2px dashed #000", opacity: 1 }} />

                <div className="d-flex justify-content-between fw-bold fs-5">
                    <span>TOTAL</span>
                    <span>Rp {t.total.toLocaleString("id-ID")}</span>
                </div>

                <p className="text-center mt-4 mb-0">Terima kasih atas pesanan Anda!</p>
            </Card>

            <div className="d-flex justify-content-end gap-2 mb-5 no-print">
                <Button className="primary min-btn" href="/pesanan">
                    <i className="fa-solid fa-arrow-left"></i> Kembali
                </Button>
                <Button className="primary" onClick={() => handlePrint()}>
                    <i className="fa-solid fa-download"></i> Cetak Struk
                </Button>
            </div>
        </Container>
    </>
  );
}