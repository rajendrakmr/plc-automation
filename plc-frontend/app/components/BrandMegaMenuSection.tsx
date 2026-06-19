"use client";
import Image from "next/image";
import Link from "next/link";
export default function BrandMegaMenuSection({ popularBrands }: {
    popularBrands: {
        category_id: number;
        cat_name: string;
        cat_slug: string;
    }[]
}) {
    return (
        <div className="rk_mega_dropdown">
            <div className="rk_mega_wrap">
                <div className="rk_mega_inner">
                    <div className="rk_mega_left">
                        <p className="rk_mega_left_title">
                            Most popular
                        </p>
                        <ul className="rk_mega_brand_list">
                            {popularBrands.map((brand) => (
                                <li key={`/brands/${brand.category_id}`}>
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/brands/${brand.cat_slug}`;
                                        }}
                                        href={`/brands/${brand.cat_slug}`}
                                        className="rk_mega_brand_link"
                                    >
                                        {brand.cat_name}
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <Link
                                    href="/brands"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/brands`;
                                    }}
                                    className="rk_mega_view_all"
                                >
                                    View all manufacturers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* RIGHT */}
                    <div className="rk_mega_right">
                        <p className="rk_mega_desc">
                            We supply automation and industrial control
                            equipment from leading global manufacturers.
                        </p>

                        <div className="rk_mega_cards_grid">
                            {popularBrands.slice(0, 8).map((brand) => (
                                <Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/brands/${brand.cat_slug}`;
                                    }}
                                    href={`/brands/${brand.cat_slug}`}
                                    key={brand.category_id}
                                    className="rk_mega_card"
                                >
                                    <div className="rk_mega_card_img">
                                        <Image
                                            src={"/assets/items/abb.webp"}
                                            alt={brand.cat_name}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className="rk_mega_card_info">
                                        <span className="rk_mega_card_name">
                                            {brand.cat_name}
                                        </span>

                                        <span className="rk_mega_card_cta">
                                            View all parts
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}