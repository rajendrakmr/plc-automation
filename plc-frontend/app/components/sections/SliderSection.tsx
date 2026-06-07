"use client";

import { useEffect, useState } from "react";

const DURATION = 4500;
const slidesData = [
    {
        id: 1,
        image: "/assets/engineering-services-1.jpg",
        badge1: "Siemens S7 Series",
        badge2: "In Stock Now",
        tag: "PLC Controllers",
        title: "Siemens SIMATIC S7 Range",
        desc: "S7-200, S7-300, S7-400, S7-1200, S7-1500 — new & refurbished.",
        cta: "Browse Siemens Parts →",
    },
    {
        id: 2,
        image:  "/assets/engineering-services-2.jpg",
        badge1: "Allen Bradley",
        badge2: "Genuine Stock",
        tag: "ControlLogix",
        title: "Allen Bradley Rockwell Parts",
        desc: "1756, 1769, 1747 series PLC modules.",
        cta: "Browse AB Parts →",
    },
    {
        id: 3,
        image:  "/assets/engineering-services-3.jpg",
        badge1: "ABB Drives",
        badge2: "Fast Delivery",
        tag: "Drives & Inverters",
        title: "ABB Drive Solutions",
        desc: "ACS550, ACS800, ACS880 complete systems.",
        cta: "Browse ABB Drives →",
    },
    {
        id: 4,
        image:  "/assets/engineering-services-4.jpg",
        badge1: "Fanuc",
        badge2: "CNC & Robotics",
        tag: "CNC Controllers",
        title: "Fanuc CNC & Servo Parts",
        desc: "A06B servo drives, motors & boards.",
        cta: "Browse Fanuc Parts →",
    },
];
export default function SliderSection() {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);

    const totalSlides = 4;

    // 🔁 Auto slide
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % totalSlides);
            setProgress(0);
        }, DURATION);

        return () => clearInterval(timer);
    }, []);

    // 📊 Progress bar
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + 100 / (DURATION / 60);
            });
        }, 60);

        return () => clearInterval(interval);
    }, [current]);

    const goSlide = (n: number) => {
        setCurrent((n + totalSlides) % totalSlides);
        setProgress(0);
    };

    const slideImg = (dir: number) => {
        goSlide(current + dir);
    };

    return (
        <div className="split-slider-wrap">

            {/* Slides */}
            <div className="img-slider">
                {slidesData.map((item, i) => (


                    <div
                        key={item.id}
                        className={`img-slide ${current === i ? "active" : ""}`}
                    >
                        {/* Image */}
                        <img src={item.image} alt={item.title} className="slide-img" />


                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="slider-controls">
                <button className="sl-btn" onClick={() => slideImg(-1)}>←</button>

                <div className="sl-dots">
                    {[0, 1, 2, 3].map((i) => (
                        <span
                            key={i}
                            className={`sl-dot ${current === i ? "active" : ""}`}
                            onClick={() => goSlide(i)}
                        />
                    ))}
                </div>

                <button className="sl-btn" onClick={() => slideImg(1)}>→</button>
            </div>

            {/* Progress */}
            <div className="sl-progress">
                <div
                    className="sl-progress-bar"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}