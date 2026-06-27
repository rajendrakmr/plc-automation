 
 
import HeroSection from "@/app/components/About/HeroSection";
import IntroSection from "@/app/components/About/IntroSection";
import StatsSection from "@/app/components/About/StatsSection";
import TimelineSection from "@/app/components/About/TimelineSection";
import WhyChooseUsSection from "@/app/components/About/WhyChooseUsSection";
import IndustriesSection from "@/app/components/About/IndustriesSection";
import BrandsSection from "@/app/components/About/BrandsSection";
import TeamSection from "@/app/components/About/TeamSection";
import VisionMissionSection from "@/app/components/About/VisionMissionSection";
import GlobalReachSection from "@/app/components/About/GlobalReachSection";
import CTASection from "@/app/components/About/CTASection";
import "@/app/css/about-us.css";

export const metadata = {
  title: "About PLC Automation Group - Innovating Industrial Solutions",
  keywords:"PLC AUTOMATION PTE LTD",
  description: "Discover PLC Automation Group's expertise in industrial automation. We specialize in cutting-edge solutions for enhanced productivity and efficiency. Learn more about our journey today.",
};

export default function AboutUs() {
  return (
    <main className="about-page">
      <HeroSection />
      <IntroSection />
      <StatsSection />
      <TimelineSection />
      <WhyChooseUsSection />
      <IndustriesSection />
      <BrandsSection />
      <TeamSection />
      <VisionMissionSection />
      <GlobalReachSection />
      <CTASection />
    </main>
  );
}
