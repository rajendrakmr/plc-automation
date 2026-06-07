"use client";

import Image from "next/image";
import Link from "next/link";

export default function SplitContentSection() {
    return (
        <section className="section_white_content">
 
            {/* RIGHT CONTENT */}
            <div className="section_container split-content"> 
                <h2 className="title">
                    About Us
                </h2>

                <p className="desc">
                    At PLC Automation Group, we specialise in the global supply of industrial automation spare parts; with a core focus on obsolete automation spares. Whether you're maintaining a legacy system or troubleshooting hard-to-source components, we’re here to deliver fast, effective solutions.
                </p>
                <p className="desc">
                    With over a decade of experience in the Electrical & Instrumentation (E&I) field, our founder brings deep domain knowledge and relentless commitment to supporting industries facing urgent MRO spare part needs.
                </p>
                <p className="desc">
                    We help businesses buy and sell automation parts globally, including both new and obsolete components, with guaranteed support across various platforms and brands.

                    Whether you're looking to buy quality industrial automation parts globally, manage your automation spares, or solve disruptions caused by obsolescence, PLC Automation Group is your trusted partner in Southeast Asia, Australia, Europe, and the Middle East and beyond.
                </p>


                <Link href="/offer-product-list" className="btn-primary">
                    Get Started Now →
                </Link>
            </div>
        </section>
    );
}