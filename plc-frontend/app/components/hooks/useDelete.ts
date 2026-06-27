// hooks/useDelete.ts
import { useState, useCallback } from "react";

export interface ValidationErrors {
  [key: string]: string | string[];
}

export interface UseDeleteOptions {
  url: string;
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
  onErrors?: (errors: ValidationErrors) => void;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface UseDeleteReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  remove: (id: string | number) => Promise<DeleteResponse | null>;
  reset: () => void;
}

export function useDelete({
  url,
  onSuccess,
  onError,
  onErrors,
}: UseDeleteOptions): UseDeleteReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setMessage(null);
    onErrors?.({});
  }, [onErrors]);

  const remove = useCallback(
    async (id: string | number): Promise<DeleteResponse | null> => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setMessage(null);
      onErrors?.({});

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${url}/${id}`,
          {
            method:      "DELETE",
            credentials: "include",
            headers:     { "Content-Type": "application/json" },
          }
        );

        if (res.status === 401) {
          window.location.href = "/login";
          return null;
        }

        const responseData = await res.json().catch(() => ({}));

        if (res.status === 422) {
          onErrors?.(
            responseData?.detail?.errors ||
            responseData?.errors ||
            {}
          );
          return null;
        }

        if (res.status === 409) {
          onErrors?.(
            responseData?.detail?.errors ||
            responseData?.errors ||
            {}
          );
          return null;
        }

        if (!res.ok) {
          throw new Error(
            responseData?.detail?.message ||
            responseData?.message ||
            `Server error: ${res.status}`
          );
        }

        const msg = responseData?.message ?? "Deleted successfully";
        setMessage(msg);
        setSuccess(true);
        onSuccess?.(msg);
        return responseData as DeleteResponse;

      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong";
        setError(msg);
        onError?.(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, onSuccess, onError, onErrors]
  );

  return { loading, error, success, message, remove, reset };
}