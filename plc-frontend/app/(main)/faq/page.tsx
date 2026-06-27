
import ContactUsSection from "@/app/components/ContactUsSection";
import BredCrumbsSection from "@/app/components/BredCrumbsSection";

import FaqSection from "@/app/components/sections/FaqSection";
export const metadata = {
    title: "FAQ - Answers About Our Automation System",
    description: "Get answers to common questions about our automation system at PLC Automation Group. Learn how our innovative solutions can revolutionize your industrial processes. FAQ about our automation system.",
    keywords:"PLC AUTOMATION PTE LTD", 
};

export default function FAQ() {
    return (
        <main>

            <BredCrumbsSection
                title="FAQ"
                bgImage="/assets/engineering-services-4.jpg"
                items={[
                    { label: "Home", link: "/" },
                    { label: "FAQs" },
                ]}
            />


            <FaqSection />

            {/* <ContactUsSection /> */}
        </main>
    );
}