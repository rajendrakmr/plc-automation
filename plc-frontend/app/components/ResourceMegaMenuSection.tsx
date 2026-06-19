"use client";

import Image from "next/image";
import Link from "next/link";
import { useFetchData } from "../utils/useFetchData";

 
export interface Blog {
    blog_id: number;
    blog_title: string;
    blog_slug: string;
    blog_excerpt: string;
    blog_content: string;
    blog_img_url: string;
    blog_published_at: string | null; 
}

function truncate(str: string, words = 5) {
    const w = str.trim().split(/\s+/);
    return w.length <= words ? str : w.slice(0, words).join(" ") + "...";
}
export default function ResourceMegaMenuSection({ resources }: { resources?: { name: string, url: string }[] }) {
    const { data: BLOGS, loading: BlogLoading } = useFetchData<Blog[]>({
        url: '/blogs/feature',
        params: {
            limit: 6,
            type: "mega"
        }, 
    });

    return (
        <div className="rk_mega_dropdown">
            <div className="rk_mega_wrap">
                <div className="rk_mega_inner"> 
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
                                    href="/blogs"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/blogs`;
                                    }}
                                    className="rk_mega_view_all"
                                >
                                    View all Blogs
                                </Link>
                            </li>
                        </ul>
                    </div> 
                    <div className="rk_mega_right">
                        <p className="rk_mega_desc">
                            We supply automation and industrial control
                            equipment from leading global manufacturers.
                        </p>

                        <div className="rk_mega_blogcards_grid">
                            {BLOGS?.slice(0, 6).map((brand) => (
                                <Link
                                    href={`/blog/${brand.blog_slug}`}
                                    key={brand.blog_id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/blog/${brand.blog_slug}`;
                                    }}
                                    className="rk_mega_card"
                                >
                                    <div className="rk_mega_card_img">
                                        <Image
                                            src={`/assets/engineering-services-1.jpg`}
                                            alt={brand.blog_title}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className="rk_mega_card_info">
                                        <span className="rk_mega_card_name">
                                            {truncate(brand.blog_title,7)}
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