'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ContactUsSection() {
  return (
    <section className="section_white_content">
      <div className="section_container rk_cta_container">
        <h2 className="rk_cta_title">
          We're here when you need us
        </h2>

        <div className="rk_cta_boxes">

          {/* AU Contact */}
          <a
            href="tel:+61421000214"
            className="rk_cta_box rk_cta_box_link"
          >
            <div className="rk_cta_icon"> 
                <Image
                  src="/assets/Icons/phone-plcautomationgroup.png"
                  alt="Phone Icon"
                  width={40}
                  height={40}
                />
              </div>
            

            <h3>Call Us</h3>

            <p>AU: +61 421 000 214</p>
          </a>

          {/* Enquiry Form */}
          <Link
            href="/contact-us"
            className="rk_cta_box rk_cta_box_link"
          >
            <div className="rk_cta_icon">
              <Image
                  src="/assets/Icons/chat-line-plcautomationgroup.png"
                  alt="Email Icon"
                  width={40}
                  height={40}
                />
            </div>

            <h3>Enquire Now</h3>

            <p>Complete our online form</p>
          </Link>

          {/* USA Contact */}
          <a
            href="tel:+6569808259"
            className="rk_cta_box rk_cta_box_link"
          >
            <div className="rk_cta_icon">
              <Image
                  src="/assets/Icons/phone-plcautomationgroup.png"
                  alt="Email Icon"
                  width={40}
                  height={40}
                />
            </div>

            <h3>Call Us</h3>

            <p>USA: +65 6980 8259</p>
          </a>

          {/* Email */}
          <a
            href="mailto:sales@plcautomat.com"
            className="rk_cta_box rk_cta_box_link"
          >
            <div className="rk_cta_icon">
              <Image
                  src="/assets/Icons/email-plcautomationgroup.png"
                  alt="Email Icon"
                  width={40}
                  height={40}
                />
            </div>

            <h3>Email Us</h3>

            <p>sales@plcautomat.com</p>
          </a>

        </div>
      </div>
    </section>
  );
}