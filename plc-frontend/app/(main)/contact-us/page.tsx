import Image from "next/image";
import FaqSection from "@/app/components/main-ui/FAQSection";
import BredCrumbsSection from "@/app/components/BredCrumbsSection";
import ContactForm from "@/app/components/main-ui/ContactForm";

export const metadata = {
  title: "Contact Us - Get in Touch for Industrial Solutions",
  description: "Reach out to PLC Automation Group through our contact page. Connect with our experts to discuss tailored industrial solutions that enhance productivity and efficiency. Let's transform your processes together.",
  keywords:"PLC AUTOMATION PTE LTD"
};

export default function ContactUs() {

  const contactInfo = [
    {
      icon: "/assets/Icons/map-plcautomationgroup.png",
      alt: "Map Icon",
      title: "VISIT US",
      content: (
        <>
          PLC Automation Pte. Ltd. 10 Ubi Crescent, Blk 10, Lobby B Ubi Techpark
          #05-31, Singapore 408564
        </>
      ),
    },
    {
      icon: "/assets/Icons/phone-plcautomationgroup.png",
      alt: "Phone Icon",
      title: "SPEAK TO US",
      content: "Mainline: +65 6980 8259",
      href: "tel:+6569808259",
    },
    {
      icon: "/assets/Icons/email-plcautomationgroup.png",
      alt: "Email Icon",
      title: "E-MAIL US",
      content: "sales@plcautomat.com",
      href: "mailto:sales@plcautomat.com",
    },
  ];

  // Main offices — top section mein dikhenge
  const mainOffices = [
    {
      flag: "🇦🇺",
      country: "Australia",
      company: "PLC Automation Australia Pty Ltd",
      address: [
        "Suite 302, 13/15 Wentworth Ave",
        "Sydney NSW 2000",
        "ABN: 56697505641",
        "ACN: 697505641",
      ],
      phone: "+61 421 000 214",
      phoneHref: "tel:+61421000214",
      email: "sales@plcautomat.com",
      emailHref: "mailto:sales@plcautomat.com",
    },
    {
      flag: "🇸🇬",
      country: "Singapore",
      company: "PLC Automation Pte. Ltd.",
      address: [
        "10 Ubi Crescent Blk 10, Lobby B",
        "Ubi Techpark #05-31",
        "Singapore 408564",
      ],
      phone: "+65 8950 7034",
      phoneHref: "tel:+6589507034",
      email: "sales@plcautomat.com",
      emailHref: "mailto:sales@plcautomat.com",
    },
  ];

  // Baki offices — neeche section mein dikhenge
  const otherOffices = [
    {
      flag: "🇹🇭",
      country: "Thailand",
      company: "PLC Automation Group",
      address: [],
      phone: "+65 8950 7034",
      phoneHref: "tel:+6589507034",
      email: "sales@plcautomat.com",
      emailHref: "mailto:sales@plcautomat.com",
    },
    {
      flag: "🇹🇼",
      country: "Taiwan",
      company: "PLC Automation Group",
      address: [],
      phone: "+65 8950 7034",
      phoneHref: "tel:+6589507034",
      email: "sales@plcautomat.com",
      emailHref: "mailto:sales@plcautomat.com",
    },
    {
      flag: "🇮🇳",
      country: "India",
      company: "PLC Automation Group",
      address: [],
      phone: "+65 8950 7034",
      phoneHref: "tel:+6589507034",
      email: "sales@plcautomat.com",
      emailHref: "mailto:sales@plcautomat.com",
    },
    {
      flag: "🇻🇳",
      country: "Vietnam",
      company: "PLC Automation Group",
      address: [],
      phone: "+65 8950 7034",
      phoneHref: "tel:+6589507034",
      email: "sales@plcautomat.com",
      emailHref: "mailto:sales@plcautomat.com",
    },
    {
      flag: "🇵🇭",
      country: "Philippines",
      company: "PLC Automation Group",
      address: [],
      phone: "+65 8950 7034",
      phoneHref: "tel:+6589507034",
      email: "sales@plcautomat.com",
      emailHref: "mailto:sales@plcautomat.com",
    },
    {
      flag: "🇲🇾",
      country: "Malaysia",
      company: "PLC Automation Group",
      address: [],
      phone: "+65 8950 7034",
      phoneHref: "tel:+6589507034",
      email: "sales@plcautomat.com",
      emailHref: "mailto:sales@plcautomat.com",
    },
    {
      flag: "🇮🇩",
      country: "Indonesia",
      company: "PLC Automation Group",
      address: [],
      phone: "+65 8950 7034",
      phoneHref: "tel:+6589507034",
      email: "sales@plcautomat.com",
      emailHref: "mailto:sales@plcautomat.com",
    },
  ];

  return (
    <main>
      <BredCrumbsSection
        title="Contact Us"
        bgImage="/assets/engineering-services-4.jpg"
        items={[
          { label: "Home", link: "/" },
          { label: "Contact Us" },
        ]}
      />

      {/* MAIN OFFICES — Australia & Singapore */}
      <section className="section_grey_content">
        <div className="section_container section-inner" style={{ paddingTop: "0px" }}>
          {/* <div className="section-header">
            <h2 className="section-title">Our Main Offices</h2>
            <p className="section-sub">
              Our headquarter locations with full operational support.
            </p>
          </div> */}

          <div className="address-grid address-grid--main">
            {mainOffices.map((office) => (
              <div className="address-card address-card--main" key={office.country}>
                <h3>
                  {office.flag} {office.country}
                </h3>
                <h4>{office.company}</h4>
                {office.address.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                <div className="reach-out">
                  Reach out to our Account Manager →
                </div>
                <div className="address-contact">
                  <a href={office.phoneHref}>📞 {office.phone}</a>
                  <a href={office.emailHref}>✉️ {office.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER OFFICES */}
      <section className="section_grey_content">
        <div className="section_container section-inner" style={{ paddingTop: "0px" }}>
          <div className="section-header">
            <h2 className="section-title">Our Global Offices</h2>
            <p className="section-sub">
              We operate globally with strong presence across key regions.
            </p>
          </div>

          <div className="address-grid">
            {otherOffices.map((office) => (
              <div className="address-card" key={office.country}>
                <h3>
                  {office.flag} {office.country}
                </h3>
                <h4>{office.company}</h4>
                {office.address.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                <div className="reach-out">
                  Reach out to our Account Manager →
                </div>
                <div className="address-contact">
                  <a href={office.phoneHref}>📞 {office.phone}</a>
                  <a href={office.emailHref}>✉️ {office.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <div className="contact-inner">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Need help sourcing automation parts or have a question?
              Our team is ready to assist you.
            </p>
            {contactInfo.map((item, index) => (
              <div className="info-item" key={index}>
                <div className="contact-icon">
                  <Image src={item.icon} alt={item.alt} width={20} height={20} />
                </div>
                <div className="contact-content">
                  <h4>{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} className="contact-link">{item.content}</a>
                  ) : (
                    <p>{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10795357.335858187!2d95.85831025487451!3d5.755292303139438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1725c5727567%3A0xf3379f85ed48c85e!2sPLC%20AUTOMATION%20PTE%20LTD!5e0!3m2!1sen!2sin!4v1712841431408!5m2!1sen!2sin"
          loading="lazy"
        ></iframe>
      </section>

      <FaqSection />
    </main>
  );
}