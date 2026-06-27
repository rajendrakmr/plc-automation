"use client";
import useScrollReveal from "@/app/components/hooks/useScrollReveal";

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const features: Feature[] = [
  { icon: "🌐", title: "Global Sourcing Network", desc: "Access to millions of parts worldwide through our verified supplier network." },
  { icon: "⚙️", title: "Obsolete PLC Specialists", desc: "We specialize in finding parts that no one else can, to a superior standard." },
  { icon: "⚡", title: "Fast Emergency Support", desc: "Rapid response times and expedited shipping options to minimize downtime." },
  { icon: "✅", title: "Quality Assured", desc: "All components undergo rigorous visual and functional inspections." },
  { icon: "📦", title: "Worldwide Delivery", desc: "Reliable international shipping with trusted logistics partners." },
  { icon: "🔧", title: "Technical Expertise", desc: "Our team understands industrial control systems inside and out." },
];

export default function WhyChooseUsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section_white_content">
      <div className="section_container about-why">
        <div className="about-why__header">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="section-divider" />
        </div>
        <div className={`about-why__grid reveal reveal--up ${isVisible ? "visible" : ""}`} ref={ref}>
          {features.map((f, i) => (
            <div className="about-why__card" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="about-why__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
