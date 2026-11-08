import Hero from "@/components/Hero";
import Button from "@/components/Button";
import Title from "@/components/Title";
import SplitCard from "@/components/SplitCard";
import InfoRow from "@/components/InfoRow";
import InfoCard from "@/components/InfoCard";
import Stars from "@/components/Stars";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import reviews from "@/app/data/dataReviews";

export default function AboutPage() {
  return (
    <>
    <title>Tentang Kami | Muara Baru</title>
    <Hero videoSrc="/videos/about.mp4" title="Cerita di Balik Pasar Ikan Muara Baru" sub="Perjalanan menjadi pasar ikan terpercaya." buttonLink="content" buttonText="Jelajahi"/>
    <div className="container container-about" id="content">
      <Title title="ㆍ Kenali Pasar Ikan Kami ㆍ" sub="Kami percaya hasil laut berkualitas berawal dari kepercayaan, kebersihan, harga jujur, dan penanganan yang baik."></Title>
      <Container className="pt-0 pb-5">
        <div className="mb-5">
            <SplitCard
                title="Founder Pasar Ikan Modern Muara Baru"
                text="Pada 13 Maret 2019, pasar kami resmi diresmikan oleh Joko Widodo, didampingi oleh Menteri Kelautan dan Perikanan serta sejumlah pejabat pemerintah lainnya. Dibangun di bawah Kementerian Kelautan dan Perikanan, fasilitas modern ini dirancang untuk menghadirkan standar perdagangan hasil laut yang lebih bersih dan berkelas dunia bagi masyarakat lokal."
                media={<img src="/images/about/founder.png" alt="Founder" />}
            />
        </div>
        <div className="mb-5">
            <InfoRow 
                title="Sejak 2019"
                text="Apa yang dimulai pada tahun 2019 sebagai babak baru bagi Muara Baru, kini telah berkembang menjadi tempat terpercaya untuk mendapatkan hasil laut yang segar dan berkualitas. Dibangun dengan mengutamakan standar modern, pasar kami terus menghargai kerja keras para nelayan lokal sekaligus menghadirkan pengalaman yang lebih bersih dan nyaman bagi setiap pengunjung."
                media = {
                    <div className="rounded-4 overflow-hidden">
                        <iframe width="500" height="440" src="https://www.youtube.com/embed/hMSDl9XTfsw?si=lcSrBSL1koSjG_xC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
                    </div>
                }
            />
        </div>
        <div className="mb-5">
            <SplitCard
                title="Kami Buka 24 Jam"
                text="Temukan kami di Muara Baru, Penjaringan, Jakarta Utara, di kawasan pesisir yang telah menjadi pusat industri perikanan selama beberapa generasi. Lokasi kami dekat dengan pelabuhan dan mudah dijangkau, sehingga Anda dapat menikmati hasil laut segar langsung dari nelayan lokal."
                media={
                    <div className="video">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.468942518381!2d106.79919612867481!3d-6.110149710591734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d57ecac3297%3A0x2224c497a4988394!2sPasar%20Ikan%20Modern%20Muara%20Baru!5e0!3m2!1sen!2sid!4v1790328288938!5m2!1sen!2sid" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                    </div>
                }
            />
        </div>
        <Title title="ㆍ Kata Mereka Tentang Kami ㆍ" sub="Apa kata mereka tentang Pasar Ikan Modern Muara Baru."></Title>
        <div className="review-scroll mb-5">
            {reviews.map((r) => (
                <InfoCard
                    key={r.name}
                    className="review-card"
                    icon={<i className="fa-solid fa-comment-dots"></i>}
                    extra={<Stars rating={r.rating} />}
                    title={`${r.name} (${r.year})`}
                    text={r.text}
                />
            ))}
        </div>
      </Container>
    </div>
    </>
  )
}