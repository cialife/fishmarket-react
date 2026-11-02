import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type ImageGridProps = {
    images: {
        src: string;
        alt: string;
    }[]; // Array image dengan object src, alt
    cols?: number;
    fit?: "cover" | "contain";
}
export default function ImageGrid({images, cols = 2, fit = "cover"}: ImageGridProps) {
  return (
    <Row xs={1} md={cols} className="g-3">
        {images.map((img) => (
            <Col key={img.src}>
                <img src={img.src} alt={img.alt} className={`img-fluid rounded-4 image image-${fit}`} />
            </Col>
        ))}
    </Row>
  );
}