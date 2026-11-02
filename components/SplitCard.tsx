'use client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from "react-bootstrap";

type SplitCardProps = {
    title: string;
    text: string;
    media: React.ReactNode; // bebas isinya
    reverse?: boolean;
};

export default function SplitCardRow({ title, text, media, reverse = false }: SplitCardProps) {
  return (
    <Container>
      <Row className={`split-card align-items-center ${reverse ? 'flex-row-reverse' : ''}`}>
        <Col xs={12} md={6} className="split-media">
            {media}
        </Col>
        <Col xs={12} md={6} className="split-body">
        <Card className="split-info h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <div className="split-icon"><h2>✦ · ✦ · ✦</h2></div>
              <h2>{title}</h2>
              <hr />
              <p>{text}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}