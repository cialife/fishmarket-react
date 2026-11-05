"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAdminLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Kredensial akun khusus admin
    if (username === "adminmuarabaru" && password === "Admin1234") {
      sessionStorage.setItem("adminAuth", "true");
      router.push("/admin");
    } else {
      setError("Username atau Password Admin salah!");
    }
  };

  return (
    <div className="container-home admin-login-wrapper d-flex justify-content-center align-items-center">
      <div className="admin-login-card card p-4 shadow">
        <h2
          className="admin-login-title text-center mb-4"
        >
          Admin Portal
        </h2>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleAdminLogin}>
          <div className="mb-3">
            <label className="form-label">Username Admin</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" className="button w-100">
            Masuk ke Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}
