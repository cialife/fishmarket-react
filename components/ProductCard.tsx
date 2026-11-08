"use client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from './Button';
import { ProductItem, PENYAJIAN } from '@/app/data/dataProduct';
import { addPesanan } from '@/lib/pesanan';
import { useState } from 'react';

type ProductCardProps = ProductItem & {
  onAddSuccess?: () => void;
};

function ProductCard({ nama, kategori, harga, desc, src, onAddSuccess }: ProductCardProps) {
  const [show, setShow] = useState(false);
  const [penyajian, setPenyajian] = useState<string>(PENYAJIAN[0].value);
  const [qty, setQty] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setPenyajian(PENYAJIAN[0].value); // Reset olahan ke default saat membuka modal
    setQty(1); // Reset qty ke 1 saat membuka modal
  };

  const pilihan = PENYAJIAN.find((p) => p.value == penyajian)!;
  const hargaSatuan = harga + pilihan.tambahan;
  const total = hargaSatuan * qty;

  const handlePesanan = () => {
    addPesanan({
      id: Date.now(),
      nama: nama,
      src: src,
      penyajian: pilihan.label,
      jumlah: qty,
      total: total,
    });

    if (onAddSuccess) {
      onAddSuccess();
    }
    handleClose();
  };

  const renderAddTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Tambah jumlah pesanan
    </Tooltip>
  );

  const renderMinTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Kurangi jumlah
    </Tooltip>
  );

  const renderSubmitTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Simpan di menu pesanan
    </Tooltip>
  );

  return (
    <Container>
      <Card className="product-card rounded-4 shadow-sm">
        <Card.Img variant="top" src={src} alt={nama} />
        <Card.Body>
            <p className="text-muted">{kategori}</p>
            <Card.Title className="product-name roman">{nama}</Card.Title>
            <p className="fw-bold product-price">Rp {harga.toLocaleString("id-ID")}/kg</p>
            <div className="justify-content-center">
              <Button onClick={handleShow} className="primary w-100">Beli</Button>
            </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="roman text-center w-100"><i className="fa-solid fa-fish"/> {nama}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
              <Form.Label className="fw-bold"><h5>Pilih Penyajian</h5></Form.Label>
              {PENYAJIAN.map((p) => (
                <div 
                  key={p.value} 
                  className="d-flex justify-content-between align-items-center w-100 mb-2 cursor-pointer"
                  onClick={() => setPenyajian(p.value)}
                  style={{ cursor: "pointer" }}
                >
                <Form.Check
                  type="radio"
                  id={`penyajian-${nama}-${p.value}`}
                  name={`penyajian-${nama}`}
                  label={p.label}
                  checked={penyajian === p.value}
                  onChange={() => setPenyajian(p.value)}
                />
                <span className="fw-bold text-muted">
                  {p.tambahan > 0 ? `+Rp ${p.tambahan.toLocaleString("id-ID")}` : "+ Rp 0"}
                </span>
              </div>
            ))}
            <Form.Group className="mt-3">
              <Form.Label className="fw-bold">Jumlah (kg)</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderMinTooltip}
                >
                  <div>
                    <Button className="primary add-btn roman" onClick={() => setQty(Math.max(1, qty - 1))}>
                    -
                    </Button>
                  </div>
                </OverlayTrigger>
                <div className="box w-100 align-items-center d-flex justify-content-center">
                  <div className="qty-box">
                    <span className="fw-bold w-100 text-center" style={{ fontSize: "1.2rem" }}> 
                      {qty}
                    </span>
                  </div>
                </div>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderAddTooltip}
                >
                  <div>
                    <Button className="primary add-btn fw-bold roman" onClick={() => setQty(qty + 1)}>
                      +
                    </Button>
                  </div>
                </OverlayTrigger>
              </div>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-between mt-4">
              <span>Harga per kg</span>
              <span>Rp. {hargaSatuan.toLocaleString("id-ID")}</span>
          </div>
          <div className ="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>Rp. {total.toLocaleString("id-ID")}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderSubmitTooltip}
        >
          <div className="w-100">
            <Button onClick={handlePesanan} className="primary w-100">
              Tambah pesanan
            </Button>
          </div>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductCard;