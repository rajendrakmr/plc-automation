"use client";
import useScrollReveal from "@/app/components/hooks/useScrollReveal";
export default function VisionMissionSection() {
  const left = useScrollReveal();
  const right = useScrollReveal();

  const MissionIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );

  const VisionIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="6" />
      <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
      <line x1="12" y1="18" x2="12" y2="20" />
      <path d="M9 21h6" />
    </svg>
  );

  return (
    <section className="section_white_content">
      <div className="section_container about-vm">
        <div className={`about-vm__card reveal ${left.isVisible ? "visible" : ""}`} ref={left.ref}>
          <div className="about-vm__header">
            <div className="about-vm__icon"><MissionIcon /></div>
            <h3>Our Mission</h3>
          </div>
          <div className="about-vm__body">
            <p>To keep the world's industries moving by providing immediate access to critical automation components. We strive to eliminate supply chain bottlenecks and deliver high-quality, reliable parts that plant engineers can trust.</p>
          </div>
        </div>
        <div className={`about-vm__card reveal reveal--right ${right.isVisible ? "visible" : ""}`} ref={right.ref}>
          <div className="about-vm__header">
            <div className="about-vm__icon"><VisionIcon /></div>
            <h3>Our Vision</h3>
          </div>
          <div className="about-vm__body">
            <p>To be the universally recognized standard for industrial automation procurement—where every facility manager knows that one call to PLC Automation Group means their downtime problem is solved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}