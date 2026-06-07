"use client";

import { useRef, useState, useEffect } from "react";
import styles from "../../css/HeroSearch.module.css";

export default function HomeSearchSection() {

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);

    const [suggestions, setSuggestions] = useState<string[]>([]);

    const searchRef = useRef<HTMLDivElement>(null);

    // close dropdown outside click
    useEffect(() => {

        const handleOutside = (event: MouseEvent) => {

            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);

        return () => {
            document.removeEventListener("mousedown", handleOutside);
        };

    }, []);

    // search api
    const handleSearch = async () => {
        console.log(`Searching for: ${query}`);

        // if (!query.trim()) return;

        // try {

        //     setLoading(true);

        //     // open dropdown
        //     setShowDropdown(true);

        //     const res = await fetch(
        //         `/api/search?q=${query}`
        //     );

        //     const data = await res.json();

        //     setSuggestions(data.results || []);

        // } catch (error) {

        //     console.log(error);

        // } finally {

        //     setLoading(false);

        // }
    };

    return (

        <section className={styles.plcHeroSection}>

            {/* overlay */}
            <div className={styles.plcHeroOverlay}></div>

            {/* content */}
            <div className={styles.plcHeroContent}>

                <h1 className={styles.plcHeroTitle}>
                    Need an automation or 
                    control part quickly?
                </h1> 
                <div
                    className={styles.plcHeroSearch}
                    ref={searchRef}
                >

                    {/* input */}
                    <input
                        type="text"
                        placeholder="Search part number"
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
                        }
                        className={styles.plcHeroSearchInput}
                    />

                    {/* button */}
                    <button
                        type="button"
                        className={styles.plcHeroSearchBtn}
                        onClick={handleSearch}
                    >

                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle
                                cx="11"
                                cy="11"
                                r="8"
                            ></circle>

                            <line
                                x1="21"
                                y1="21"
                                x2="16.65"
                                y2="16.65"
                            ></line>

                        </svg>

                    </button>

                    {/* dropdown */}
                    {showDropdown && (

                        <div
                            className={
                                styles.plcHeroDropdown
                            }
                        >

                            {loading ? (

                                <div
                                    className={
                                        styles.plcHeroDropdownItem
                                    }
                                >
                                    Searching...
                                </div>

                            ) : suggestions.length > 0 ? (

                                suggestions.map(
                                    (item, index) => (

                                        <div
                                            key={index}
                                            className={
                                                styles.plcHeroDropdownItem
                                            }
                                        >
                                            ✓ {item}
                                        </div>

                                    )
                                )

                            ) : (

                                <div
                                    className={
                                        styles.plcHeroDropdownItem
                                    }
                                >
                                    No results found
                                </div>

                            )}

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}