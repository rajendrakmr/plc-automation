
import BlogsSection from "@/app/components/BlogsSection";
import BredCrumbsSection from "@/app/components/BredCrumbsSection";
// import TeamSlider from "@/app/components/sections/TeamSlider";
import '@/app/components/css/blogs.css'
import ContactUsSection from "@/app/components/ContactUsSection";
export const metadata = {
    title: "Blogs - Insights into Industrial Automation",
    description: "Explore PLC Automation Group's blogs for valuable insights into the world of industrial automation. Stay updated on trends, technologies, and best practices shaping the future of manufacturing.",
};

export default function Blogs() {
    return (
        <main>
            <BredCrumbsSection
                title="Blogs"
                bgImage="/assets/engineering-services-4.jpg"
                items={[
                    { label: "Home", link: "/" },
                    { label: "Blogs" },
                ]}
            /> 
            <BlogsSection /> 
            <ContactUsSection />
        </main>
    );
}