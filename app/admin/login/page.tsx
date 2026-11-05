"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation"; // Wajib di-import agar 'router' bisa dipakai

export default function AdminLogin() {
  // 1. Deklarasikan state email di sini agar tidak error "Cannot find name 'email'"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Deklarasikan router di sini agar tidak error "Cannot find name 'router'"
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simpan status login ke browser
    localStorage.setItem("admin_logged_in", "true");

    alert(`Selamat datang kembali, ${email}!`);
    router.push("/admin");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="shadow-sm border-0 p-4">
              <Card.Body>
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-dark">Admin Login</h3>
                  <p className="text-muted">
                    UMKM Pasar Ikan Modern Muara Baru
                  </p>
                </div>

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Alamat Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukkan email admin"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Mengisi state email
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Kata Sandi</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Masukkan kata sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="dark"
                    type="submit"
                    className="w-100 py-2 mb-3"
                  >
                    Masuk (Login)
                  </Button>

                  <div className="text-center">
                    <span className="text-muted small">
                      Belum punya akun admin?{" "}
                    </span>
                    <a
                      href="/admin/register"
                      className="small text-decoration-none fw-bold"
                    >
                      Daftar di sini
                    </a>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
