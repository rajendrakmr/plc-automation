"use client";
import useScrollReveal from "@/app/components/hooks/useScrollReveal";
import { GlobalReach } from "./Sections3";

interface Region {
  label: string;
  flag: string;
}

const regions: Region[] = [
  { label: "Asia",        flag: "🌏" },
  { label: "Europe",      flag: "🌍" },
  { label: "Americas",    flag: "🌎" },
  { label: "Middle East", flag: "🕌" },
  { label: "Africa",      flag: "🌍" },
  { label: "Oceania",     flag: "🌏" },
];

export default function GlobalReachSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section_grey_content">
      <div className="section_container about-global">
      <div className="about-global__header">
        <h2 className="section-title">Serving Customers Worldwide</h2>
        <p className="about-global__sub">
          With delivery to over 50 countries, our logistics network ensures your
          critical components arrive on time, every time.
        </p> 
      </div>
        <GlobalReach /> 
      {/* <div className={`about-global__regions reveal reveal--up ${isVisible ? "visible" : ""}`} ref={ref}> */}
      </div>
    </section>
  );
}
