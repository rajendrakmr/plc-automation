"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/app/components/ProductCard";
import { MenuItem, TextField } from "@mui/material";
// import { useGetData } from "../utils/useGetData";
// import { PaginatedResponse } from "./hooks/useFetch";
// import { FetchLoader } from "./FetchLoader";
// import { useFetchData } from "../utils/useFetchData";
import "../css/BrandsDirectory.css";
import { useFetchData } from "@/app/utils/useFetchData";
import { PaginatedResponse } from "../hooks/useFetch";
import { useGetData } from "@/app/utils/useGetData";
import { FetchLoader } from "../FetchLoader";


export interface ProductMeta {
    plc_trn_pmeta_id: number;
    product_id: number;
    meta_key: string;
    meta_title: string;
    meta_desc: string;
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

interface Categories {
    category_id: number;
    cat_name: string;
    cat_slug: string;
}

function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type BrandsDetailProps = {
    cat_id: number;
};

const BrandDetailProduct: React.FC<BrandsDetailProps> = ({ cat_id }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [searchInput, setSearchInput] = useState("");
    const [category_id, setCategoryId] = useState(cat_id);
    const [activeLetter, setActiveLetter] = useState("A");

    const debouncedSearch = useDebounce(searchInput, 400);
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    const { data: categories, loading: catLoading } = useFetchData<Categories[]>({
        url: '/categories/list',
        params: {
            search: activeLetter,
        }
    });


    const { loading, data, total, totalPages, isSearchLoading } =
        useGetData<PaginatedResponse<Product>>({
            url: "/products/list",
            params: {
                page,
                limit,
                search: debouncedSearch || undefined,
                category_id: category_id || undefined,
            },
        });

    const products = data?.records ?? [];
    const isLoading = loading || isSearchLoading;

    return (
        <>

            <section className="section_grey_content">
                <div className="section_container product-container">
                    <div className="product-list">

                        {/* TOPBAR */}
                        <div className="product-topbar">
                            <div className="prd-search-box">
                                <input
                                    type="text"
                                    placeholder="Enter Part Number, Manufacturer..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </div>
                            <div className="product-count">
                                <div className="result-filter">
                                    <span className="show-label">Show</span>
                                    <TextField
                                        select
                                        size="small"
                                        value={limit}
                                        onChange={(e) => {
                                            setLimit(Number(e.target.value));
                                            setPage(1);
                                        }}
                                        className="products-select"
                                    >
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={12}>12</MenuItem>
                                        <MenuItem value={15}>15</MenuItem>
                                        <MenuItem value={24}>24</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                        <MenuItem value={60}>60</MenuItem>
                                    </TextField>
                                    <span className="show-label">per page</span>
                                </div>
                                <div className="results-badge">
                                    {total ?? 0} Results
                                </div>
                            </div>
                        </div>

                        <div style={{ position: "relative", minHeight: "200px" }}>
                            <FetchLoader show={isLoading} />
                            <ProductCard products={products || []} />
                        </div>
                        {!isLoading && products && products.length === 0 && (
                            <div className="no-products">No products found.</div>
                        )}


                        {totalPages > 1 && (
                            <div className="pagination">

                                {/* Prev */}
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => p - 1)}
                                >
                                    &laquo;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter((p) => {
                                        if (totalPages <= 7) return true;
                                        if (p === 1 || p === totalPages) return true;
                                        if (Math.abs(p - page) <= 2) return true;
                                        return false;
                                    })
                                    .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                                            acc.push("...");
                                        }
                                        acc.push(p);
                                        return acc;
                                    }, [])
                                    .map((item, idx) =>
                                        item === "..." ? (
                                            <span key={`dot-${idx}`} className="pagination-dots">...</span>
                                        ) : (
                                            <button
                                                key={item}
                                                className={page === item ? "active" : "pg-item"}
                                                onClick={() => setPage(item as number)}
                                            >
                                                {item}
                                            </button>
                                        )
                                    )}
                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                >
                                    &raquo;
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default BrandDetailProduct;