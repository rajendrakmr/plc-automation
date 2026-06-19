
import FeatureHighlightsBar from "@/app/components/FeatureHighlightsBar";
import SplitContentSection from "@/app/components/sections/about/SplitContentSection";
import AboutHeroSection from "@/app/components/sections/AboutHeroSection";
import BreadCrumb from "@/app/components/sections/BreadCrumb";
import ContactUsSection from "@/app/components/ContactUsSection";
import PartnerSlider from "@/app/components/sections/common/PartnerSlider";
import TeamSliderSection from "@/app/components/main-ui/TeamSliderSection";
import Image from "next/image";

export const metadata = {
  title: "About PLC Automation Group - Innovating Industrial Solutions",
  keywords:"PLC AUTOMATION PTE LTD",
  description: "Discover PLC Automation Group's expertise in industrial automation. We specialize in cutting-edge solutions for enhanced productivity and efficiency. Learn more about our journey today.",
};

export default function AboutUs() {
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
    <main>
      <FeatureHighlightsBar />

      <AboutHeroSection />
      <SplitContentSection />
      <TeamSliderSection />

      <ContactUsSection />
    </main>
  );
}