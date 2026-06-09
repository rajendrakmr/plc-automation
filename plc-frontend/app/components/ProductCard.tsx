/* ───────────────── PRODUCT CARD COMPONENT ───────────────── */

import Image from "next/image";
import Link from "next/link";

interface Product {
    id?: number;
    name: string;
    brand: string;
    price?: string;
    image?: string;
    partNumber?: string;
    description?: string;
    stock?: "In Stock" | "Limited" | "Back Order";
    status?: "In Stock" | "Limited" | "Back Order";
    category?: string;
    href?: string;
}


const stockConfig = {
    "In Stock": {
        label: "In Stock",
        className: "badge-stock badge-in success",
    },
    "Limited": {
        label: "Limited",
        className: "badge-stock badge-low warning",
    },
    "Back Order": {
        label: "Back Order",
        className: "badge-stock badge-out error",
    }
};


export default function ProductCard({ products }: { products: Product[] }) {
    return (

        <div className="pc-grid">
            {products.map((p: Product) => {
                const stock = p.status ?? "In Stock";

                const { label, className } = stockConfig[stock];

                const href =
                    p.href ?? `/detail/${p.partNumber}`;

                return (
                    <div
                        className="pc-card"
                        key={p.id}
                    >



                        {/* BODY */}
                        <div className="pc-body">
                            <h4 className="pc-name">
                                {p.name}
                            </h4>
                            <div className="pc-meta">
                                <span className="pc-brand">
                                    {p.brand}
                                </span>

                                <span className={className}>
                                    {label}
                                </span>
                            </div>

                            {p.partNumber && (
                                <p className="pc-part">
                                    Part #:{" "}
                                    <code>
                                        {p.partNumber}
                                    </code>
                                </p>
                            )}


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