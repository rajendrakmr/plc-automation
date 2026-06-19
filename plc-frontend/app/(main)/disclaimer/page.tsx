import BredCrumbsSection from "@/app/components/BredCrumbsSection";
import ContactUsSection from "@/app/components/ContactUsSection";
import "@/app/components/css/product.css"


export const metadata = {
    title: "Disclaimer - Understanding Our Website Information",
    description: "Explore our Disclaimer to comprehend the nature of information on PLC Automation Group's website. Learn about the limitations of content accuracy and the responsible use of the provided information.",
    keywords: "PLC AUTOMATION PTE LTD",
};

export default function Disclaimer() {
    return (
        <main>
            <BredCrumbsSection
                title={`Disclaimer`}
                bgImage="/assets/engineering-services-4.jpg"
                items={[
                    { label: "Home", link: "/" },
                    { label: "Disclaimer", link: "" },
                ]}
            />

            <section className="section_grey_content">
                <div className="section_container" style={{ paddingTop: "0px" }}>

                    {/* LEFT */}
                    <div className="pd-left">

                        {/* <h1 className="pd-code">COLLECTION OF PERSONAL INFORMATION</h1> */}

                        <p className="desc">
                            PLC AUTOMATION GROUP is an independent distributor of obsolete industrial automation equipment. We are not an Authorized Distributor or in any way affiliated with Allen Bradley, Fanuc, HP, Schneider Electric, Siemens and any other manufacturers. We have developed our own global sourcing relationships with End Users, independent distributors, resellers, asset recovery companies, independent suppliers and procure our equipment through such sources. PLC Automation Group sells hardware products only and does not resell software licenses. Some hardware products may contain software and may not be legally operated without first purchasing a proper software license from the manufacturer of such products. PLC Automation Group respects the intellectual property of others, and we ask our customers to do the same. Customer acknowledges and agrees that We do not provide any operating system software or software right-to-use licenses with the products it sells. Customers understand and agree that proper software licensing, software maintenance and upgrades are subject to applicable manufacturer's Software Licensing Agreement. Customers shall be solely responsible for obtaining proper software licenses for applicable products from the manufacturer. As PLC Automation Group is not an Authorized Distributor of the products, manufacturers' warranties do not apply. Customers must check the manufacturer's website for further information. All listed logos, trademarks or service marks are property of their respective owners.
                        </p>

                    </div>



                </div>
            </section>

            <ContactUsSection />
        </main>
    );
}