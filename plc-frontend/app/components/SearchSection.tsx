"use client";

import { useEffect, useRef, useState } from "react";

export default function SearchSection() {
    const [open, setOpen] = useState(false);

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);

    // searched results
    const [results, setResults] = useState<string[]>([]);

    const wrapperRef = useRef<HTMLDivElement>(null);

    // default suggestions
    const defaultSuggestions = [
        "Please try to be as accurate as possible with the part number or description",
        "We can quote 1000s of parts, here are some popular searches",
    ];

    // close outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // live search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);

        const timeout = setTimeout(() => {
            const filtered = defaultSuggestions.filter((item) =>
                item.toLowerCase().includes(query.toLowerCase())
            );

            setResults(filtered);

            setLoading(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    // click item
    const handleSelect = (item: string) => {
        setQuery(item);

        setOpen(false);

        console.log("Selected:", item);

        // router.push(`/search?q=${item}`)
    };

    // show matching results if available
    // otherwise show default suggestions
    const displayItems =
        results.length > 0 ? results : defaultSuggestions;

    return (
        <>
            <div
                className={`rk_expand_search ${open ? "active" : ""
                    }`}
                ref={wrapperRef}
            >
                {/* ICON */}
                <div className="rk_expand_search_icon">
                    <svg viewBox="0 0 20 20">
                        <path d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zm-.82-1.16a6 6 0 10-8.49-8.49 6 6 0 008.49 8.49z" />
                    </svg>
                </div>

                {/* INPUT */}
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

                {/* DROPDOWN */}
                {open && (
                    <div className="rk_expand_dropdown">
                        {loading ? (
                            <div className="rk_expand_dropdown_item">
                                Searching...
                            </div>
                        ) : (
                            <>
                                {results.length > 0 && (
                                    <div className="rk_expand_dropdown_title">
                                        Matching Results
                                    </div>
                                )}

                                <ul className="rk_expand_dropdown_list">
                                    {displayItems.map((item, index) => (
                                        <li
                                            key={index}
                                            className="rk_expand_dropdown_item"
                                            onClick={() =>
                                                handleSelect(item)
                                            }
                                        >
                                            <span className="rk_expand_dot">
                                                •
                                            </span>

                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
        
      `}</style>
        </>
    );
}