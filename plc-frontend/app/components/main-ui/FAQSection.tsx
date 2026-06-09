"use client";


import { faqByCategory } from "@/app/data/content";
import { useMemo, useState } from "react"; 
type Category = keyof typeof faqByCategory;
export default function FaqSection() {
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
        <section className="section_white_content">
            <div className="section_container">
                <div className="faq-right"> 
                <div className="faq-tabs">
                    <h3 className="faq-title">FAQs</h3>
                </div> 
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
                                    maxHeight: openIndex === i ? "250px" : "0px",
                                }}
                            >
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* </div> */}
            </div>
            </div>
        </section>
    );
}
