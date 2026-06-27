"use client";
import Image from "next/image";

import useScrollReveal from "@/app/components/hooks/useScrollReveal";
export default function IntroSection() {
  const left = useScrollReveal();
  const right = useScrollReveal();

  return (
    <section className="section_white_content">
      <div className="section_container about-intro ">
        <div className={`about-intro__text reveal ${left.isVisible ? "visible" : ""}`} ref={left.ref}>
          <h2 className="section-title">
            Powering Industries Through Reliable Automation Solutions
          </h2>
          <p>
          At PLC Automation Group, we understand that every minute of downtime costs your business. That's why we've built a robust global sourcing network dedicated to providing high-quality industrial automation spare parts, obsolete PLC modules, HMIs, and drives.
          </p>
          <p>
           Serving sectors from manufacturing and power generation to oil & gas, marine, and pharmaceuticals, we are the trusted partner that procurement teams and plant engineers rely on when they need critical components fast and efficiently.
          </p>
        </div>
        <div className={`about-intro__image reveal reveal--right ${right.isVisible ? "visible" : ""}`} ref={right.ref}>
          {/* <img src="/assets/about-intro.jpg" alt="Industrial Control Room" /> */}
          <Image src="/assets/about-us/control-room.png" alt="Industrial Control Room" width={600} height={400} />
        </div>
      </div>
    </section>
  );
}
