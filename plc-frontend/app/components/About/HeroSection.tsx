"use client";
import Link from "next/link";
import useScrollReveal from "@/app/components/hooks/useScrollReveal";
import { HeroImgSection } from "./Sections1";

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section_grey_content" style={{ paddingTop: "150px" }}>
      <div className="section_container about-hero ">
        <div className={`about-hero__content reveal ${isVisible ? "visible" : ""}`} ref={ref}>
          <span className="about-hero__eyebrow">Enterprise-Grade Solutions</span>
          <h1 className="about-hero__title">
            About <span className="about-hero__title--accent">PLC</span>
            <br />
            <span className="about-hero__title--accent">Automation</span> Group
          </h1>
          <h2 className="about-hero__subtitle">
          Your Trusted Global Partner for Industrial Automation Spare Parts & Control System Solutions </h2>
            
          <p className="about-hero__desc">
          We eliminate costly downtime by supplying critical, hard-to-find, and obsolete automation components to plant engineers and facilities worldwide. When systems fail, we deliver.
          </p>
          <div className="about-hero__actions">
            <Link href="/contact-us" className="btn btn--primary">
              Contact Us
            </Link>
            <Link href="/offer-product-list" className="btn btn--outline">
              Explore Products
            </Link>
          </div>
        </div>
        <div className={`about-hero__image reveal reveal--right ${isVisible ? "visible" : ""}`}>
          <div className="about-hero__img-card">
            <HeroImgSection /> 
          </div>
        </div>
      </div>
    </section>
  );
}
