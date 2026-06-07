// hooks/usePost.ts

import { useState, useCallback } from "react";

export interface ValidationErrors {
  [key: string]: string | string[];
}

export interface UsePostOptions<TResponse> {
  url: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: string) => void;
  onErrors?: (errors: ValidationErrors) => void;
}

export interface UsePostReturn<TPayload, TResponse> {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: TResponse | null;
  post: (payload: TPayload) => Promise<TResponse | null>;
  reset: () => void;
}

export function usePost<
  TPayload = Record<string, unknown>,
  TResponse = unknown
>({
  url,
  onSuccess,
  onErrors,
  onError,
}: UsePostOptions<TResponse>): UsePostReturn<TPayload, TResponse> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setData(null);
    onErrors?.({});
  }, [onErrors]);

  const post = useCallback(
    async (payload: TPayload): Promise<TResponse | null> => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      onErrors?.({});

      try {
        const isFormData = payload instanceof FormData;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${url}`,
          {
            method: "POST",
            credentials: "include",
            headers: isFormData
              ? undefined
              : {
                  "Content-Type": "application/json",
                },
            body: isFormData
              ? payload
              : JSON.stringify(payload),
          }
        );

        if (res.status === 401) {
          window.location.href = "/login";
          return null;
        }

        const responseData = await res
          .json()
          .catch(() => ({}));

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

        const resData = responseData as TResponse;

        setData(resData);
        setSuccess(true);

        onSuccess?.(resData);

        return resData;
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Something went wrong";

        setError(msg);
        onError?.(msg);

        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, onSuccess, onErrors, onError]
  );

  return {
    loading,
    error,
    success,
    data,
    post,
    reset,
  };
}