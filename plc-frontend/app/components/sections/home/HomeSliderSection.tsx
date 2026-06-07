"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import styles from "../../css/HeroSlider.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Slide {
    id: number;
    image: string;
    tag: string;
    title: string;
    titleEm: string;
    titleAfter?: string;
    subtitle: string;
    description: string;
    cta1: { label: string; href: string };
    cta2: { label: string; href: string };
}

// ─── Slide data ───────────────────────────────────────────────────────────────
const SLIDES: Slide[] = [
    {
        id: 1,
        image: "/assets/engineering-services-1.jpg",
        tag: "🏭 Industrial Automation Experts",
        title: "Supplying  ",
        titleEm: "Obsolete Automation",
        titleAfter: "Spares Globally",
        subtitle: "Trusted Since 2008 · ISO 9001:2015 Certified",
        description:
            "At PLC Automation Group, we specialize in the supply of obsolete automation spares worldwide.",
        cta1: { label: "🔍 Search Parts", href: "/offer-product-list" },
        cta2: { label: "📋 Send Enquiry", href: "/contact-us" },
    },
    {
        id: 2,
        image: "/assets/engineering-services-2.jpg",
        tag: "⚡ Drives & Servo Systems",
        title: "Peace of mind",
        titleEm: "",
        titleAfter: "",
        subtitle: "ABB · Siemens · Yaskawa · Mitsubishi · Fanuc",
        description:
            "All parts come with  12 months warranty",
        cta1: { label: "⚡ Browse Drives", href: "/offer-product-list" },
        cta2: { label: "📞 Contact Us", href: "/contact-us" },
    },
    {
        id: 3,
        image: "/assets/engineering-services-3.jpg",
        tag: "🤖 CNC & Robotics Parts",
        title: "ENGINEERS WITH MORE THAN  ",
        titleEm: "25 YEARS",
        titleAfter: "OF INDUSTRY EXPERIENCE.",
        subtitle: "Production line down? We respond in 24 hours.",
        description:
            "PLC and  HMI Programming , Modification , & Optimization",
        cta1: { label: "🤖 CNC & Robotics", href: "/offer-product-list" },
        cta2: { label: "🚨 Emergency Line", href: "/contact-us" },
    },
    {
        id: 4,
        image: "/assets/engineering-services-4.jpg",
        tag: "✅ Genuine Parts Guarantee",
        title: "IN EMERGENCIES, OUR ENGINEERS COMMIT  ",
        titleEm: "TO A 2-HOUR RESPONSE TIME",
        titleAfter: "AND 24-HOUR SOLUTIONS.",
        subtitle: "Exchange program · Repair service · AMC contracts",
        description:
            "We specialize in electrical panel preventive, predictive, corrective, and breakdown maintenance.",
        cta1: { label: "💰 View Offers", href: "/offer-product-list" },
        cta2: { label: "📋 Send Requirements", href: "/contact-us" },
    },
];

const AUTO_PLAY_MS = 1500;

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomeSliderSection() {
    const [current, setCurrent] = useState(0);
    const [prevs, setPrev] = useState<any | number | null>(null);
    const [dir, setDir] = useState<"next" | "prev">("next");
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = useCallback((index: number, direction: "next" | "prev" = "next") => {
        setPrev(current);
        setDir(direction);
        setCurrent(index);
        setProgress(0);
    }, [current]);

    const next = useCallback(() => goTo((current + 1) % SLIDES.length, "next"), [current, goTo]);
    const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, "prev"), [current, goTo]); 
    useEffect(() => {
        if (paused) return;
        setProgress(0);
        progressRef.current && clearInterval(progressRef.current);
        const step = 100 / (AUTO_PLAY_MS / 80);
        progressRef.current = setInterval(() => setProgress(p => Math.min(p + step, 100)), 80);
        return () => { progressRef.current && clearInterval(progressRef.current); };
    }, [current, paused]);

    // Auto-play
    useEffect(() => {
        if (paused) return;
        timerRef.current = setInterval(next, AUTO_PLAY_MS);
        return () => { timerRef.current && clearInterval(timerRef.current); };
    }, [next, paused]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [next, prev]);

    const slide = SLIDES[current]; 
    const s = styles;  

    return (
        <section
            className={s.hs__section}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Hero slider"
        >
            {/* ── Background slides ── */}
            {SLIDES.map((sl, i) => (
                <div
                    key={sl.id}
                    className={[
                        s.hs__slide,
                        i === current ? s.hs__slideActive : "",
                        i === prevs ? s.hs__slidePrev : "",
                        i === current && dir === "next" ? s.hs__slideEnterNext : "",
                        i === current && dir === "prev" ? s.hs__slideEnterPrev : "",
                    ].filter(Boolean).join(" ")}
                    aria-hidden={i !== current}
                >
                    <Image
                        src={sl.image}
                        alt={sl.title}
                        fill
                        priority={i === 0}
                        quality={90}
                        className={s.hs__slideImg}
                        sizes="100vw"
                    />
                    <div className={s.hs__overlayBase} />
                    <div className={s.hs__overlayGradient} />
                    <div className={s.hs__overlayNoise} />
                </div>
            ))}

            {/* ── Content (re-mounts on slide change for animation) ── */}
            <div className={s.hs__content} key={current}>
 

                <h1 className={s.hs__heading}>
                    {slide.title} {slide.titleEm} {slide.titleAfter}
                    
                </h1>

                {/* <p className={s.hs__subtitle}>{slide.subtitle}</p> */}

                <p className={s.hs__description}>{slide.description}</p>

                <div className={s.hs__actions}>
                    <Link href={slide.cta1.href} className={s.hs__btnPrimary}>
                        {slide.cta1.label}
                    </Link>
                    <Link href={slide.cta2.href} className={s.hs__btnSecondary}>
                        {slide.cta2.label}
                    </Link>
                </div>

                {/* <div className={s.hs__trust}>
                    {["ISO 9001:2015", "12-Mo Warranty", "24/7 Support", "PAN India Delivery"].map(t => (
                        <span key={t} className={s.hs__trustBadge}>
                            <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 12l-4-4 1.41-1.41L9 9.17l6.59-6.58L17 4l-8 8z" />
                            </svg>
                            {t}
                        </span>
                    ))}
                </div> */}
            </div>

            {/* ── Slide counter ── */}
            <div className={s.hs__counter}>
                <span className={s.hs__counterCurrent}>{String(current + 1).padStart(2, "0")}</span>
                <span className={s.hs__counterSep} />
                <span className={s.hs__counterTotal}>{String(SLIDES.length).padStart(2, "0")}</span>
            </div>

            {/* ── Arrows ── */}
            <button className={`${s.hs__arrow} ${s.hs__arrowPrev}`} onClick={prev} aria-label="Previous slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>
            <button className={`${s.hs__arrow} ${s.hs__arrowNext}`} onClick={next} aria-label="Next slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            {/* ── Dots ── */}
            <div className={s.hs__dots}>
                {SLIDES.map((sl, i) => (
                    <button
                        key={sl.id}
                        className={`${s.hs__dot} ${i === current ? s.hs__dotActive : ""}`}
                        onClick={() => goTo(i, i > current ? "next" : "prev")}
                        aria-label={`Go to slide ${i + 1}`}
                    >
                        {i === current && (
                            <span className={s.hs__dotProgress} style={{ width: `${progress}%` }} />
                        )}
                    </button>
                ))}
            </div>

            {/* ── Bottom progress bar ── */}
            <div className={s.hs__progressBar}>
                <div
                    className={s.hs__progressFill}
                    style={{ width: `${progress}%`, transition: paused ? "none" : "width 0.08s linear" }}
                />
            </div>

            {/* ── Scroll hint ── */}
            <div className={s.hs__scrollHint}>
                <div className={s.hs__scrollMouse}>
                    <div className={s.hs__scrollWheel} />
                </div>
                <span>Scroll</span>
            </div>
        </section>
    );
}