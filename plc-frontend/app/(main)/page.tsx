
import Image from "next/image";
import BrandPartnerSection from "@/app/components/main-ui/BrandPartnerSection";
import ManufacturersSection from "@/app/components/main-ui/ManufacturersSection";
import ContactUsSection from "@/app/components/ContactUsSection";
import HeroBannerSection from "@/app/components/main-ui/HeroBannerSection";
import TrustBadgeSection from "@/app/components/main-ui/TrustBadgeSection";
import BlogLatestSection from "../components/BlogLatestSection";
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

      <section className="section_white_content">
        <div className="section_container mmp-container ">
          <div className="mmp-content">
            <h2 className="mmp-title">
              Manufacturing Made Possible
            </h2>

            <p className="mmp-desc">
              At EU Automation we specialise in the procurement of essential and
              hard-to-find automation components required to keep the manufacturing
              world turning.
            </p>

            <p className="mmp-desc">
              We will find and deliver the parts you need, regardless of their age,
              scarcity or location, to get your facility back up and running swiftly.
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