"use client";

import Image from "next/image";

const brands = [
    {
        name: "Unilever",
        logo: "/assets/client-logo/1.webp",
    },
    {
        name: "Pepisco",
        logo: "/assets/client-logo/2.webp",
    },
    {
        name: "Cococola",
        logo: "/assets/client-logo/3.webp",
    },
    {
        name: "Beach",
        logo: "/assets/client-logo/26.webp",
    },
    {
        name: "Vopak",
        logo: "/assets/client-logo/27.webp",
    },
    {
        name: "Givaudan",
        logo: "/assets/client-logo/28.webp",
    },
    {
        name: "Princes",
        logo: "/assets/client-logo/4.webp",
    },
    {
        name: "SSMC",
        logo: "/assets/client-logo/5.webp",
    },
    {
        name: "YTL Powerseraya",
        logo: "/assets/client-logo/6.webp",
    },
    {
        name: "BW Epic Kosan",
        logo: "/assets/client-logo/7.webp",
    },
    {
        name: "SLNG Singapore LNG",
        logo: "/assets/client-logo/8.webp",
    },
    {
        name: "Exon Mobil",
        logo: "/assets/client-logo/9.webp",
    },
    {
        name: "Lotte",
        logo: "/assets/client-logo/10.webp",
    },
    {
        name: "Velesto Energy",
        logo: "/assets/client-logo/11.webp",
    },
    {
        name: "Air Liquide",
        logo: "/assets/client-logo/12.webp",
    },
    {
        name: "POSH",
        logo: "/assets/client-logo/13.webp",
    },
    {
        name: "VIs",
        logo: "/assets/client-logo/14.webp",
    },
    {
        name: "Lycra",
        logo: "/assets/client-logo/15.webp",
    },
    {
        name: "Sph Media",
        logo: "/assets/client-logo/16.webp",
    },
    {
        name: "Keppel",
        logo: "/assets/client-logo/17.webp",
    },
    {
        name: "PSA",
        logo: "/assets/client-logo/18.webp",
    },
    {
        name: "Sapura Energy",
        logo: "/assets/client-logo/19.webp",
    },
    {
        name: "DEME",
        logo: "/assets/client-logo/20.webp",
    },
    {
        name: "Pecific Light",
        logo: "/assets/client-logo/21.webp",
    },
    {
        name: "Tptus Power",
        logo: "/assets/client-logo/22.webp",
    },
    {
        name: "SBS Transit",
        logo: "/assets/client-logo/23.webp",
    },
    {
        name: "SMRT",
        logo: "/assets/client-logo/24.webp",
    },
    {
        name: "GSK",
        logo: "/assets/client-logo/25.webp",
    },
    {
        name: "MPA-Engineering",
        logo: "/assets/client-logo/MPA-Engineering-PLCAutomation-Client.webp",
    },
    {
        name: "Systronix-Australia",
        logo: "/assets/client-logo/Systronix-Australia-PLCAutomation-Client.webp",
    },
];

export default function BrandPartnerSection() {
    return (
        <section className="section_grey_content">
            <div className="trusted-container section_container"> 
                <div className="trusted-content">
                    <h2 className="trusted-title">
                        544,268 parts to 37,261 customers in 10+ countries
                    </h2>

                    <p className="trusted-desc">
                        Machines break and downtime can cost businesses millions in lost
                        revenue. PLC Automation gives you access to the global supply of
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