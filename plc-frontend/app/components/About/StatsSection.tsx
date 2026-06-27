"use client";
import { useEffect, useRef, useState } from "react";
import useScrollReveal from "@/app/components/hooks/useScrollReveal";

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ target, suffix = "", duration = 1800 }: CountUpProps) {
  const [count, setCount] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: any;
}

const stats: Stat[] = [
  {
    value: 10, suffix: "+", label: "Years Industry Experience",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M9 8l-2 8 5-3 5 3-2-8"/>
      </svg>
    ),
  },
  {
    value: 500, suffix: "+", label: "Global Clients",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3"/>
        <path d="M8 11c-1.657 0-3-1.343-3-3s1.343-3 3-3"/>
        <path d="M20 21c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4"/>
        <path d="M22 21c0-2.21-1.343-4-3-4"/>
        <path d="M2 21c0-2.21 1.343-4 3-4"/>
        <circle cx="12" cy="11" r="3"/>
      </svg>
    ),
  },
  {
    value: 50, suffix: "+", label: "Countries Served",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    value: 10000, suffix: "+", label: "Components Supplied",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        <path d="M8.46 8.46a5 5 0 0 0 0 7.07"/>
      </svg>
    ),
  },
];

export default function StatsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section_white_content">
      <div className="section_container about-stats">
      <div
        className={`about-stats__grid reveal reveal--up ${isVisible ? "visible" : ""}`}
        ref={ref}
      >
        {stats.map((s, i) => (
          <div
            className="about-stats__card"
            key={i}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="about-stats__icon-wrap">{s.icon}</div>
            <div className="about-stats__number">
              <CountUp target={s.value} suffix={s.suffix} />
            </div>
            <div className="about-stats__label">{s.label}</div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
