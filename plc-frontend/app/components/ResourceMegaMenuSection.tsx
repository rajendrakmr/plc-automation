"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ResourceMegaMenuSection({popularBrands, resources}: {popularBrands: {name: string, image: string, url: string}[], resources?: {name: string, url: string}[]}) {
    
    return (
        <div className="rk_mega_dropdown">
            <div className="rk_mega_wrap">
                <div className="rk_mega_inner">

                    {/* LEFT */}
                    <div className="rk_mega_left">
                        <p className="rk_mega_left_title">
                            Most popular
                        </p>

                        <ul className="rk_mega_brand_list">
                            {resources?.map((row) => (
                                <li key={row.url}>
                                    <Link
                                        href={row.url}
                                        className="rk_mega_brand_link"
                                    >
                                        {row.name}
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <Link
                                    href="/brands"
                                    className="rk_mega_view_all"
                                >
                                    View all Blogs
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
                            {popularBrands.slice(0, 6).map((brand) => (
                                <Link
                                    href={brand.url}
                                    key={brand.url}
                                    className="rk_mega_card"
                                >
                                    <div className="rk_mega_card_img">
                                        <Image
                                            src={brand.image}
                                            alt={brand.name}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className="rk_mega_card_info">
                                        <span className="rk_mega_card_name">
                                            {brand.name}
                                        </span>

                                        <span className="rk_mega_card_cta">
                                            Read Now
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