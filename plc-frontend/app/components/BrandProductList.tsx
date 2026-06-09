"use client";

import { useMemo, useState } from "react";

import { catalogProductPages } from "@/app/data/content";
import ProductCard from "@/app/components/ProductCard";
import {
    Button,
    CardContent,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

/* ───────────────── TYPES ───────────────── */

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

/* ───────────────── STOCK CONFIG ───────────────── */

const stockConfig = {
    "In Stock": {
        label: "In Stock",
        className: "badge-stock badge-in",
    },
    Limited: {
        label: "Limited",
        className: "badge-stock badge-limited",
    },
    BackOrder: {
        label: "Back Order",
        className: "badge-stock badge-obsolete",
    },
};

/* ───────────────── PAGE ───────────────── */

export default function BrandProductList() {
    const [manufacturer, setManufacturer] =
        useState("");

    const [availability, setAvailability] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [selectedBrand, setSelectedBrand] =
        useState("All");

    const [productsPerPage, setProductsPerPage] = useState(8);

    /* ALL PRODUCTS */

    const allProducts: Product[] = useMemo(
        () => catalogProductPages.flat(),
        []
    );

    /* BRANDS */

    const brands = useMemo(
        () => [
            "All",
            ...Array.from(
                new Set(
                    allProducts.map(
                        (p) => p.brand
                    )
                )
            ).sort(),
        ],
        [allProducts]
    );

    /* FILTER OPTIONS */

    const manufacturerOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    allProducts.map(
                        (p) => p.brand
                    )
                )
            ).sort(),
        [allProducts]
    );

    const availabilityOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    allProducts
                        .map(
                            (p) => p.status
                        )
                        .filter(Boolean)
                )
            ),
        [allProducts]
    );

    /* FILTER PRODUCTS */

    const filteredProducts = useMemo(() => {
        const searchTerm =
            search.trim().toLowerCase();

        return allProducts.filter((p) => {
            /* BRAND FILTER */

            const brandMatch =
                selectedBrand === "All" ||
                p.brand === selectedBrand;

            /* MANUFACTURER FILTER */

            const manufacturerMatch =
                !manufacturer ||
                p.brand === manufacturer;

            /* AVAILABILITY FILTER */

            const availabilityMatch =
                !availability ||
                p.status === availability;

            /* SEARCH FILTER */

            const searchMatch =
                !searchTerm ||
                p.name
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                p.brand
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                p.partNumber
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                p.description
                    ?.toLowerCase()
                    .includes(searchTerm);

            return (
                brandMatch &&
                manufacturerMatch &&
                availabilityMatch &&
                searchMatch
            );
        });
    }, [
        allProducts,
        selectedBrand,
        manufacturer,
        availability,
        search,
    ]);

    /* PAGINATION */

    const totalPages = Math.ceil(
        filteredProducts.length /
        productsPerPage
    );

    const currentProducts = useMemo(() => {
        const start =
            (currentPage - 1) *
            productsPerPage;

        const end =
            start + productsPerPage;

        return filteredProducts.slice(
            start,
            end
        );
    }, [
        filteredProducts,
        currentPage,
    ]);

    /* RESET */

    const resetFilters = () => {
        setManufacturer("");
        setAvailability("");
        setSearch("");
        setSelectedBrand("All");
        setCurrentPage(1);
    };

    return (
        <section className="section_grey_content">
            <div className="section_container product-container">

                {/* PRODUCT LIST */}

                <div className="product-list">
                    {/* TOP BAR */}

                    <div className="product-topbar">
                        {/* SEARCH */}

                        <div className="prd-search-box">
                            <input
                                type="text"
                                placeholder="Enter Part Number, Manufacturer..."
                                value={search}
                                onChange={(
                                    e
                                ) => {
                                    setSearch(
                                        e.target
                                            .value
                                    );

                                    setCurrentPage(
                                        1
                                    );
                                }}
                            />
                        </div>

                        {/* RESULT COUNT */}

                        <div className="product-count">
                            <div className="result-filter">
                                <span className="show-label">Show</span>

                                <TextField
                                    select
                                    size="small"
                                    value={productsPerPage}
                                    onChange={(e) =>
                                        setProductsPerPage(Number(e.target.value))
                                    }
                                    className="products-select"
                                >
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={16}>16</MenuItem>
                                    <MenuItem value={24}>24</MenuItem>
                                </TextField>

                                <span className="show-label">per page</span>
                            </div>

                            <div className="results-badge">
                                {filteredProducts.length} Results
                            </div>
                        </div>
                    </div>

                    {/* PRODUCTS */}

                    <ProductCard
                        products={
                            currentProducts
                        }
                    />

                    {/* EMPTY */}

                    {filteredProducts.length ===
                        0 && (
                            <div className="no-products">
                                No products found.
                            </div>
                        )}

                    {/* PAGINATION */}

                    {totalPages > 1 && (
                        <div className="pagination">
                            {[
                                ...Array(
                                    totalPages
                                ),
                            ].map((_, i) => (
                                <button
                                    key={i}
                                    className={
                                        currentPage ===
                                            i + 1
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            i +
                                            1
                                        )
                                    }
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}