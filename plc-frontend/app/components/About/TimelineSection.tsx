"use client";
import useScrollReveal from "@/app/components/hooks/useScrollReveal";

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

const milestones: Milestone[] = [
  { year: "2021", title: "Company Founded",            desc: "PLC Automation Group was established with a mission to provide reliable industrial automation components and obsolete PLC spare parts. Starting with a two-person team, we quickly became a trusted partner for Oil & Gas and Semiconductor industries." },
  { year: "2022", title: "Regional Growth", desc: "Expanded operations across Singapore and Malaysia while growing our team. Successfully supported customers in Oil & Gas, Marine, FMCG, Offshore, and Semiconductor sectors." },
  { year: "2023", title: "Major Milestones",    desc: "Established our own inventory facility, expanded into Indonesia, surpassed $1.5M annual revenue, and earned SME500, BizSafe Star, and ISO 45001 certifications." },
  { year: "2024", title: "Engineering Services Launch",desc: "Expanded beyond industrial spare parts by introducing Engineering Services, automation support, technical consulting, and project execution. Moved into our own office and strengthened industry partnerships." },
  { year: "2025", title: "Scaling Operations",       desc: "Opened a larger facility with an in-house warehouse, testing center, and quality control operations. Expanded into Utilities and Energy while implementing CRM-driven digital transformation." },
];

export default function TimelineSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section_grey_content">
      <div className="section_container about-timeline">
      <div className="about-timeline__header">
        <h2 className="section-title">Our Journey</h2>
        <div className="section-divider" />
      </div>
      <div className={`about-timeline__list reveal reveal--up ${isVisible ? "visible" : ""}`} ref={ref}>
        {milestones.map((m, i) => (
          <div className="about-timeline__item" key={i} style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="about-timeline__dot" />
            <div className="about-timeline__year">{m.year}</div>
            <div className="about-timeline__body">
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
