"use client";

import { Row, Col, Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export default function Dashboard() {
  const data = {
    labels: [
      "Jan '23",
      "Feb '23",
      "Mar '23",
      "Apr '23",
      "May '23",
      "Jun '23",
      "Jul '23",
    ],
    datasets: [
      {
        fill: true,
        label: "Ikan Air Asin",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        fill: true,
        label: "Ikan Air Tawar",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
    },
    scales: {
      x: { grid: { color: "rgba(0, 0, 0, 0.05)" } },
      y: { grid: { color: "rgba(0, 0, 0, 0.05)" } },
    },
  };

  return (
    <div className="admin-dashboard-container py-4">
      <h3 className="mb-4 fw-bold dashboard-title">Dashboard</h3>

      {/* Kartu Statistik Atas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="bg-info text-white shadow-sm mb-3 border-0">
            <Card.Body>
              <h6>Total Produk</h6>
              <h2 className="fw-bold">150</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="bg-success text-white shadow-sm mb-3 border-0">
            <Card.Body>
              <h6>Pengunjung Unik</h6>
              <h2 className="fw-bold">53%</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="bg-warning text-dark shadow-sm mb-3 border-0">
            <Card.Body>
              <h6>Pesan Masuk</h6>
              <h2 className="fw-bold">44</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="bg-danger text-white shadow-sm mb-3 border-0">
            <Card.Body>
              <h6>Laporan Baru</h6>
              <h2 className="fw-bold">65</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bagian Grafik & Produk */}
      <Row>
        <Col md={8}>
          <Card className="shadow-sm mb-4 border-0">
            <Card.Header className="bg-white fw-bold py-3">
              Laporan Penjualan (Bulanan)
            </Card.Header>
            <Card.Body>
              {/* Grafik Chart.js dipasang menggantikan placeholder teks sebelumnya */}
              <div className="chart-container">
                <Line data={data} options={options} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-4 border-0">
            <Card.Header className="bg-white fw-bold py-3">
              Produk Baru Ditambahkan
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled mb-0">
                <li className="border-bottom py-2 d-flex justify-content-between">
                  <span>Ikan Tuna</span>{" "}
                  <span className="text-success">Tersedia</span>
                </li>
                <li className="border-bottom py-2 d-flex justify-content-between">
                  <span>Ikan Tongkol</span>{" "}
                  <span className="text-success">Tersedia</span>
                </li>
                <li className="border-bottom py-2 d-flex justify-content-between">
                  <span>Ikan Lele</span>{" "}
                  <span className="text-danger">Habis</span>
                </li>
                <li className="pt-2 d-flex justify-content-between">
                  <span>Ikan Nila</span>{" "}
                  <span className="text-success">Tersedia</span>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
