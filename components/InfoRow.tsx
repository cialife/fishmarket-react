'use client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfoCard from './InfoCard';

type InfoRowProps = {
    title: string;
    text: string;
    media: React.ReactNode; // bebas isinya
    reverse?: boolean;
};

export default function InfoRow({ title, text, media, reverse = false }: InfoRowProps) {
  return (
    <Container>
      <Row className={`align-items-center ${reverse ? 'flex-row-reverse' : ''}`}>
        <Col xs={12} md={6}>
            <InfoCard title={title} text={text} />
        </Col>
        <Col xs={12} md={6}>
          {media}
        </Col>
      </Row>
    </Container>
  );
}