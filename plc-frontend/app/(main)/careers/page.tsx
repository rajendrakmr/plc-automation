import BreadCrumbsSection from "@/app/components/BredCrumbsSection";
import BreadCrumb from "@/app/components/sections/BreadCrumb";
import CareerSection from "@/app/components/sections/CareerSection";
import JobOpeningSection from "@/app/components/sections/JobOpeningSection";

export const metadata = {
  title: "Careers",
  description: "Reach out to PLC Automation Group through our contact page. Connect with our experts to discuss tailored industrial solutions that enhance productivity and efficiency. Let's transform your processes together.",
};

export default function CareersPage() {
  return (
    <main>
      <BreadCrumbsSection
        title="Careers"
        bgImage="/assets/engineering-services-4.jpg"
        items={[
          { label: "Home", link: "/" },
          { label: "Careers" },
        ]}
      />



      <JobOpeningSection type="Full-Time" />

      <JobOpeningSection type="Internship" />
    </main>
  );
}