type BreadcrumbItem = {
    label: string;
    link?: string;
};

type BreadcrumbProps = {
    title: string;
    items: BreadcrumbItem[];
    bgImage: string;
};

const ProductBredCrumbs: React.FC<BreadcrumbProps> = ({ title, items, bgImage }) => {
    return (
        <section className="section_white_content">
            <div className="product_section_bred">
                <div className="product-breadcrumb-inner">
                    <div className="product-breadcrumb-path">
                        {items.map((item, index) => (
                            <span key={index} className="product-breadcrumb-item">
                                {item.link ? (
                                    <a href={item.link}>{item.label}</a>
                                ) : (
                                    <span className="product-active">{item.label}</span>
                                )}

                                {index < items.length - 1 && (
                                    <span className="product-separator"> / </span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductBredCrumbs;