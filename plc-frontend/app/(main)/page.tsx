 
import LatestBlogSection from "@/app/components/LatestBlogSection";
import BrandPartnerSection from "@/app/components/main-ui/BrandPartnerSection";
import HomeBannerSection from "@/app/components/HomeBannerSection";
import ManufacturersSection from "@/app/components/main-ui/ManufacturersSection";
import ContactUsSection from "@/app/components/ContactUsSection"; 
import Image from "next/image";
import HeroBannerSection from "../components/main-ui/HeroBannerSection";
import TrustBadgeSection from "../components/main-ui/TrustBadgeSection";

export const metadata = {
  title: "PLC Automation Group – Your Global Partner for Industrial Automation & PLC Solutions",
  description: "Empowering Industries Worldwide. PLC Automation Group is a trusted global supplier of industrial automation spare parts, specializing in both new and obsolete PLC components. From Australia to across the globe, we provide reliable automation solutions that keep your systems running efficiently.",
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
      


      <LatestBlogSection />
      <ContactUsSection />
    </>
  );
}