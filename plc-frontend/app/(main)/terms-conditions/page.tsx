import "@/app/components/css/product.css"  
import BreadCrumbsSection from "@/app/components/BredCrumbsSection"; 
import FaqSection from "@/app/components/main-ui/FAQSection";
import ContactUsSection from "@/app/components/ContactUsSection";
 
export const metadata = {
    title: "Terms and Conditions",
    description: "Explore the Terms and Conditions of PLC Automation Group to understand the guidelines governing the use of our website, products, and services. Learn about your rights and responsibilities as a user, including information on product warranties, returns, and limitations of liability.",
};

export default function TermsConditions() {
    return (
        <main>
            <BreadCrumbsSection
                title={`Terms and Conditions`}
                bgImage="/assets/engineering-services-4.jpg"
                items={[
                    { label: "Home", link: "/" },
                    { label: "Terms and Conditions", link: "" },
                ]}
            />


             <section className="section_grey_content">
                <div className="section_container"  style={{paddingTop:"0px"}}>

                    {/* LEFT */}
                    <div className="pd-left">

                        <h1 className="pd-code">Terms & Conditions</h1> 
                        {/* DESCRIPTION */}
                        <div className="pd-desc">
                            <h3>
                                Application of Terms and Conditions</h3>
                            <p>
                                The Supplier shall supply and the Customer shall purchase the Goods and Services in accordance with the quotation which shall be subject to these Terms and Conditions; and The Contract shall be to the exclusion of any other terms and conditions subject to which any such quotation is accepted or purported to be accepted, or any such order is made or purported to be made, by the Customer.</p>
                        </div> 

                    </div> 

                </div>
            </section>
            <FaqSection />
             
            <ContactUsSection />
        </main>
    );
}