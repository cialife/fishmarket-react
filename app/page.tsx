import Hero from "@/components/Hero";
import Button from "@/components/Button";
import Title from "@/components/Title";
import ImageGrid from "@/components/ImageGrid";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muara Baru | Beranda",
};

const image = [
  { src: "/images/pasar.jpg", alt: "Pasar" },
  { src: "/images/home1.jpg", alt: "Dalam Pasar" },
  { src: "/images/home2.jpg", alt: "Pasar" },
  { src: "/images/home3.jpg", alt: "Dalam Pasar" },
];
export default function HomePage() {
  return (
    <>
    <Hero videoSrc="/videos/home.mp4" title="Pasar Ikan Modern Muara Baru" sub="Segarnya tetap asli." buttonLink="content"/>
    <div className="container container-home" id="content">
      <Title title="ㆍ Temukan Ikan Terbaik ㆍ" sub="Hasil tangkapan segar dari nelayan setempat, langsung ke meja Anda."></Title>
      <Container className="pt-0 pb-5">
        <Row className="align-items-center g-5">
          <Col xs={12} md={6}>
            <div className="text">
              <h2>Ikan premium, harga jujur, segar setiap hari!</h2>
              <p>Siap untuk mencobanya? Jelajahi tangkapan harian kami yang dipilih secara cermat demi kualitas dan kesegarannya.</p>
              <Button href="/about">
                Jelajahi <i className="fa-solid fa-arrow-right-long"></i>
              </Button> 
            </div>
          </Col>
          <Col xs={12} md={6}>
            <ImageGrid images={image} />
          </Col>
        </Row>
      </Container>
    </div>
    </>
  )
}