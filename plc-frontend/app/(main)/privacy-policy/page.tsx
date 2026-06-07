import BredCrumbsSection from "@/app/components/BredCrumbsSection";
import "@/app/components/css/product.css"
import Link from "next/link";
import ContactUsSection from "@/app/components/ContactUsSection";


export const metadata = {
    title: "Privacy Commitment - Safeguarding Your Information",
    description: "Read our Privacy Policy to understand how PLC Automation Group safeguards your data. Learn about our commitment to maintaining the security and confidentiality of your personal information.",
};

export default function PrivacyPolicy() {
    return (
        <main> 
            <BredCrumbsSection
                title={`Privacy Policy`}
                bgImage="/assets/engineering-services-4.jpg"
                items={[
                    { label: "Home", link: "/" },
                    { label: "Privacy Policy", link: "" },
                ]}
            />

            <section className="section_grey_content">
                <div className="section_container pd-inner">

                    {/* LEFT */}
                    <div className="pd-left">

                        <h1 className="pd-code">COLLECTION OF PERSONAL INFORMATION</h1>

                        <p className="desc">
                            When you use our services or Website, you may be asked for personally identifiable information such as your name, address, email address, telephone number. Cookie information, pages you have requested and your IP address may also be recorded by us and/or third parties from your browser as set out in this policy.
                        </p>



                        {/* DESCRIPTION */}
                        <div className="pd-desc">
                            <h3>POLICY CHANGES</h3>
                            <p>Changes in this policy will be posted on our Website. You are advised to check our Website regularly to view our most recent privacy policy.</p>
                        </div>
                        <div className="pd-desc">
                            <h3>Contacting Us About Privacy</h3>
                            <p>
                                If you have any questions about this privacy statement, or our Website, you may contact us by clicking here. <Link href="/contact-us">Contact Us</Link></p>
                        </div>

                    </div>

                    {/* RIGHT (RFQ FORM) */}
                    <div className="pd-right">
                        <div className="rfq-card">
                            <h3>
                                Lets Get In Touch
                            </h3>

                            <form className="rfq-form">
                                <input placeholder="Name" />
                                <input placeholder="Company Name" />

                                <div className="phone-group">
                                    <select>
                                        <option>Singapore (+65)</option>
                                        <option>India (+91)</option>
                                    </select>
                                    <input placeholder="Phone Number" />
                                </div>

                                <input placeholder="Email" />
                                <textarea placeholder="Message"></textarea>

                                <button type="submit">Enquiry Us</button>
                            </form>

                            <p className="privacy">
                                For more information on how your data is processed, read our privacy policy.
                            </p>
                        </div>
                    </div>

                </div>
            </section>


            <ContactUsSection />
        </main>
    );
}