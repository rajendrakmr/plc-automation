"use client";

import { useRef, useState, useEffect } from "react";
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

export default function MobSearchSection() {
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
    <div className="mob-search" ref={searchRef}>
      <input
        type="text"
        placeholder="Search part number..."
        value={query}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
      />

      {showDropdown && (
        <div className="mob-search-dropdown">
          {!debouncedSearch ? (
            <div className="mob-search-hints">
              {defaultSuggestions.map((hint, i) => (
                <p key={i} className="mob-search-hint-text">{hint}</p>
              ))}
            </div>
          ) : prdLoading ? (
            <div className="mob-search-item">Searching...</div>
          ) : products.length === 0 ? (
            <div className="mob-search-item">No results found</div>
          ) : (
            <>
              <div className="mob-search-title">Matching Results</div>
              <ul className="mob-search-list">
                {products.map((item) => (
                  <Link
                    key={item.product_id}
                    href={`/product/${item.url}`}
                    onClick={() => setShowDropdown(false)}
                  >
                    <li className="mob-search-item">
                      <span className="mob-search-dot">•</span>
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