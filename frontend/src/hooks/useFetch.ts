import { useEffect, useState } from "react";
import { UseFetchResult } from "../typings";

export default function useFetch<T>(fetchFunction: () => Promise<T>, dependencies: any[] = []): UseFetchResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const result = await fetchFunction();
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Failed to fetch data");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return { data, loading, error };
}
