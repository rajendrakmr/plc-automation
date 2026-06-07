"use client";


import { faqByCategory, privacySections } from "@/app/data/content";
import { useMemo, useState } from "react";

// type Category = "general" | "sourcing" | "shipping" | "warranty";

type Category = keyof typeof faqByCategory;
export default function PrivacyFaqSection() {

    const [activeTab, setActiveTab] = useState<Category>("Ordering");
    const [openIndex, setOpenIndex] = useState<number | null>(0); 
    const categories = useMemo(
        () => Object.keys(faqByCategory) as Category[],
        []
    ); 
    const activeFaqs = useMemo(
        () => faqByCategory[activeTab],
        [activeTab]
    );

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };





    return (
        <section className="faq-section">
            <div className="faq-inner">
                <div className="faq-left">
                    <span className="section-tag">
                        Got Questions?
                    </span>
                    <h2 className="faq-title">
                        Frequently Asked
                        <br />
                        <span className="faq-highlight">
                            Questions
                        </span>
                    </h2>
                    <p className="faq-sub">
                        Find quick answers to common questions about ordering, shipping, and product authenticity.
                    </p>
                    <div className="faq-contact-cards">
                        <a href="tel:+919876543210" className="faq-contact-card">
                            <div className="fcc-icon">
                                📞
                            </div>
                            <div className="fcc-text">
                                <strong>
                                    Call Us
                                </strong>
                                <span>
                                    +91 98765 43210
                                </span>
                            </div>
                        </a>
                        <a href="mailto:info@plcautomation.in" className="faq-contact-card">
                            <div className="fcc-icon">
                                ✉️
                            </div>
                            <div className="fcc-text">
                                <strong>
                                    Email Us
                                </strong>
                                <span>
                                    info@plcautomation.in
                                </span>
                            </div>
                        </a>

                    </div>

                </div>
                {/* RIGHT SIDE */}
                <div className="faq-right">

                    

                    {/* Accordion */}
                    <div className="faq-group active">
                        {privacySections.map((item, i) => (
                            <div
                                key={i}
                                className={`faq-item ${openIndex === i ? "active" : ""}`}
                            >
                                <button className="faq-q" onClick={() => toggleFaq(i)}>
                                    <span>{item.heading}</span>
                                    <span className="faq-icon">
                                        {openIndex === i ? "−" : "+"}
                                    </span>
                                </button>

                                <div
                                    className="faq-a"
                                    style={{
                                        maxHeight: openIndex === i ? "200px" : "0px",
                                    }}
                                >
                                    <p>{item.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
