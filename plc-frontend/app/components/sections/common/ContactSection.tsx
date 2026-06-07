'use client'; 
import Link from 'next/link'; 

export default function ContactSection() {
    return (
        <section className="cta-section">
            <div style={{ 'maxWidth': '700px', 'margin': 'auto' }}>
                <h2>
                    Can't Find Your Part? We'll Source It.
                </h2>
                <p>
                    We're here when you need us
                </p>
                <div className="cta-btns">
                    <Link href="/contact-us" className="btn-white">
                        📋 Submit Part Request
                    </Link>
                    <Link href="tel:+6569808259" className="btn-outline-white">
                        📞 Call Our Experts
                    </Link>
                </div>
            </div>
        </section>

    );
}