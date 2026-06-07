"use client";

import Image from "next/image";

const brands = [
    {
        name: "3M",
        logo: "/assets/client/1.jpeg",
    },
    {
        name: "Volvo",
        logo: "/assets/client/2.jpeg",
    },
    {
        name: "Rolls Royce",
        logo: "/assets/client/3.jpeg",
    },
    {
        name: "Princes",
        logo: "/assets/client/6.jpeg",
    },
    {
        name: "Nestle",
        logo: "/assets/client/5.jpeg",
    },
];

export default function BrandTrustedSection() {
    return (
        <section className="trusted-section bg_gray_light">
            <div className="trusted-container">

                {/* TOP CONTENT */}
                <div className="trusted-content">
                    <h2 className="trusted-title">
                        3,973,616 parts to 95,327 customers in 176 countries
                    </h2>

                    <p className="trusted-desc">
                        Machines break and downtime can cost businesses millions in lost
                        revenue. EU Automation gives you access to the global supply of
                        automation parts, ensuring that manufacturers worldwide can keep
                        production lines up and running.
                    </p>
                </div>

                {/* BRANDS */}
                <div className="trusted-brands"> 
                    <div className="brands-grid">
                        {brands.map((brand) => (
                            <div className="brand-item" key={brand.name}>
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={180}
                                    height={80}
                                    className="brand-logo"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}