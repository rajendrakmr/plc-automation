"use client";

import { useState, useCallback } from "react";
import type { SortDir } from "@/app/components/data-table/types";

interface UseDataTableOptions<T> {
  initialPage?: number;
  initialLimit?: number;
  initialSortKey?: keyof T;
  initialSortDir?: SortDir;
}

/**
 * Generic table state hook.
 * Manages: page, limit, search, sort — and exposes reset helpers.
 *
 * Pair with your data-fetching hook (e.g. useProducts, useUsers)
 * by passing page/limit/search/sortKey/sortDir as params.
 */
export function useDataTable<T>({
  initialPage = 1,
  initialLimit = 10,
  initialSortKey,
  initialSortDir = "asc",
}: UseDataTableOptions<T> = {}) {
  const [page, setPageRaw] = useState(initialPage);
  const [limit, setLimitRaw] = useState(initialLimit);
  const [search, setSearchRaw] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | undefined>(initialSortKey);
  const [sortDir, setSortDir] = useState<SortDir>(initialSortDir);
  const [activeTab, setActiveTabRaw] = useState("all");

  const setPage = useCallback((p: number) => setPageRaw(p), []);

  const setLimit = useCallback((l: number) => {
    setLimitRaw(l);
    setPageRaw(1);
  }, []);

  const setSearch = useCallback((q: string) => {
    setSearchRaw(q);
    setPageRaw(1);
  }, []);

  const setActiveTab = useCallback((tab: string) => {
    setActiveTabRaw(tab);
    setPageRaw(1);
  }, []);

  const handleSort = useCallback((key: keyof T) => {
    setSortKey((prev) => {
      if (prev === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      else { setSortDir("asc"); }
      return key;
    });
    setPageRaw(1);
  }, []);

  const reset = useCallback(() => {
    setPageRaw(initialPage);
    setLimitRaw(initialLimit);
    setSearchRaw("");
    setSortDir(initialSortDir);
    setSortKey(initialSortKey);
    setActiveTabRaw("all");
  }, [initialPage, initialLimit, initialSortDir, initialSortKey]);

  return {
    // State values — pass these to your data-fetching hook
    page,
    limit,
    search,
    sortKey,
    sortDir,
    activeTab,

    // Setters — pass these to DataTable props
    setPage,
    setLimit,
    setSearch,
    setActiveTab,
    handleSort,
    reset,
  };
}