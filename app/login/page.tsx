"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (email && password) {
      sessionStorage.setItem("customerAuth", "true");
      // Arahkan ke Halaman Utama (Homepage)
      router.push("/");
    } else {
      alert("Mohon masukkan email dan password yang valid.");
    }
  };

  return (
    <div
      className="container-home login-wrapper d-flex justify-content-center align-items-center"
    >
      <div
        className="login-card card p-4 shadow"
      >
        <h2
          className="login-title text-center mb-4"
        >
          Masuk Pelanggan
        </h2>
        <p className="login-subtitle text-center mb-4">
          Selamat datang kembali di Pasar Ikan Muara Baru.
        </p>

        <form onSubmit={handleLogin}>
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
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="login-button button w-100 mb-3 text-center"
          >
            Masuk
          </button>
        </form>

        <div className="text-center mt-3">
          <span>Belum punya akun? </span>
          <Link
            href="/register" className="login-link"
          >
            Daftar sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
