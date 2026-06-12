"use client";

import { useEffect, useRef, useState } from "react";
import { useGetData } from "@/app/utils/useGetData";
import { PaginatedResponse } from "@/app/components/hooks/useFetch";
import { Product } from "@/app/types";
import Link from "next/link";

function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}

export default function ExpandSearchSection() {

    const defaultSuggestions = [
        "Please try to be as accurate as possible with the part number or description",
        "We can quote 1000s of parts, here are some popular searches",
    ];

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const debouncedSearch = useDebounce(query, 400);

    const { loading: prdLoading, data } = useGetData<PaginatedResponse<Product>>({
        url: "/products/list",
        params: {
            page: 1,
            limit: 12,
            search: debouncedSearch || "undefined",
        },
    });

    const products = data?.records ?? [];
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={`rk_expand_search ${open ? "active" : ""}`}
            ref={wrapperRef}
        >
            {/* Icon */}
            <div className="rk_expand_search_icon">
                <svg viewBox="0 0 20 20">
                    <path d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zm-.82-1.16a6 6 0 10-8.49-8.49 6 6 0 008.49 8.49z" />
                </svg>
            </div>

            {/* Input */}
            <input
                type="text"
                placeholder="Search Part Number"
                value={query}
                onFocus={() => setOpen(true)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                }}
                className="rk_expand_search_input"
            />

            {/* Dropdown */}
            {open && (
                <div className="rk_expand_dropdown">
                    {prdLoading ? (
                        <div className="rk_expand_dropdown_item">Searching...</div>
                    ) : !debouncedSearch ? (
                        // Query empty hai — hints dikhao
                        <div className="rk_expand_hints">
                            {defaultSuggestions.map((hint, i) => (
                                <p key={i} className="rk_expand_hint_text">{hint}</p>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="rk_expand_dropdown_item">No results found</div>
                    ) : (
                        <>
                            <div className="rk_expand_dropdown_title">Matching Results</div>
                            <ul className="rk_expand_dropdown_list">
                                {products.map((item) => (
                                    <Link key={item.product_id} href={`/detail/${item.url}`} onClick={() => setOpen(false)}>
                                        <li className="rk_expand_dropdown_item">
                                            <span className="rk_expand_dot">•</span>
                                            <span>{item.part_no}</span>
                                            <span>{item.category.cat_name}</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}