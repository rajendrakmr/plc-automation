'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Search, Clock, Globe, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LatestBlogSection() {

    interface Slide {
        id: number;
        image: string;
        title: string;
        description: string;
        author: string;
        date: string;

    }

    // ─── Slide data ───────────────────────────────────────────────────────────────
    const SLIDES: Slide[] = [
        {
            id: 1,
            author: "By Plc Automation Group",
            date: "Apr 28, 2025",
            image: "/assets/engineering-services-1.jpg",
            title: "How Many Critical Automation Spares Should You Keep in Stock",
            description: "A Smarter Approach to Reducing Downtime, Risk, and CostIn modern industrial environments, unplanned downtime is no longer just a maintenance issue, it is a business risk. Whether you operate in manufacturing, utilities, oil & gas, or process industries, the availability of critical automation spares can determine whether production continues or comes to a costly halt.Yet many organizations still ask the same question:How many critical spares should we really keep in stock?The answer lies in data-driven spare parts planning, not guesswork. Below is a proven methodology used by high-performing plants worldwide, adapted specifically for PLCs, drives, and industrial automation components.",

        },
        {
            id: 1,
            author: "By Plc Automation Group",
            date: "Apr 28, 2025",
            image: "/assets/engineering-services-2.jpg",
            title: "Lifecycle Status: Identify Risks Before Components Become Obsolete",
            description: "A Smarter Approach to Reducing Downtime, Risk, and CostIn modern industrial environments, unplanned downtime is no longer just a maintenance issue, it is a business risk. Whether you operate in manufacturing, utilities, oil & gas, or process industries, the availability of critical automation spares can determine whether production continues or comes to a costly halt.Yet many organizations still ask the same question:How many critical spares should we really keep in stock?The answer lies in data-driven spare parts planning, not guesswork. Below is a proven methodology used by high-performing plants worldwide, adapted specifically for PLCs, drives, and industrial automation components.",

        },
        {
            id: 1,
            author: "By Plc Automation Group",
            date: "Apr 28, 2025",
            image: "/assets/engineering-services-3.jpg",
            title: "Free Preventive Maintenance Planner Excel (PM & PdM) PLC Automation",
            description: "A Smarter Approach to Reducing Downtime, Risk, and CostIn modern industrial environments, unplanned downtime is no longer just a maintenance issue, it is a business risk. Whether you operate in manufacturing, utilities, oil & gas, or process industries, the availability of critical automation spares can determine whether production continues or comes to a costly halt.Yet many organizations still ask the same question:How many critical spares should we really keep in stock?The answer lies in data-driven spare parts planning, not guesswork. Below is a proven methodology used by high-performing plants worldwide, adapted specifically for PLCs, drives, and industrial automation components.",

        },


    ]
    return (
        <section className="section blog-section">
            <div className="section-inner">
                <div className="section-header">
                    <div>
                        <span className="section-tag">
                            Latest News
                        </span>
                        <h2 className="section-title">
                            Insights, Updates & Articles
                        </h2>
                        <p className="section-sub">
                            Stay updated with the latest trends, tips and business news.
                        </p>
                    </div>
                    <Link href="/blogs" className="view-all">
                        All Articles →
                    </Link>
                </div>
                <div className="blog-grid">
                    {/* Featured Post */}
                    <article className="blog-card blog-featured">
                        <div className="blog-img" style={{ 'background': 'linear-gradient(135deg,#0a1628 0%,#1a4fd6 100%)' }}> 
                            <Image src="/assets/engineering-services-5.jpg" alt="Featured Blog" fill style={{ 'objectFit': 'cover' }} />
                        </div>
                        <div className="blog-body">
                            <div className="blog-meta">
                                <span className="blog-author">
                                    <span className="blog-avatar">
                                        MG
                                    </span>
                                    Ms. Manisha Garg (Automation Engineer)
                                </span>
                                <span className="blog-date">
                                    Apr 28, 2025
                                </span>
                                <span className="blog-read">
                                    8 min read
                                </span>
                            </div>
                            <h3 className="blog-title">
                                A Symbiotic Relationship with Precision Engineering and Automation
                            </h3>
                            <p className="blog-excerpt">
                                Precision engineering is an essential field that plays a critical role in various industries, including aerospace, automotive, electronics, medical devices, and many more. It involves the design, manufacturing, and assembly of high-precision components and systems to meet stringent requirements for accuracy, reliability, and performance. In this blog, we will delve into the world of precision engineering, exploring its significance, applications, and the technologies that make it possible.

                                What is Precision Engineering?

                                Precision engineering is a multidisciplinary field that focuses on producing components with exceptionally tight tolerances and high levels of accuracy. It encompasses various sub-disciplines, such as mechanical engineering, materials science, metrology (the science of measurement), and automation. The primary goal is to manufacture parts or products that meet or exceed the specified requirements, ensuring they function reliably and efficiently.
                            </p>
                            <div className="blog-footer">
                                <div className="blog-tags">
                                    <span className="blog-tag-item">
                                        Siemens
                                    </span>
                                    <span className="blog-tag-item">
                                        PLC Maintenance
                                    </span>
                                    <span className="blog-tag-item">
                                        S7-300
                                    </span>
                                </div>
                                <a href="#" className="blog-read-link">
                                    Read More →
                                </a>
                            </div>
                        </div>
                    </article>
                    {/* Side Posts */}
                    <div className="blog-side">
                        {SLIDES.map(slide => (
                            <article className="blog-card blog-small">
                                <div className="blog-img-sm" style={{ 'background': 'linear-gradient(135deg,#f97316,#ea580c)' }}>

                                    <Image src={slide.image} alt={slide.title} fill style={{ 'objectFit': 'cover' }} />
                                </div>
                                <div className="blog-body">
                                    <div className="blog-meta">
                                        <span className="blog-date">
                                            {slide.date}
                                        </span>
                                        <span className="blog-read">
                                            5 min read
                                        </span>
                                    </div>
                                    <h3 className="blog-title">
                                        {slide.title}
                                    </h3>
                                    <p className="blog-excerpt">
                                        {slide.description}
                                    </p>
                                    <a href="#" className="blog-read-link">
                                        Read More →
                                    </a>
                                </div>
                            </article>

                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
}