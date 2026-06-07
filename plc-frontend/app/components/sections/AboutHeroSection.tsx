"use client";

import Image from "next/image";

export default function AboutHeroSection() {
    return (
       <section className="section_white_content">
         <div className="abtHero">
            <div className="abtHero-wrapper">

                {/* Mobile Image */}
                <div className="abtHero-mobile">
                    <Image
                        src="https://assets.euautomation.com/img/2022/banner/mobile-about-us-static.jpg"
                        alt="clipboard"
                        width={1200}
                        height={700}
                        priority
                        className="abtHero-image"
                    />
                </div>

                {/* Desktop / Laptop Video */}
                <div className="abtHero-desktop">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="https://assets.euautomation.com/img/2022/banner/mobile-about-us-static.jpg"
                        className="abtHero-video"
                    >
                        <source
                            src="https://assets.euautomation.com/img/2022/about-us/euautomation-website-about-us-banner.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>

                {/* Overlay */}
                <div className="abtHero-overlay">
                    <p className="abtHero-subtitle">
                        Our Mission
                    </p>

                    <h1 className="abtHero-title">
                        To supply the manufacturing world with
                        industry-leading parts, service and speed.
                    </h1>
                </div>

            </div>
        </div>
       </section>
    );
}