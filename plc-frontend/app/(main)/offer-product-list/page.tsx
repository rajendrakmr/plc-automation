import OfferProductDetail from "./OfferProductDetail"; 
export async function generateMetadata() { 
    return {
        title: "FAQ - Answers About Our Automation System",
        description: "Get answers to common questions about our automation system at PLC Automation Group. Learn how our innovative solutions can revolutionize your industrial processes. FAQ about our automation system.",
        keywords: "PLC AUTOMATION PTE LTD",
    };
}

export default async function OfferProductPage() {
    // const { blog } = await params;
    // const blogs = await getBlog(blog);
    // if (!blogs) notFound();
    // const blogData = blogs.records[0];
    return <OfferProductDetail />;
}

