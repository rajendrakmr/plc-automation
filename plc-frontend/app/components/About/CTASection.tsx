"use client";

import useScrollReveal from "@/app/components/hooks/useScrollReveal";
import Link from "next/link";
export default function CTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="about-cta">
      <div className={`about-cta__inner reveal reveal--up ${isVisible ? "visible" : ""}`} ref={ref}>
        <h2>Need Reliable Industrial Automation Spare Parts?</h2>
        <p>Our experts are ready to help you source new, obsolete, and hard-to-find components. Minimize your downtime and maximize productivity today.  
</p>
        <div className="about-cta__actions">
          <Link href="/offer-product-list" className="btn btn--white">Request a Quote</Link>
          <Link href="/contact-us" className="btn btn--outline-white">Contact Our Team</Link>
        </div>
      </div>
    </section>
  );
}
