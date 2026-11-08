'use client';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfoCard from './InfoCard';

type InfoRowProps = {
  title: string;
  text: string;
  media: React.ReactNode;      // bebas isinya
  children?: React.ReactNode;  // tambahan di atas info (opsional)
  reverse?: boolean;
};

export default function InfoRow({
  title,
  text,
  media,
  children,
  reverse = false,
}: InfoRowProps) {
  return (
    <Row className={`g-4 align-items-stretch ${reverse ? 'flex-row-reverse' : ''}`}>
      <Col xs={12} md={6}>
        <div className="d-flex flex-column gap-4 h-100">
          {children}
          <div className="flex-grow-1 d-flex">
            <div className="w-100">
              <InfoCard title={title} text={text} />
            </div>
          </div>
        </div>
      </Col>

      <Col xs={12} md={6}>
        {media}
      </Col>
    </Row>
  );
}