"use client";

import { useEffect, useRef, useState } from "react";
import ContactUsSection from "@/app/components/ContactUsSection";
import Image from "next/image";
import Link from "next/link";
import "@/app/components/css/product.css";
import StickyQuoteBar from "@/app/components/StickyQuoteBar";
import ReviewSlider from "./ReviewSlider";
import DeliverySection from "@/app/components/main-ui/DeleverySection";
import ServiceSection from "@/app/components/main-ui/ServiceSection";
import BreadCrumbsSection from "@/app/components/BredCrumbsSection";
import FaqSection from "@/app/components/main-ui/FAQSection";
import QuoteForm from "@/app/components/main-ui/QuoteForm";
import PrdHeroBannerSection from "@/app/components/main-ui/PrdHeroBannerSection";
import TrustBadgeSection from "@/app/components/main-ui/TrustBadgeSection";
import { Product } from "@/app/types";

type Props = {
    product: Product;
};

export default function ProductDetailsClient({
    product,
}: Props) {
    const quoteFormRef = useRef<HTMLDivElement>(null);
    const [showSticky, setShowSticky] = useState(true);

    useEffect(() => {
        const el = quoteFormRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowSticky(!entry.isIntersecting);
            },
            {
                threshold: 0.1,
            }
        );
        observer.observe(el);
        return () => {
            observer.unobserve(el);
            observer.disconnect();
        };
    }, []);



    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!badgeRef.current) return;

            const rect =
                badgeRef.current.getBoundingClientRect();

            setShowSticky(rect.bottom < 0);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start", });
        }
    };
    return (
        <main>

            <StickyQuoteBar
                visible={showSticky}
                partNo={product.part_no}
                onQuoteClick={() => scrollToSection("quote-section")}
                onDeleveryClick={() => scrollToSection("delivery-section")}
                onReviewClick={() => scrollToSection("review-section")}
            />

            <BreadCrumbsSection
                cl="section_white_content"
                title={product.part_no}
                bgImage="/assets/engineering-services-4.jpg"
                items={[
                    { label: "Home", link: "/" },
                    { label: "Brands", link: "/offer-product-list" },
                    {
                        label: product.part_no,
                        link: "/offer-product-list",
                    },
                    { label: product.part_no },
                ]}
            />


            <section className="section_white_content">
                <div className="section_container pd-inner" >

                    {/* LEFT */}
                    <div className="pd-left">
                        <h1 className="pd-code">
                            {product.part_no}
                        </h1> 
                         {
                            product.short_desc && <p
                                className="pd-title"
                                dangerouslySetInnerHTML={{ __html: product.short_desc }}
                            />
                        }

                        <div className="pd-badges">
                            <div className="google-review">
                                <Link
                                    href="https://share.google/l9AIRLr7mW59mdJQk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="google-review-card"
                                >
                                    <Image
                                        src="/plcautomationgroup-google_reviews.svg"
                                        alt="Google"
                                        width={70}
                                        height={70}
                                    />

                                    <div className="review-content">
                                        <h4>Google Reviews</h4>

                                        <div className="rating-row">
                                            <span>Rating 4.9</span>
                                            <span className="stars">★★★★★</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <hr />

                        <div className="mmp-features" ref={badgeRef}>
                            <TrustBadgeSection />
                        </div>

                        <hr />

                        <table className="pd-table">
                            <tbody>
                                <tr>
                                    <td>Manufacturer</td>
                                    <td>{product.category.cat_name}</td>
                                </tr>

                                <tr>
                                    <td>Part Number</td>
                                    <td>{product.part_no}</td>
                                </tr>

                                <tr>
                                    <td>Status</td>
                                    <td>{product.stock}</td>
                                </tr>
                            </tbody>
                        </table>

                        {
                            product.product_desc && <div
                                className="product_desc"
                                dangerouslySetInnerHTML={{ __html: product.product_desc }}
                            />
                        }


                        <div className="next-steps">
                            <h3>What happens next?</h3>

                            <div className="step-card">
                                <div className="step-icon">
                                    <Image
                                        src="/assets/Icons/email-plcautomationgroup.png"
                                        alt="Email Confirmation"
                                        width={24}
                                        height={24}
                                    />
                                </div>

                                <div className="step-content">
                                    <h4>1. Email Confirmation</h4>
                                    <p>
                                        You will receive an email confirming that we
                                        have received your enquiry.
                                    </p>
                                </div>
                            </div>

                            <div className="step-card">
                                <div className="step-icon">
                                    <Image
                                        src="/assets/Icons/cup-plcautomationgroup.png"
                                        alt="Account Manager"
                                        width={24}
                                        height={24}
                                    />
                                </div>

                                <div className="step-content">
                                    <h4>2. Dedicated Account Manager</h4>
                                    <p>
                                        One of our specialists will contact you to
                                        confirm the part specifications and condition.
                                    </p>
                                </div>
                            </div>


                            <div className="step-card">
                                <div className="step-icon">
                                    <Image
                                        src="/assets/Icons/calendar-plcautomationgroup.png"
                                        alt="Quote"
                                        width={24}
                                        height={24}
                                    />
                                </div>

                                <div className="step-content">
                                    <h4>3. Receive Your Quote</h4>
                                    <p>
                                        You'll receive a comprehensive quotation
                                        tailored to your requirements.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr style={{ marginTop: '20px' }} />

                        <div className="support-contact-card">
                            <div className="support-notice">
                                <p>
                                    All orders are subject to product availability.
                                    <a
                                        href="/terms-conditions"
                                        className="support-terms-link"
                                    >
                                        Terms & Conditions
                                    </a>
                                </p>
                            </div>

                            <div className="support-divider"></div>

                            <div className="support-header">
                                <h4>Ask our team?</h4>
                                <p>
                                    Our product specialists are available to help
                                    with pricing, availability, and technical
                                    enquiries.
                                </p>
                            </div>

                            <div className="support-actions">
                                <div className="support-item">
                                    <Image
                                        src="/assets/Icons/phone-plcautomationgroup.png"
                                        alt="Phone"
                                        width={20}
                                        height={20}
                                    />
                                    <Link href="tel:+6569808259">
                                        +65 6980 8259
                                    </Link>
                                </div>

                                <div className="support-item">
                                    <Image
                                        src="/assets/Icons/phone-plcautomationgroup.png"
                                        alt="Phone"
                                        width={20}
                                        height={20}
                                    />
                                    <Link href="tel:+61421000214">
                                        AU: +61 421 000 214
                                    </Link>
                                </div>

                                <div className="support-item">
                                    <Image
                                        src="/assets/Icons/email-plcautomationgroup.png"
                                        alt="Email"
                                        width={20}
                                        height={20}
                                    />
                                    <Link href="mailto:sales@plcautomat.com">
                                        sales@plcautomat.com
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="pd-right" id="quote-section">
                        <QuoteForm product={product} />
                    </div>

                </div>
            </section>
            <section className="section_white_content" id="delivery-section">
                <DeliverySection />
            </section>
            <ServiceSection />


            <section className="section_white_content" id="review-section" style={{ paddingBottom: "50px" }}>
                <ReviewSlider />
            </section>
            <PrdHeroBannerSection />
            <FaqSection />


            <ContactUsSection />
        </main>
    );
}