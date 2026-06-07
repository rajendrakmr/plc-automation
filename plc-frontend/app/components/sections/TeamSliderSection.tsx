"use client";
import { useEffect, useState } from "react";

export default function TeamSliderSection() {
    const data = [
        {
            quote:
                "With over a decade in the electrical and instrumentation (E&I) sector, Krish or fondly known as John, leads strategic growth and innovation at PLC Automation Group. He’s key in helping our clients source obsolete and hard-to-find automation parts from brands like Allen Bradley, ABB, Mitsubishi, Siemens, Schneider and more. His industry knowledge supports businesses in sectors such as oil & gas, marine, power, manufacturing, and more to secure critical automation spare parts globally.",
            name: "Krish (John)",
            role: "Managing Director | Strategy & Innovation | Business Development - Singapore",
            image: "/assets/about-us/neeran.jpeg",
        },
        {
            quote:
                "Jerry drives PLC Automation Group’s growth across the Australian and New Zealand industrial automation markets. With a strong background supporting global brands, he specializes in sourcing and supplying both new and obsolete automation spare parts for key sectors including mining, energy, food & beverage, dairy, and heavy manufacturing. He brings deep expertise in managing complex procurement requirements for leading brands such as Siemens, Schneider Electric, Allen-Bradley, and others. Jerry is passionate about helping industries across Australia and New Zealand access reliable, high-quality, and cost-effective automation solutions to keep their operations running at peak performance.",
            name: "Jerry",
            role: "Business Development – Australia & New Zealand",
            image: "/assets/about-us/soni.jpeg",
        },
        {
            quote:
                "Neeran brings strong leadership to her role as Head of Organisational Excellence. She ensures operational readiness in delivering industrial automation spares and managing MRO logistics. With expertise in governance and compliance, Neeran drives PLC’s precision and regulatory readiness while maintaining agility in the automation supply chain, aligning services with customer needs across Southeast Asia, Australia, and beyond.",
            name: "Neeran",
            role: "Technical Procurement | Finance | Compliance",
            image: "/assets/about-us/sam.jpeg",
        },
        {
            quote:
                "Sam builds strong client relationships while managing accounts across key markets. With deep product knowledge of automation spares, PLC components, and OEM spare parts, he supports urgent procurement needs for brands like Fuji Electric, Omron, Beckhoff and more. His customer-first approach ensures businesses get the right parts fast—helping reduce costly downtime in manufacturing and automation environments across Southeast Asia and beyond.",
            name: "Sam",
            role: "Senior Account Manager",
            image: "/assets/about-us/sam.jpeg",
        },
    ];

    const [index, setIndex] = useState(0);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % data.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const item = data[index];

    return (
        <section className="section">
            <div className="section-inner">
                <h2 className="section-title">
                    Meet Our Team
                </h2>
                <div className="section-inner team-flex">

                    {/* LEFT */}
                    <div className="team-left">
                        <div className="quote-icon">“</div>


                        <div className="team-author">
                            <h4>{item.name}</h4>
                            <span>{item.role}</span>
                        </div>
                        <p key={index} className="section-hub">
                            {item.quote}
                        </p>
                        {/* DOTS */}
                        <div className="team-dots">
                            {data.map((_, i) => (
                                <span
                                    key={i}
                                    className={i === index ? "active" : ""}
                                    onClick={() => setIndex(i)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="team-right">
                        <div className="team-image-wrap">
                            <img
                                key={index}
                                src={item.image}
                                alt={item.name}
                                className="team-image fade"
                            />


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}