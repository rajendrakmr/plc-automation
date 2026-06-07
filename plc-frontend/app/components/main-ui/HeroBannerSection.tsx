"use client";

import { useRef, useState, useEffect } from "react";
import styles from "@/app/css/custom.search.module.css";

export default function HeroBannerSection() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const [showDropdown, setShowDropdown] =
        useState(false);

    const [isFocused, setIsFocused] =
        useState(false);

    // actual searched results
    const [results, setResults] = useState<
        string[]
    >([]);

    const searchRef =
        useRef<HTMLDivElement>(null);

    // default suggestion list
    const defaultSuggestions = [
        "Please try to be as accurate as possible with the part number or description",
        "We can quote 1000s of parts, here are some popular searches",
    ];

    // close dropdown outside click
    useEffect(() => {
        const handleOutside = (
            event: MouseEvent
        ) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(
                    event.target as Node
                )
            ) {
                setShowDropdown(false);
                setIsFocused(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutside
            );
        };
    }, []);

    // live search
    useEffect(() => {
        // input focus nahi hua
        if (!isFocused) return;

        // empty input → default suggestions
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);

        const timeout = setTimeout(() => {
            // demo filter search
            const filtered =
                defaultSuggestions.filter(
                    (item) =>
                        item
                            .toLowerCase()
                            .includes(
                                query.toLowerCase()
                            )
                );

            setResults(filtered);

            setLoading(false);
        }, 300);

        return () =>
            clearTimeout(timeout);
    }, [query, isFocused]);

    // click suggestion
    const handleSelect = (
        item: string
    ) => {
        setQuery(item);

        setShowDropdown(false);

        console.log(
            "Selected:",
            item
        );

        // router.push(`/search?q=${item}`)
    };

    // searched results else default suggestions
    const displayItems =
        query.trim() && results.length > 0
            ? results
            : defaultSuggestions;

    return (
        <section className={styles.rkHeroSection}>
            <div className={styles.rkHeroOverlay} />

            <div className={styles.rkHeroContainer}>
                <div className={styles.rkHeroContent}>
                    <h1 className={styles.rkHeroTitle}>
                        Need an automation or control part quickly?
                    </h1>

                    <div className={styles.rkHeroSearch}>
                        <input
                            type="text"
                            placeholder="Search part number"
                            className={styles.rkHeroInput}
                        />

                        <button
                            type="button"
                            className={styles.rkHeroButton}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line
                                    x1="21"
                                    y1="21"
                                    x2="16.65"
                                    y2="16.65"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}