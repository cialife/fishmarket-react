"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Akun untuk ${name} berhasil didaftarkan! Silakan login.`);
    router.push("/admin/login");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="shadow-sm border-0 p-4">
              <Card.Body>
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-dark">Registrasi Admin</h3>
                  <p className="text-muted">
                    Buat akun pengelola UMKM Muara Baru
                  </p>
                </div>

                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Alamat Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukkan email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Kata Sandi</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Buat kata sandi"
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
                    Daftar (Register)
                  </Button>

                  <div className="text-center">
                    <span className="text-muted small">Sudah punya akun? </span>
                    <a
                      href="/admin/login"
                      className="small text-decoration-none fw-bold"
                    >
                      Masuk di sini
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
