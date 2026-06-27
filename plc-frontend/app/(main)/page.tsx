
import Image from "next/image";
import BrandPartnerSection from "@/app/components/main-ui/BrandPartnerSection";
import ManufacturersSection from "@/app/components/main-ui/ManufacturersSection";
import ContactUsSection from "@/app/components/ContactUsSection";
import HeroBannerSection from "@/app/components/main-ui/HeroBannerSection";
import TrustBadgeSection from "@/app/components/main-ui/TrustBadgeSection";
import BlogLatestSection from "../components/BlogLatestSection";
import IndustriesSection from "../components/About/IndustriesSection";
import "@/app/css/about-us.css";
export const metadata = {
  title: "Global Industrial Automation Parts: Best Management, Quality Spares, Buy/Sell in Australia - Plc Automation Group Australia",
  description: "Optimize Your Operations with the Best Spare Parts Management. Buy Quality Industrial Automation Parts Globally. Find, Buy, and Sell Automation Parts in Australia. Get Reliable Automation Spare Parts in Australia. Seamless Supply of New and Obsolete Automation Spare Parts for Your Business. ? Automate Brilliance ? Rocket Your Efficiency",
  keywords: "Automation Spares, Mro,Industrial Automation Parts, Siemens, Allen- Bradley ,Omron , ABB , PLC Automation Group Australia , PLC Automation",
};

export default function Home() {
  const items = [
    {
      icon: "/assets/Icons/calendar-plcautomationgroup.png",
      title: "12-month warranty",
    },
    {
      icon: "/assets/Icons/delivery-plcautomationgroup.png",
      title: "Immediate dispatch",
    },
    {
      icon: "/assets/Icons/globus-plcautomationgroup.png",
      title: "Global delivery",
    },
  ];

  return (
    <>
      <HeroBannerSection />
      <div className="feature-bar-container" >

        {items.map((item, index) => (
          <div className="feature-item" key={index}>

            <div className="feature-icon">
              <Image
                src={item.icon}
                alt={item.title}
                width={28}
                height={28}
              />
            </div>

            <span className="feature-text">
              {item.title}
            </span>

          </div>
        ))}

      </div>
      <ManufacturersSection />
      <BrandPartnerSection />
      <IndustriesSection />

      <section className="section_white_content" style={{ background: "#f3f3f3" }}>
        <div className="section_container mmp-container ">
          <div className="mmp-content">
            <h2 className="mmp-title">
              Global Delivery You Can Count On
            </h2>

            <p className="mmp-desc">
              We know how critical fast turnaround is when it comes to industrial automation. That’s why we provide efficient order processing and on-time global delivery all the way from initial order to installation support. From order confirmation, procurement, system configuration, and testing to secure packaging and worldwide logistics, we ensure your automation solutions arrive exactly when and where you need them.
           
              Trust PLC Automation Group to deliver with precision, because downtime isn't an option.
            </p>

            {/* FEATURES */}
            <div className="mmp-features">
              <TrustBadgeSection />

            </div>
          </div>

          {/* RIGHT */}
          <div className="mmp-video-wrap">
            <div className="mmp-video-circle">
              <video
                className="mmp-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src="/assets/plc_automation/plcautomation-animation-video.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </section>



      <BlogLatestSection />
      <ContactUsSection />
    </>
  );
}