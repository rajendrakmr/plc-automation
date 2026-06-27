"use client";

import useScrollReveal from "@/app/components/hooks/useScrollReveal";
interface Industry {
  icon: string;
  name: string;
}

const industries: Industry[] = [
  { icon: "🛢️", name: "Oil & Gas" },
  { icon: "⚓",  name: "Marine & Offshore" },
  { icon: "⚡",  name: "Power Generation" },
  { icon: "💧",  name: "Water & Wastewater" },
  { icon: "💊",  name: "Pharmaceutical" },
  { icon: "🥤",  name: "Food & Beverage" },
  { icon: "⛏️",  name: "Mining & Metals" },
  { icon: "🏭",  name: "Manufacturing" },
  { icon: "🚚",  name: "Logistics" },
  { icon: "🏗️",  name: "Infrastructure" },
];

export default function IndustriesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section_grey_content">
      <div className="section_container about-industries">
      <div className="about-industries__header">
        <h2 className="section-title">Industries We Serve</h2>
        <div className="section-divider" />
      </div>
      <div className={`about-industries__grid reveal reveal--up ${isVisible ? "visible" : ""}`} ref={ref}>
        {industries.map((ind, i) => (
          <div className="about-industries__item" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
            <span className="about-industries__icon">{ind.icon}</span>
            <span className="about-industries__name">{ind.name}</span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
