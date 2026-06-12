"use client";
import FeatureHighlightsBar from "@/app/components/FeatureHighlightsBar";
import { useState, useEffect } from "react";
import { PaginatedResponse } from "@/app/components/hooks/useFetch";

import {
    Button,
    CardContent,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import PCCard from "@/app/components/PCCard";
import ProductBredCrumbs from "@/app/components/main-ui/ProductBredCrumbs";
import PrdHeroBannerSection from "@/app/components/main-ui/PrdHeroBannerSection";
import { useFetchData } from "@/app/utils/useFetchData";
import { useGetData } from "@/app/utils/useGetData";
import { FetchLoader } from "@/app/components/FetchLoader";

interface Categories {
    category_id: number;
    cat_name: string;
    cat_slug: string;
}
type Props = {
    params: Promise<{
        brand: string;
    }>;
};



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


function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}
export default function OfferProductList({
    params,
}: Props) {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [stock, setStockSearch] = useState("");
    const [category_id, setCategoryId] = useState(0);
    const debouncedSearch = useDebounce(search, 400);
    const availabilityOptions = [
        { label: "In Stock", value: "in-stock" },
        { label: "Limited", value: "limited" },
        { label: "Back Order", value: "out-stock" },
    ];
    const resetFilters = () => {
        setCategoryId(0);
        setStockSearch("");
        setSearch("");
        setPage(1);
    };

    const { data: categories, loading: catLoading } = useFetchData<Categories[]>({
        url: '/categories/list'
    });

    const { loading, data, total, totalPages, isSearchLoading } =
        useGetData<PaginatedResponse<Product>>({
            url: "/products/list",
            params: {
                page,
                limit,
                search: debouncedSearch || undefined,
                stock: stock || undefined,
                category_id: category_id || undefined,
            },
        });

    const products = data?.records ?? [];
    const isLoading = loading || isSearchLoading;

    return (
        <main>
            <FeatureHighlightsBar />
            <ProductBredCrumbs
                title={"Offer Product"}
                bgImage="/assets/engineering-services-4.jpg"
                items={[
                    {
                        label: "Home",
                        link: "/",
                    },
                    {
                        label: "Offer Product",
                        link: "",
                    },
                ]}
            />
            <section className="section_white_content">
                <div className="section_container rm_section">
                    <div className="rm_container">
                        <aside className="rm_filter">

                            <CardContent>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 700,
                                    }}
                                >
                                    Filters
                                </Typography>

                                <Stack spacing={2}>

                                    <TextField
                                        select
                                        label="Manufacturer"
                                        size="small"
                                        value={category_id}
                                        onChange={(e) => {
                                            setCategoryId(parseInt(e.target.value));
                                            setPage(1);
                                        }}
                                        fullWidth
                                        SelectProps={{
                                            MenuProps: {
                                                PaperProps: {
                                                    sx: {
                                                        maxHeight: 300,
                                                        "& .MuiMenuItem-root": {
                                                            fontSize: "14px",
                                                            minHeight: "32px",
                                                            padding: "6px 12px"
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value={0}>
                                            All
                                        </MenuItem>

                                        {categories?.map(
                                            (item) => (
                                                <MenuItem
                                                    key={item.category_id}
                                                    value={item.category_id}
                                                >
                                                    {item.cat_name}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextField>

                                    <TextField
                                        select
                                        label="Availability"
                                        size="small"
                                        value={stock}
                                        onChange={(e) => {
                                            setStockSearch(e.target.value);
                                            setPage(1);
                                        }}
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            All
                                        </MenuItem>

                                        {availabilityOptions.map(
                                            (item) => (
                                                <MenuItem
                                                    key={item?.label}
                                                    value={item?.value}
                                                >
                                                    {item?.label}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextField>

                                    <TextField
                                        label="Search"
                                        size="small"
                                        placeholder="Search part No..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(
                                                e.target.value
                                            );

                                            setPage(1);
                                        }}
                                        fullWidth
                                    />

                                    <Button
                                        variant="contained"
                                        onClick={
                                            resetFilters
                                        }
                                        sx={{
                                            backgroundColor: "var(--blue)",
                                            "&:hover": {
                                                backgroundColor: "var(--hover-blue)",
                                            }
                                        }}
                                    >
                                        Reset Filters
                                    </Button>

                                </Stack>

                            </CardContent>

                        </aside>

                        {/* RIGHT SIDE */}
                        <div className="rm_content">
                            <div className="rm_topbar">
                                <div className="rm_count">
                                    Showing <strong> {total} </strong> products
                                </div>
                            </div>
                            <div style={{ position: "relative", minHeight: "200px" }}>
                                <FetchLoader show={isLoading} />
                                <div className="rm_grid">
                                    <PCCard products={products} />
                                </div>
                            </div>
                            {!isLoading && products.length === 0 && (
                                <div className="rm_empty">No products found.</div>
                            )}

                            {products.length > 0 && (
                                <>
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

                                </>
                            ) }

                        </div>

                    </div>

                </div>
            </section>
            <PrdHeroBannerSection />
        </main>
    );
}