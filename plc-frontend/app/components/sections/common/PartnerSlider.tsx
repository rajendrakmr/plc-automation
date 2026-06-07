'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Search, Clock, Globe, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function BrandSlider() {

    interface Slide {
        id: number;
        image: string;
        title: string;
    }

    // ─── Slide data ───────────────────────────────────────────────────────────────
    const SLIDES: Slide[] = [
        {
            id: 1,
            image: "/assets/client/1.jpeg",
            title: "Siemens"

        },
        {
            id: 2,
            image: "/assets/client/2.jpeg",
            title: "ABB"
        },
        {
            id: 3,
            image: "/assets/client/3.jpeg",
            title: "Mitsubishi"
        },
        {
            id: 4,
            image: "/assets/client/8.jpeg",
            title: "Schneider Electric"
        },
        {
            id: 5,
            image: "/assets/client/5.jpeg",
            title: "Omron"
        },
        {
            id: 6,
            image: "/assets/client/6.jpeg",
            title: "Yaskawa"
        },


    ]
    return (
        <section className="section brands-section" style={{ 'overflow': 'hidden' }}>
            <div className="section-inner">
                <div className="section-header">
                    <div>
                        {/* <span className="section-tag">
                         Trusted by 
                        </span> */}
                        <h2 className="section-title">
                           Trusted by 
                        </h2>
                        {/* <p className="section-sub">
                            We stock and source parts from every major automation manufacturer worldwide.
                        </p> */}
                    </div>
                    
                </div>
            </div>
            {/* Marquee Track — full bleed */}
            <div className="brands-slider-outer">
                <div className="brands-track" id="brands-track">
                    {
                        SLIDES.map((slide) => (
                            <div className="bs-item" key={slide.id}>
                                <div className="bs-logo">
                                    <Image width={200} height={100} src={slide.image} alt={slide.title} />
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </section>

    );
}