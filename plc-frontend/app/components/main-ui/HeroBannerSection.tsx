"use client";

import { useRef, useState, useEffect } from "react";
import styles from "@/app/css/custom.search.module.css";
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

const defaultSuggestions = [
  "Please try to be as accurate as possible with the part number or description",
  "We can quote 1000s of parts, here are some popular searches",
];

export default function HeroBannerSection() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(query, 400);

  const { loading: prdLoading, data } = useGetData<PaginatedResponse<Product>>({
    url: "/products/list",
    params: {
      page: 1,
      limit: 8,
      search: debouncedSearch || undefined,
    },
  });

  const products = data?.records ?? [];

  // outside click → close
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <section className={styles.rkHeroSection}>
      <div className={styles.rkHeroOverlay} />
      <div className={styles.rkHeroContainer}>
        <div className={styles.rkHeroContent}>
          <h1 className={styles.rkHeroTitle}>
            Need an automation or control part quickly?
          </h1>

          <div className={styles.rkHeroSearch} ref={searchRef}>
            <input
              type="text"
              placeholder="Search part number"
              className={styles.rkHeroInput}
              value={query}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
            />
            <button type="button" className={styles.rkHeroButton}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className={styles.rkHeroDropdown}>
                {!debouncedSearch ? (
                  // Default hints
                  <div className={styles.rkHeroHints}>
                    {defaultSuggestions.map((hint, i) => (
                      <p key={i} className={styles.rkHeroHintText}>{hint}</p>
                    ))}
                  </div>
                ) : prdLoading ? (
                  <div className={styles.rkHeroDropdownItem}>Searching...</div>
                ) : products.length === 0 ? (
                  <div className={styles.rkHeroDropdownItem}>No results found</div>
                ) : (
                  <>
                    <div className={styles.rkHeroDropdownTitle}>Matching Results</div>
                    <ul className={styles.rkHeroDropdownList}>
                      {products.map((item) => (
                        <Link
                          key={item.product_id}
                          href={`/product/${item.url}`}
                          onClick={() => setShowDropdown(false)}
                        >
                          <li className={styles.rkHeroDropdownItem}>
                            <span className={styles.rkHeroDot}>•</span>
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
        </div>
      </div>
    </section>
  );
}