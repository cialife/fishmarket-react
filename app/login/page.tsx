"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      sessionStorage.setItem("customerAuth", "true");
      router.push("/");
    } else {
      alert("Mohon masukkan email dan password yang valid.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="admin-login-box">
        {/* Header Gelap Senada dengan Admin */}
        <div className="admin-login-header">
          <h1 className="admin-brand-logo lost-fish">
            <i className="fa-solid fa-fish me-2"></i> Muara Baru
          </h1>
          <p className="admin-subtitle-text">
            Selamat datang kembali di Pasar Ikan Muara Baru.
          </p>
        </div>

        {/* Body Putih dengan Teks Gelap */}
        <div className="p-4 p-md-5">
          <h4 className="fw-bold text-center mb-4 text-dark">
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

            {/* Tombol Gelap */}
            <Button type="submit" className="primary w-100 py-2 fs-6">
              Masuk
            </Button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted">Belum punya akun? </span>
            <Link
              href="/register"
              className="text-primary fw-bold text-decoration-none"
            >
              Daftar sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
