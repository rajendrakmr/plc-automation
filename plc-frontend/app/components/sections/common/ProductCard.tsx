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
        className: "rm_badgeStock rm_badgeIn",
    },
    "Limited": {
        label: "Limited",
        className: "rm_badgeStock rm_badgeLow",
    },
    "Obsolete": {
        label: "Obsolete",
        className: "rm_badgeStock rm_badgeOut",
    },
};

export default function PCCard({
    products,
}: {
    products: Product[];
}) {
    return (

        <div className="rm_cardGrid">

            {products.map((p: Product) => {

                const stock =
                    p.status ?? "In Stock";

                const {
                    label,
                    className,
                } = stockConfig[stock];

                const href =
                    p.href ??
                    `/detail/${p.partNumber}`;

                return (

                    <div
                        className="rm_card"
                        key={p.id}
                    >

                        {/* IMAGE */}
                        <div className="rm_imgWrap">

                            <img
                                src={p.image}
                                alt={p.name}
                                className="rm_img"
                            />

                            {p.category && (
                                <span className="rm_category">
                                    {p.category}
                                </span>
                            )}

                        </div>

                        {/* BODY */}
                        <div className="rm_body">

                            <div className="rm_meta">

                                <span className="rm_brand">
                                    {p.brand}
                                </span>

                                <span
                                    className={
                                        className
                                    }
                                >
                                    {label}
                                </span>

                            </div>

                            <h4 className="rm_name">
                                {p.name}
                            </h4>

                            {p.partNumber && (
                                <p className="rm_part">

                                    Part #:

                                    <code>
                                        {p.partNumber}
                                    </code>

                                </p>
                            )}

                            {p.description && (
                                <p className="rm_desc">
                                    {p.description}
                                </p>
                            )}

                            <div className="rm_footer">

                                <Link
                                    href={href}
                                    className="rm_btn"
                                >
                                    Enquire →
                                </Link>

                            </div>

                        </div>

                    </div>

                );
            })}

        </div>

    );
}