import { useState, useEffect, useCallback } from "react";

interface UseGetOptions<T> {
    url: string;
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
}

export function useGet<T>({
    url,
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

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
                    {
                        credentials: "include",
                        signal: controller.signal,
                    }
                );
                if (res.status === 401) {
                    window.location.href = "/login";
                    return;
                }


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

                const msg =
                    err instanceof Error ? err.message : "Something went wrong";

                setError(msg);
                onError?.(msg);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url, enabled, refreshKey]);

    return {
        data,
        loading,
        error,
        refetch,
    };
}