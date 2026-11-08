"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { registerUser } from "@/lib/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerUser({ name, email, password, role: "customer" });
    if (result.success) {
      alert("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } else {
      alert(result.message);
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
            Bergabunglah dengan Pasar Ikan Muara Baru.
          </p>
        </div>

        {/* Body Putih dengan Teks Gelap */}
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

            {/* Tombol Gelap */}
            <Button type="submit" className="primary w-100 py-2 fs-6">
              Daftar Sekarang
            </Button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted">Sudah punya akun? </span>
            <Link
              href="/login"
              className="text-primary fw-bold text-decoration-none"
            >
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
