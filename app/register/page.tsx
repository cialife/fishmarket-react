"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    // Simulasi menyimpan data pelanggan ke database
    console.log("Data Pendaftaran Pelanggan:", {
      name,
      email,
      password,
      role: "customer",
    });
    alert("Registrasi berhasil! Silakan login.");

    // Arahkan pelanggan ke halaman login setelah daftar
    router.push("/login");
  };

  return (
    <div className="container-home auth-wrapper d-flex justify-content-center align-items-center">
      <div className="auth-card card p-4 shadow">
        <h2 className="auth-title text-center mb-4">Daftar Akun Baru</h2>
        <p
          className="auth-subtitle text-center mb-4"
        >
          Bergabung untuk mendapatkan ikan segar setiap hari.
        </p>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Nama Lengkap</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Konfirmasi Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="auth-button button w-100 mb-3 text-center"
          >
            Daftar Sekarang
          </button>
        </form>

        <div className="text-center mt-3">
          <span>Sudah punya akun? </span>
          <Link
            href="/login" className="auth-link"
          >
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
