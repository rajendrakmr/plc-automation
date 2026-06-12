/* ───────────────── PRODUCT CARD COMPONENT ───────────────── */

import Image from "next/image";
import Link from "next/link";


export interface ProductMeta {
    product_id: number;
    meta_key: string;
    meta_title: string;
    meta_desc: string;
    plc_trn_pmeta_id: number;
    created_at: string;
}

export interface Category {
    category_id: number;
    cat_name: string;
}

export interface ProductType {
    product_type_id: number;
    name: string;
}

export interface Product {
    product_id: number;
    part_no: string;
    short_desc: string;
    image_url: string;
    meta_keywords: string;
    stock: "in-stock" | "limited" | "out-stock";
    url: string;
    product_desc: string;
    meta_title: string;
    meta_description: string; 
    meta: ProductMeta[];
    category: Category;
    product_type: ProductType;
}


const stockConfig = {
    "in-stock": {
        label: "In Stock",
        className: "badge-stock badge-in success",
    },
    "limited": {
        label: "Limited",
        className: "badge-stock badge-low warning",
    },
    "out-stock": {
        label: "Back Order",
        className: "badge-stock badge-out error",
    }
};


export default function ProductCard({ products }: { products: Product[] }) {
    return (

        <div className="pc-grid">
            {products?.map((p: Product) => {
                const stock = p.stock ?? "In Stock"; 
                const { label, className } = stockConfig[stock]; 
                const href = `/detail/${p.url}`;

                return (
                    <div
                        className="pc-card"
                        key={p.product_id}
                    > 
                        <div className="pc-body">
                            <h4 className="pc-name">
                                {p.part_no}
                            </h4>
                            <div className="pc-meta">
                                <span className="pc-brand">
                                    {p?.category?.cat_name}
                                </span>

                                <span className={className}>
                                    {label}
                                </span>
                            </div>

                            {/* {p.part_no && (
                                <p className="pc-part">
                                    Part #:{" "}
                                    <code>
                                        {p.part_no}
                                    </code>
                                </p>
                            )}  */}
                            <p className="pc-cart"><Image width={14} height={14} src="/assets/common/tick.svg" alt="Tick" /> 12 Month Warranty </p>
                            <p className="pc-cart"><Image width={14} height={14} src="/assets/common/tick.svg" alt="Tick" /> Dispatch Immediately </p>
                            <p className="pc-cart"><Image width={14} height={14} src="/assets/common/tick.svg" alt="Tick" /> Delivery Worldwide </p>

                            <div className="pc-footer">
                                <Link
                                    href={href}
                                    className={`pc-btn`}
                                > 
                                    Enquire &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

    );
}