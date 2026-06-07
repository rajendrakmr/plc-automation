"use client";

import { useRef, useState, useEffect } from "react";
// import "@/app/(public)/components/service-section.css"; // adjust path as needed

// ── Icons ──────────────────────────────────────────────────────────────────────
const SourcingIcon = () => (
  <svg width="120" height="110" viewBox="0 0 120 110" fill="none">
    <ellipse cx="60" cy="72" rx="52" ry="38" fill="#dde3f0" />
    <g transform="translate(52, 22)">
      <circle cx="16" cy="16" r="7" stroke="#b0b8cc" strokeWidth="2.5" fill="white" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <rect key={i} x="14" y="-2" width="4" height="7" rx="1" fill="#b0b8cc" transform={`rotate(${angle} 16 16)`} />
      ))}
    </g>
    <line x1="62" y1="68" x2="80" y2="88" stroke="#e83e8c" strokeWidth="7" strokeLinecap="round" />
    <circle cx="52" cy="58" r="18" stroke="#4a5568" strokeWidth="3" fill="white" fillOpacity="0.85" />
    <circle cx="38" cy="44" r="2" fill="white" opacity="0.7" />
    <circle cx="43" cy="39" r="1.2" fill="white" opacity="0.5" />
    <line x1="8" y1="95" x2="112" y2="95" stroke="#c8d0e0" strokeWidth="1.5" />
  </svg>
);

const ExchangeIcon = () => (
  <svg width="120" height="110" viewBox="0 0 120 110" fill="none">
    <ellipse cx="60" cy="72" rx="52" ry="38" fill="#dde3f0" />
    <circle cx="36" cy="38" r="10" fill="white" stroke="#8892a4" strokeWidth="2" />
    <path d="M18 75 Q18 58 36 56 Q44 56 44 62" stroke="#8892a4" strokeWidth="2" fill="white" />
    <circle cx="84" cy="38" r="10" fill="white" stroke="#8892a4" strokeWidth="2" />
    <path d="M102 75 Q102 58 84 56 Q76 56 76 62" stroke="#8892a4" strokeWidth="2" fill="white" />
    <rect x="44" y="58" width="32" height="28" rx="2" fill="white" stroke="#8892a4" strokeWidth="2" />
    <rect x="44" y="58" width="32" height="8" rx="2" fill="#f0f4fa" stroke="#8892a4" strokeWidth="2" />
    <rect x="56" y="58" width="8" height="28" fill="#e83e8c" opacity="0.7" />
    <rect x="44" y="66" width="32" height="5" fill="#e83e8c" opacity="0.7" />
    <path d="M28 48 Q24 44 28 40" stroke="#8892a4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M92 48 Q96 44 92 40" stroke="#8892a4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="56" cy="32" r="1.5" fill="white" opacity="0.8" />
    <circle cx="68" cy="28" r="1" fill="white" opacity="0.6" />
    <line x1="8" y1="95" x2="112" y2="95" stroke="#c8d0e0" strokeWidth="1.5" />
  </svg>
);

const RepairIcon = () => (
  <svg width="120" height="110" viewBox="0 0 120 110" fill="none">
    <ellipse cx="60" cy="72" rx="52" ry="38" fill="#dde3f0" />
    <g transform="translate(60,58)">
      <circle cx="0" cy="0" r="14" stroke="#4a5568" strokeWidth="2.5" fill="white" />
      <circle cx="0" cy="0" r="6" stroke="#4a5568" strokeWidth="2" fill="#f0f4fa" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <rect key={i} x="-4" y="-22" width="8" height="9" rx="1.5" fill={i % 2 === 0 ? "#e83e8c" : "#4a5568"} transform={`rotate(${angle})`} />
      ))}
    </g>
    <circle cx="30" cy="38" r="2" fill="white" opacity="0.8" />
    <circle cx="36" cy="30" r="1.3" fill="white" opacity="0.6" />
    <circle cx="88" cy="34" r="1.5" fill="white" opacity="0.7" />
    <line x1="8" y1="95" x2="112" y2="95" stroke="#c8d0e0" strokeWidth="1.5" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────
const services = [
  {
    id: "sourcing",
    Icon: SourcingIcon,
    title: "Sourcing your part",
    description:
      "Global supplier of quality automation parts. We source hard-to-find components fast, ensuring minimal downtime for your operations.",
    linkText: "Learn more",
    linkHref: "#",
  },
  {
    id: "exchange",
    Icon: ExchangeIcon,
    title: "Service Exchange",
    description:
      "Dispose of your old unit by exchanging it for a fully tested, reconditioned replacement at a fraction of the new part cost.",
    linkText: "Learn more",
    linkHref: "#",
  },
  {
    id: "repair",
    Icon: RepairIcon,
    title: "Repair",
    description:
      "A comprehensive repair service for all automation parts. Fast turnaround with full warranty on every repaired item.",
    linkText: "Learn more",
    linkHref: "#",
  },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function ServiceSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which card is centered during scroll
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.scrollWidth / services.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, services.length - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Dot click → scroll to card
  const scrollToCard = (index: number) => {
    const el = gridRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / services.length;
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section className="section_white_content">
    <div className="section_container ss-section">
      <h2 className="ss-heading">Services</h2>

      {/* Grid / Slider */}
      <div className="ss-grid" ref={gridRef}>
        {services.map((service) => (
          <div key={service.id} className="ss-card">
            <div className="ss-icon-wrap">
              <service.Icon />
            </div>
            <h3 className="ss-card-title">{service.title}</h3>
            <p className="ss-card-desc">{service.description}</p>
            {/* <a href={service.linkHref} className="ss-link">
              {service.linkText}
            </a> */}
          </div>
        ))}
      </div>

      {/* Dots — visible only on mobile via CSS */}
      <div className="ss-dots" aria-label="Slide indicators">
        {services.map((_, i) => (
          <button
            key={i}
            className={`ss-dot${activeIndex === i ? " ss-dot--active" : ""}`}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
    </section>
  );
}