"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertModal, setAlertModal] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginUser(email, password);
    if (result.success) {
      setAlertModal({
        show: true,
        title: "Berhasil",
        message: "Login berhasil! Selamat datang kembali.",
        success: true,
      });
    } else {
      setAlertModal({
        show: true,
        title: "Gagal",
        message: result.message ?? "Email atau password salah!",
        success: false,
      });
    }
  };

  const handleCloseAlert = () => {
    setAlertModal((prev) => ({ ...prev, show: false }));
    if (alertModal.success) router.push("/");
  };

  return (
    <>
    <title>Login | Muara Baru</title>
      <div className="auth-wrapper">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <h1 className="admin-brand-logo lost-fish">
              <i className="fa-solid fa-fish me-2"></i> Muara Baru
            </h1>
            <p className="admin-subtitle-text">
              Selamat datang kembali di Pasar Ikan Muara Baru.
            </p>
          </div>

          <div className="p-4 p-md-5">
            <h4 className="fw-bold text-center mb-4 text-dark roman">
              Masuk Pelanggan
            </h4>
            <form onSubmit={handleLogin}>
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
                  placeholder="Masukkan password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="primary w-100 py-2 fs-6">
                Masuk
              </Button>
            </form>

            <div className="text-center mt-4">
              <div className="mb-3">
                <span className="text-muted small">Belum punya akun? </span>
                <Link
                  href="/register"
                  className="text-primary fw-bold text-decoration-none small"
                >
                  Daftar sekarang
                </Link>
              </div>
              <hr className="opacity-25 my-3" />
              <Link
                href="/admin/login"
                className="text-danger fw-bold text-decoration-none small"
              >
                <i className="fa-solid fa-user-tie me-1"></i> Masuk sebagai
                Admin
              </Link>
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
        confirmClassName={
          alertModal.success ? "primary" : "primary"
        }
        hideCancel
        onConfirm={handleCloseAlert}
      />
    </>
  );
}
