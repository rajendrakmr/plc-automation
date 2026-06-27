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
            <p>
              AU:{" "}
              <Link href="tel:+61421000 214" className="contact-link">
                +61 421 000 214
              </Link>
            </p> 
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

            <p>
              SG:{" "}
              <Link href="tel:+6589507034" className="contact-link">
                +65 8950 7034
              </Link>
            </p>
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

             <p> 
              <Link href="mailto:sales@plcautomat.com" className="contact-link">
                sales@plcautomat.com
              </Link>
            </p> 
          </a>

        </div>
      </div>
    </section>
  );
}