"use client";
import Image from "next/image";
import useScrollReveal from "@/app/components/hooks/useScrollReveal";

interface TeamMember {
  name: string;
  role: string;
  img: string;
}

const team: TeamMember[] = [
  { name: "Krish Rai (John)", role: "Managing Director", img: "/assets/about-us/Krish-John-PLCAutomation.webp" },
  { name: "Peter Hocking", role: "Non-Executive Director", img: "/assets/about-us/Peter-Hocking-PLCAutomation.png" },
  { name: "Neeran Rai", role: "Procurement & Finance", img: "/assets/about-us/Neeran-Rai-PLCAutomation.png" },
  { name: "Rahul Sarkar", role: "Marketing Director", img: "/assets/about-us/Rahul-Sarkar-PLCAutomation.png" },
];

export default function TeamSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section_white_content">
      <div className="section_container about-team">
        <div className="about-team__header">
          <h2 className="section-title">Meet Our Leadership Team</h2>
          <p className="about-team__sub">
            Decades of combined expertise in industrial procurement, engineering,
            and operations — dedicated to keeping your facilities running.
          </p>
          <div className="section-divider" />
        </div>
        <div className={`about-team__grid reveal reveal--up ${isVisible ? "visible" : ""}`} ref={ref}>
          {team.map((member, i) => (
            <div className="about-team__card" key={i} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="about-team__avatar">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
                <div className="about-team__info">
                  <h3 className="about-team__name">{member.name}</h3>
                  <p className="about-team__role">{member.role}</p>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
