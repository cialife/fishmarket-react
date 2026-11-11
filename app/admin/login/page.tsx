"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
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

    const ADMIN_USERNAME = "adminmuarabaru";
    const ADMIN_PASSWORD = "Admin1234";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuth", "true");
      setAlertModal({
        show: true,
        title: "Berhasil",
        message: "Login Admin berhasil!",
        success: true,
      });
    } else {
      setAlertModal({
        show: true,
        title: "Gagal",
        message: "Username atau password admin salah!",
        success: false,
      });
    }
  };

  const handleCloseAlert = () => {
    setAlertModal((prev) => ({ ...prev, show: false }));
    if (alertModal.success) router.push("/admin");
  };
  
  return (
    <>
      <div className="auth-wrapper">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <h1 className="admin-brand-logo lost-fish">
              <i className="fa-solid fa-fish me-2"></i> Muara Baru
            </h1>
          </div>

          <div className="p-4 p-md-5">
            <h4 className="fw-bold text-center mb-4 text-dark">
              Masuk Dashboard
            </h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label fw-bold">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan username admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Masukkan password admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="primary w-100 py-2 fs-6">
                Masuk ke Dashboard
              </Button>
            </form>

            <div className="text-center mt-4">
              <div className="d-flex justify-content-center gap-4">
                <Link
                  href="/login"
                  className="text-primary fw-bold text-decoration-none"
                >
                  <i className="fa-solid fa-user me-1"></i>Masuk Sebagai
                  Pelanggan
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
        confirmClassName={
          alertModal.success ? "btn btn-primary" : "btn btn-danger"
        }
        hideCancel
        onConfirm={handleCloseAlert}
      />
    </>
  );
}
