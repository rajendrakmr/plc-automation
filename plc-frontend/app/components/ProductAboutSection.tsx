// import "./ProductAboutSection.css";
import { Package, Users, Globe } from "lucide-react";
import Image from "next/image";


interface Product {
    title?: string;
    description?: string; 
}
const ProductAboutSection = ({ products }: { products: Product }) => {
    return (
        <section className="section_white_content">
            <div className="section_container abb-container">
                <div className="abb-content">
                    <h2>{products?.title}</h2>

                    <p>
                        Browse our wide-ranging list of new, obsolete and refurbished ABB
                        parts, including variable speed drives, DC drives, PLCs and general
                        automation spares.
                    </p>

                    <p>
                        All components are sold as standard with a full 12-month warranty.
                    </p>
                </div>

                <div className="abb-stats">
                    <div className="stat-item">
                        <div className="icon-wrapper">
                            <Image alt="countries served" width={42} height={42} src={'/assets/Icons/shipping-plcautomationgroup.png'}/>
                        </div>

                        <div>
                            <h3>4,135,610</h3>
                            <span>parts supplied</span>
                        </div>
                    </div>

                   

                    <div className="stat-item">
                        <div className="icon-wrapper">
                           <Image alt="countries served" width={42} height={42} src={'/assets/Icons/academic-plcautomationgroup.svg'}/>
                        </div>

                        <div>
                            <h3>97,235</h3>
                            <span>customers worldwide</span>
                        </div>
                    </div>

                    <div className="stat-item">
                        <div className="icon-wrapper">
                           <Image alt="countries served" width={42} height={42} src={'/assets/Icons/globus-plcautomationgroup.png'}/>
                        </div>

                        <div>
                            <h3>177</h3>
                            <span>countries served</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductAboutSection;