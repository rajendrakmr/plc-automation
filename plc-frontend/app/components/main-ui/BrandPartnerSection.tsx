"use client";

import Image from "next/image";

const brands = [
    {
        name: "3M",
        logo: "/assets/client-logo/1.webp",
    },
    {
        name: "Volvo",
        logo: "/assets/client-logo/2.webp",
    },
    {
        name: "Rolls Royce",
        logo: "/assets/client-logo/3.webp",
    },
    {
        name: "Princes",
        logo: "/assets/client-logo/4.webp",
    },
    {
        name: "Nestle",
        logo: "/assets/client-logo/5.webp",
    },
    {
        name: "Rolls Royce",
        logo: "/assets/client-logo/6.webp",
    },
    {
        name: "Princes",
        logo: "/assets/client-logo/7.webp",
    },
    {
        name: "Nestle",
        logo: "/assets/client-logo/8.webp",
    },
    {
        name: "Rolls Royce",
        logo: "/assets/client-logo/9.webp",
    },
    {
        name: "Princes",
        logo: "/assets/client-logo/10.webp",
    }, 
    {
        name: "Princes",
        logo: "/assets/client-logo/11.webp",
    }, 
    {
        name: "Princes",
        logo: "/assets/client-logo/12.webp",
    }, 
    {
        name: "Princes",
        logo: "/assets/client-logo/13.webp",
    }, 
    {
        name: "Princes",
        logo: "/assets/client-logo/14.webp",
    }, 
    {
        name: "Princes",
        logo: "/assets/client-logo/15.webp",
    }, 
     {
        name: "Princes",
        logo: "/assets/client-logo/16.webp",
    }, 
    {
        name: "Princes",
        logo: "/assets/client-logo/17.webp",
    }, 
    {
        name: "Princes",
        logo: "/assets/client-logo/18.webp",
    }, 
    {
        name: "Princes",
        logo: "/assets/client-logo/19.webp",
    }, 
    {
        name: "Princes",
        logo: "/assets/client-logo/20.webp",
    },
    {
        name: "Princes",
        logo: "/assets/client-logo/21.webp",
    },
    {
        name: "Princes",
        logo: "/assets/client-logo/22.webp",
    },
    {
        name: "Princes",
        logo: "/assets/client-logo/23.webp",
    },
    {
        name: "Princes",
        logo: "/assets/client-logo/24.webp",
    },  
];

export default function BrandPartnerSection() {
    return (
        <section className="section_grey_content">
            <div className="trusted-container section_container">

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