"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { registerUser } from "@/lib/auth";
import Modal from "@/components/Modal";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [alertModal, setAlertModal] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerUser({ name, email, password, role: "customer" });
    if (result.success) {
      setAlertModal({
        show: true,
        title: "Berhasil",
        message: "Registrasi berhasil! Silakan login.",
        success: true,
      });
    } else {
      setAlertModal({
        show: true,
        title: "Gagal",
        message: result.message ?? "Registrasi gagal!",
        success: false,
      });
    }
  };

  const handleCloseAlert = () => {
    setAlertModal((prev) => ({ ...prev, show: false }));
    if (alertModal.success) {
      router.push("/login");
    }
  };

  return (
    <>
      <title>Register | Muara Baru</title>
      <div className="auth-wrapper">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <h1 className="admin-brand-logo lost-fish">
              <i className="fa-solid fa-fish me-2"></i> Muara Baru
            </h1>
            <p className="admin-subtitle-text">
              Bergabunglah dengan Pasar Ikan Muara Baru.
            </p>
          </div>

          <div className="p-4 p-md-5">
            <h4 className="fw-bold text-center mb-4 text-dark">
              Daftar Pelanggan
            </h4>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold text-dark">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Buat password baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="primary w-100 py-2 fs-6">
                Daftar Sekarang
              </Button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted mb-2 small">
                Sudah punya akun? Masuk sebagai:
              </p>
              <div className="d-flex justify-content-center gap-4">
                <Link
                  href="/login"
                  className="text-primary fw-bold text-decoration-none"
                >
                  <i className="fa-solid fa-user me-1"></i> Pelanggan
                </Link>
                <Link
                  href="/admin/login"
                  className="text-danger fw-bold text-decoration-none"
                >
                  <i className="fa-solid fa-user-tie me-1"></i> Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={alertModal.show}
        onHide={handleCloseAlert}
        title={alertModal.title}
        message={alertModal.message}
        confirmText="OK"
        confirmClassName="primary"
        hideCancel
        onConfirm={handleCloseAlert}
      />
    </>
  );
}
