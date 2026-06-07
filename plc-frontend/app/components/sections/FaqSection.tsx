"use client";


import { faqByCategory } from "@/app/data/content";
import Image from "next/image";
import { useMemo, useState } from "react";

// type Category = "general" | "sourcing" | "shipping" | "warranty";

type Category = keyof typeof faqByCategory;
export default function FaqSection() {
    const [activeTab, setActiveTab] = useState<Category>("Ordering");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // ✅ Memoized categories
    const categories = useMemo(
        () => Object.keys(faqByCategory) as Category[],
        []
    );

    // ✅ Memoized active FAQ list
    const activeFaqs = useMemo(
        () => faqByCategory[activeTab],
        [activeTab]
    );

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };





    return (
      <section className="section_grey_content">
          <div className="section_container faq-section" style={{paddingTop:"0px"}}>
            <div className="faq-inner">
                <div className="faq-left">
                    <h2 className="faq-title">
                        Frequently Asked Questions
                    </h2>
                    <p className="faq-sub">
                        Find quick answers to common questions about ordering, shipping, and product authenticity.
                    </p>
                    <div className="faq-contact-cards">
                        <a href="tel:+65 6980 8259" className="faq-contact-card">
                            <div className="">
                                <Image
                                    src="/assets/Icons/phone-plcautomationgroup.png"
                                    alt="Phone Icon"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="fcc-text">
                                <strong>
                                    USA: Call Us
                                </strong>
                                <span>
                                    +65 6980 8259
                                </span>
                            </div>
                        </a>
                        <a href="mailto:sales@plcautomat.com" className="faq-contact-card">
                            <div className="">
                                <Image
                                    src="/assets/Icons/email-plcautomationgroup.png"
                                    alt="Email Icon"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="fcc-text">
                                <strong>
                                    Email Us
                                </strong>
                                <span>
                                    sales@plcautomat.com
                                </span>
                            </div>
                        </a>
                        <a href="tel:+61 421 000 214" className="faq-contact-card">
                            <div className="">
                                <Image
                                    src="/assets/Icons/phone-plcautomationgroup.png"
                                    alt="Phone Icon"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="fcc-text">
                                <strong>
                                    AU: Call Us
                                </strong>
                                <span>
                                    +61 421 000 214
                                </span>
                            </div>
                        </a>

                    </div>

                </div>
                {/* RIGHT SIDE */}
                <div className="faq-right">
                    {/* Accordion */}
                    <div className="faq-group active">
                        {faqByCategory[activeTab].map((item, i) => (
                            <div
                                key={i}
                                className={`faq-item ${openIndex === i ? "active" : ""}`}
                            >
                                <button className="faq-q" onClick={() => toggleFaq(i)}>
                                    <span>{item.question}</span>
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
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
      </section>
    );
}
