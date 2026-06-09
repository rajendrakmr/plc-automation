"use client";

import Link from "next/link";
import { useState } from "react";
interface HeroBannerProps {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  redirectUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function PrdHeroBannerSection({
  heading = "Our world, made possible by manufacturing. Manufacturing made possible by PLC Automation.",
  subheading = "Discover how we do our part to keep your production lines moving.",
  ctaLabel = "Contact Us",

  redirectUrl = "/contact-us",
  imageSrc = "https://assets.euautomation.com/img/2022/mmp/manufacturing-made-possible-banner.jpg",
  imageAlt = "Factory worker carrying automation parts box.",
}: HeroBannerProps) {

  // 1. useState import add kiya
  const [isHovered, setIsHovered] = useState(false);

  // 2. Link pe handlers + dynamic style
  return (
    <>
      <section style={styles.section}>
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          style={styles.bgImage}
        />
        <div style={styles.overlay} aria-hidden="true" />
        <div style={styles.content} className="section_container">
          <h2 style={styles.heading}>{heading}</h2>
          <p style={styles.subheading}>{subheading}</p>


          <Link
           href={redirectUrl}
            style={{
              ...styles.cta,
              backgroundColor: isHovered ? "var(--coral-hover)" : "var(--blue)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {ctaLabel}
          </Link>
        </div>
      </section>
      <style>{`
        :root {
          --coral:        #e8174a;
          --coral-hover:  #c91240;
          --coral-active: #a80f35;
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    width: "100%",
    minHeight: "220px",
    overflow: "hidden",
    display: "flex",
    alignItems: "stretch",
  },

  bgImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%, transparent 70%)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: "1280px",
    padding: "60px 72px",
  },

  heading: {
    fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1.35,
    maxWidth: "75%",
    margin: "0 0 0 0",
  },

  subheading: {
    fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
    color: "#ffffff",
    lineHeight: 1.6,
    margin: "1.5rem 0",
    fontWeight: 400,
  },
  cta: {
    display: "inline-block",
    backgroundColor: "var(--blue)",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 600,
    padding: "0.5rem 1.5rem",      /* py-2 px-6 */
    borderRadius: "0.5rem",        /* rounded-lg */
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    letterSpacing: "0.01em",
  },


};