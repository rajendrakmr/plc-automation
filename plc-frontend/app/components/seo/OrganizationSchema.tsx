import { useEffect } from "react";

export default function OrganizationSchema() {
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "PLC Automation India",
            url: "https://plcautomation.in",
            logo: "https://plcautomation.in/logo.png",
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-XXX-XXX-XXXX",
                contactType: "sales",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
            },
            sameAs: [
                "https://www.linkedin.com/company/plc-automation",
                "https://twitter.com/plcautomation",
            ],
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.innerHTML = JSON.stringify(schema);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return null;
}