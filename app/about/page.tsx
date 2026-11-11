"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Title from "@/components/Title";
import SplitCard from "@/components/SplitCard";
import InfoRow from "@/components/InfoRow";
import InfoCard from "@/components/InfoCard";
import Stars from "@/components/Stars";
import Container from "react-bootstrap/Container";
import reviews from "@/app/data/dataReviews";
import { getContent, getDefaultContent } from "@/lib/content";

export default function AboutPage() {
  const [content, setContent] = useState(getDefaultContent());

  useEffect(() => {
    setContent(getContent());

    const handleUpdate = () => {
      setContent(getContent());
    };
    window.addEventListener("contentUpdated", handleUpdate);
    return () => window.removeEventListener("contentUpdated", handleUpdate);
  }, []);

  return (
    <>
      <title>Tentang Kami | Muara Baru</title>
      <Hero
        videoSrc="/videos/about.mp4"
        title={content.aboutTitle}
        sub={content.aboutSub}
        buttonLink="content"
        buttonText="Jelajahi"
      />
      <div className="container container-about" id="content">
        <Title title={content.aboutTitle2} sub={content.aboutSub2}></Title>
        <Container className="pt-0 pb-5">
          <div className="mb-5">
            <SplitCard
              title={content.aboutFounderTitle}
              text={content.aboutFounderText}
              media={<img src="/images/about/founder.png" alt="Founder" />}
            />
          </div>
          <div className="mb-5">
            <InfoRow
              title={content.aboutSejakTitle}
              text={content.aboutSejakText}
              media={
                <div className="rounded-4 overflow-hidden">
                  <iframe
                    width="500"
                    height="440"
                    src="https://www.youtube.com/embed/hMSDl9XTfsw?si=lcSrBSL1koSjG_xC"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              }
            />
          </div>
          <div className="mb-5">
            <SplitCard
              title={content.aboutLokasiTitle}
              text={content.aboutLokasiText}
              media={
                <div className="video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.468942518381!2d106.79919612867481!3d-6.110149710591734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d57ecac3297%3A0x2224c497a4988394!2sPasar%20Ikan%20Modern%20Muara%20Baru!5e0!3m2!1sen!2sid!4v1790328288938!5m2!1sen!2sid"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
              }
            />
          </div>
          <Title
            title="ㆍ Kata Mereka Tentang Kami ㆍ"
            sub="Apa kata mereka tentang Pasar Ikan Modern Muara Baru."
          ></Title>
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
  );
}
