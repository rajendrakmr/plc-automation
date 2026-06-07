import { useState, useEffect, useCallback, useRef } from "react";

// Actual API response shape:
// { records: TItem[], pagination: { page, limit, total, pages } }
export interface PaginatedResponse<TItem> {
  records: TItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UseFetchOptions<TResponse> {
  url: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  enabled?: boolean;
  onSuccess?: any;
  onError?: (error: string) => void;
}

export interface UseFetchReturn<TResponse> {
  loading: boolean;
  error: string | null;
  data: TResponse | null;
  total: number;
  totalPages: number;
  refetch: () => void;
  reset: () => void;
  isResetLoading: boolean;
  isSearchLoading: boolean;
}

export function useFetch<TResponse = unknown>({
  url,
  params,
  enabled = true,
  onSuccess,
  onError,
}: UseFetchOptions<TResponse>): UseFetchReturn<TResponse> {
  const [loading, setLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
   const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResponse | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  const refetch = useCallback(() => setRefreshKey((k) => k + 1), []);

  const reset = useCallback(() => {
    setError(null);
    setData(null);
    setTotal(0);
    setTotalPages(0);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
       setIsSearchLoading(false)
         setIsResetLoading(false)
      setError(null);
      if(params?.isSearch){
        setIsSearchLoading(true)
      }
       if(params?.isClear){
        setIsResetLoading(true)
      }

      try {
        const query = params ? "?" + new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "").map(([k, v]) => [k, String(v)])).toString() : "";
 

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}${query}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        );

        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }

        const responseData = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(
            responseData?.detail?.message ||
            responseData?.message ||
            `Server error: ${res.status}`
          );
        }

        const resData = responseData as TResponse;
        setData(resData);
        if (
          typeof responseData === "object" &&
          responseData !== null &&
          "pagination" in responseData
        ) {
          const pg = (responseData as Record<string, unknown>).pagination as Record<string, unknown>;
          if (typeof pg?.total === "number") setTotal(pg.total);
          if (typeof pg?.pages === "number") setTotalPages(pg.pages);
        }

        onSuccessRef.current?.(resData);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;

        const msg =
          err instanceof Error ? err.message : "Something went wrong";

        setError(msg);
        onErrorRef.current?.(msg);
      } finally {
        setLoading(false);
        setIsSearchLoading(false)
         setIsResetLoading(false)
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url, enabled, refreshKey, JSON.stringify(params)]);

  return { loading, error, data, total, totalPages, refetch, reset,isResetLoading,isSearchLoading };
}