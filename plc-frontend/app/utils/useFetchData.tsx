import { useState, useEffect, useCallback } from "react";

interface UseGetOptions<T> {
    url: string;
    params?: Record<string, string | number | boolean | undefined | null>;
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
}

export function useFetchData<T>({
    url,
    params,
    enabled = true,
    onSuccess,
    onError,
}: UseGetOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const refetch = useCallback(() => {
        setRefreshKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const query = params
                ? "?" + new URLSearchParams(
                    Object.entries(params)
                        .filter(([, v]) => v !== undefined && v !== null && v !== "")
                        .map(([k, v]) => [k, String(v)])
                ).toString()
                : "";

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}${url}${query}`,
                    { signal: controller.signal }   // ← signal connect karo
                );
                const result = await res.json();

                if (!res.ok) {
                    throw new Error(
                        result?.detail?.message ||
                        result?.message ||
                        "Something went wrong"
                    );
                }

                setData(result);
                onSuccess?.(result);
            } catch (err) {
                if ((err as Error).name === "AbortError") return;
                const msg = err instanceof Error ? err.message : "Something went wrong";
                setError(msg);
                onError?.(msg);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => controller.abort();

    }, [url, enabled, refreshKey, JSON.stringify(params)]);  

    return { data, loading, error, refetch };
}