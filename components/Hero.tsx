"use client";

import Button from './Button';

type HeroProps = {
    videoSrc: string;
    title: string;
    sub: string;
    buttonText?: string;
    buttonLink?: string;
}

export default function Hero({videoSrc, title ="Title", sub = "Sub", buttonText ="Mulai", buttonLink ="content"}: HeroProps) {
    const scrollKeBawah = () => {
        document.getElementById(buttonLink)?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div className="hero position-relative">
            <div className="head-video">
                <video key={videoSrc} controls autoPlay loop muted>
                    <source src={videoSrc} type="video/mp4"/>
                </video>
            </div>
            <div className="hero-text position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center px-3">
                <h1>{title}</h1>
                <h3>{sub}</h3>
                <Button onClick={scrollKeBawah}>
                    {buttonText} <i className="fa-solid fa-circle-arrow-down"></i>
                </Button>
            </div>
        </div>
    )
}