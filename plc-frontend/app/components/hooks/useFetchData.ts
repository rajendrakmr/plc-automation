import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
    total: number;
    page: number;
    limit: number;
    [key: string]: T[] | number | string;
}

export interface UseFetchDataParams {
    endpoint: string;
    dataKey: string;
    page?: number;
    limit?: number;
    search?: string;
    autoFetch?: boolean;
    extraParams?: Record<string, string>;
}

export interface UseFetchDataReturn<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    refetch: () => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSearch: (search: string) => void;
    setExtraParams: (params: Record<string, string>) => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useFetchData<T = Record<string, unknown>>({
    endpoint,
    dataKey,
    page: initialPage = 1,
    limit: initialLimit = 20,
    search: initialSearch = "",
    autoFetch = true,
    extraParams: initialExtraParams = {},
}: UseFetchDataParams): UseFetchDataReturn<T> {
    const router = useRouter();
 
    const [data, setData] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
    const [search, setSearch] = useState(initialSearch);
    const [extraParams, setExtraParams] = useState(initialExtraParams);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const abortRef = useRef<AbortController | null>(null);
 
    const fetchData = useCallback(async () => {
        abortRef.current?.abort();
        abortRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                ...(search ? { search } : {}),
                ...extraParams,
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${params}`, {
                    credentials: "include",
                    signal: abortRef.current.signal,
                });

            // ── 401 → redirect to login ────────────────────────────────────────────
            if (response.status === 401) {
                router.replace("/login");
                return;
            }

            // ── Other errors ───────────────────────────────────────────────────────
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(
                    errData?.detail?.message ??
                    errData?.message ??
                    `Failed to fetch ${endpoint}`
                );
            }

            // ── Success ────────────────────────────────────────────────────────────
            const json: PaginatedResponse<T> = await response.json();
            setData((json[dataKey] as T[]) ?? []);
            setTotal(json.total ?? 0);

        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") return; // cancelled — ignore
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [endpoint, dataKey, page, limit, search, extraParams, router]);

    // ─── Auto-fetch + cleanup ────────────────────────────────────────────────────
    useEffect(() => {
        if (autoFetch) fetchData();
        return () => abortRef.current?.abort();
    }, [fetchData, autoFetch]);

    // ─── Setters (reset page on filter change) ───────────────────────────────────
    const handleSetSearch = useCallback((val: string) => {
        setPage(1);
        setSearch(val);
    }, []);

    const handleSetLimit = useCallback((val: number) => {
        setPage(1);
        setLimit(val);
    }, []);

    const handleSetExtraParams = useCallback((params: Record<string, string>) => {
        setPage(1);
        setExtraParams(params);
    }, []);

    // ─── Return ──────────────────────────────────────────────────────────────────
    return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        loading,
        error,
        refetch: fetchData,
        setPage,
        setLimit,
        setSearch: handleSetSearch,
        setExtraParams: handleSetExtraParams,
    };
}