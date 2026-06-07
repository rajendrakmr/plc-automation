"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="section_grey_content">

      <div className="section_container">
        {/* TOP */}
        <div className="eu-footer-top">

          {/* COLUMN 1 */}
          <div className="eu-footer-col">
            <p>Useful Links</p>

            <Link href="/about-us">About Us</Link>
            <Link href="/contact-us">Contact Us</Link>
            <Link href="/careers">Careers</Link>
            {/* <Link href="/sitemap">Sitemap</Link> */}
            <Link href="/blogs">Our Blogs</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-conditions">Terms & Conditions</Link>
          </div>

          {/* COLUMN 2 */}
          <div className="eu-footer-col">
            <p>Manufacturers</p>

            <Link href="/">ABB</Link>
            <Link href="/">Fanuc</Link>
            <Link href="/">Indramat</Link>
            <Link href="/">Mitsubishi</Link>
            <Link href="/">Schneider</Link>
            <Link href="/">All Manufacturers</Link>
            <Link href="/">Categories</Link>
            <Link href="/">Parts In Stock</Link>
          </div>

          {/* COLUMN 3 */}
          <div className="eu-footer-col">
            <p>Explore More</p>

            <Link href="/">Knowledge Hub</Link>
            <Link href="/">Watch</Link>
            <Link href="/">Read</Link>
            <Link href="/">Listen</Link>
            <Link href="/">Manufacturing Made Possible</Link>
            <Link href="/">Topics</Link>
            <Link href="/">Industries</Link>
          </div>

          {/* COLUMN 4 */}
          <div className="eu-footer-right">

            {/* TRUSTPILOT */}
            {/* TRUSTPILOT */}
            <div className="trustpilot-box">

              <Link
                href="https://share.google/l9AIRLr7mW59mdJQk"
                target="_blank"
                rel="noopener noreferrer"
                className="google-review-card"
              >
                <Image
                  src="/plcautomationgroup-google_reviews.svg"
                  alt="Google"
                  width={56}
                  height={56}
                  className="google-logo"
                />

                <div className="review-content">
                  <h4>Google Reviews</h4>

                  <div className="rating-row">
                    <span>Rating 4.9</span>
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
              </Link>

              <Image
                src="/payment-gatway.webp"
                alt="PayPal"
                className="payment-gateway"
                width={410}
                height={34}
              />

            </div>
            {/* SUBSCRIBE */}
            <div className="subscribe-box">
              <p className="text-coral-500">Let's stay in touch</p>

              <p>
                Get regular updates and real automation insights straight to your
                inbox.
              </p>

              <button className="subscribe-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="eu-footer-middle">

          <div className="eu-footer-logo">
            <Image
              src="/assets/clogo.png"
              alt="Logo"
              width={140}
              height={40}
            />

            <span>© copyright 2026</span>
          </div>

          <div className="eu-footer-address">
            PLC Automation Australia Pty Ltd Suite 302, 13/15 Wentworth Ave Australia (2000)
          </div>

          <div className="eu-footer-social" style={{ justifyContent: "center" }}>
            <div className="rk_social_icons footer-social">
              <Link href="https://www.reddit.com/user/plc_automation_2021/">
                <i className="fab fa-reddit"></i>
              </Link>
              <Link href="https://www.linkedin.com/company/78855232">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link href="https://www.instagram.com/plc_automation_2021/">
                <i className="fab fa-instagram"></i>
              </Link>

              <Link href="https://www.facebook.com/plcautomat">
                <i className="fab fa-facebook-f"></i>
              </Link>

              <Link href="https://youtube.com/@plcautomationgroup">
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="eu-footer-bottom">
          PLC Automation Group is not an authorised distributor or representative of the manufacturers featured on this website. Brand names and trademarks featured are the property of their respective owners.
          <Link href="/login" style={{color:"var(--blue)"}}>Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}