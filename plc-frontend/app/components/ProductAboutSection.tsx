import Image from "next/image";

interface Product {
    title?: string;
    description?: string;
    cat_short_text?: string;
}
const ProductAboutSection = ({ products }: { products: Product }) => {

    const stats = [
        {
            icon: "/assets/Icons/shipping-plcautomationgroup.png",
            alt: "parts supplied",
            value: "4,135,610",
            label: "parts supplied",
        },
        {
            icon: "/assets/Icons/academic-plcautomationgroup.svg",
            alt: "customers worldwide",
            value: "97,235",
            label: "customers worldwide",
        },
        {
            icon: "/assets/Icons/globus-plcautomationgroup.png",
            alt: "countries served",
            value: "177",
            label: "countries served",
        },
    ]; 

    return (
        <section className="section_white_content">
            <div className="section_container abb-container">
                <div className="abb-content">
                    <h2>{products?.title}</h2>
                    {
                        products?.cat_short_text && <div
                            className="product_desc"
                            dangerouslySetInnerHTML={{ __html: products.cat_short_text }}
                        />
                    }
                    {/* <p>
                        Browse our wide-ranging list of new, obsolete and refurbished ABB
                        parts, including variable speed drives, DC drives, PLCs and general
                        automation spares.
                    </p>
                    <p>
                        All components are sold as standard with a full 12-month warranty.
                    </p> */}
                </div>
                <div className="abb-stats">
                    {stats.map((stat) => (
                        <div className="stat-item" key={stat.label}>
                            <div className="icon-wrapper">
                                <Image alt={stat.alt} width={42} height={42} src={stat.icon} />
                            </div>
                            <div>
                                <h3>{stat.value}</h3>
                                <span>{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductAboutSection;