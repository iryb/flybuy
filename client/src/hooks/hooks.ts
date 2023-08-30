import { useCallback, useEffect, useState } from "react";

export default function useFetch(url: string): any {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const language = localStorage.getItem("language");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let query = `${url}&sort=updatedAt:desc`;
      if (language) {
        query += `&locale=${language}`;
      }
      const items = await fetch(query, {
        method: "GET",
      });
      const itemsData = await items.json();
      setData(itemsData.data);
      setMeta(itemsData.meta);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, language]);

  useEffect(() => {
    void fetchData();
  }, [url, language]);

  return { data, meta, error, loading };
}
