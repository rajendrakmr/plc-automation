/* ───────────────── PRODUCT CARD COMPONENT ───────────────── */

import Link from "next/link";

interface Product {
    id?: number;
    name: string;
    brand: string;
    price?: string;
    image?: string;
    partNumber?: string;
    description?: string;
    stock?: "In Stock" | "Limited" | "Obsolete";
    status?: "In Stock" | "Limited" | "Obsolete";
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
    "Obsolete": {
        label: "Obsolete",
        className: "badge-stock badge-out error",
    }
};


export default function PCCard({ products }: { products: Product[] }) {
    return (

        <div className="pcm-grid">
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
                        {/* IMAGE */}
                        <div className="pc-img-wrap">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="pc-img"
                            />

                            {p.category && (
                                <span className="pc-category">
                                    {p.category}
                                </span>
                            )}
                        </div>

                        {/* BODY */}
                        <div className="pc-body">

                            <div className="pc-meta">
                                <span className="pc-brand">
                                    {p.brand}
                                </span>

                                <span className={className}>
                                    {label}
                                </span>
                            </div>

                            <h4 className="pc-name">
                                {p.name}
                            </h4>

                            {p.partNumber && (
                                <p className="pc-part">
                                    Part #:{" "}
                                    <code>
                                        {p.partNumber}
                                    </code>
                                </p>
                            )}

                            {p.description && (
                                <p className="pc-part">
                                    {p.description}
                                </p>
                            )}

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