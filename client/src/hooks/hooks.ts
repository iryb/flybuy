import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

export function useFetch(url: string): any {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const language = useAppSelector((state) => state.settings.language);

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

export function useUrlParams(searchParams: URLSearchParams): {
  querySizes?: string[];
  queryMaxPrice?: string | null;
  querySubcategories?: string[];
} {
  const querySizes = searchParams.getAll("size");
  const queryMaxPrice = searchParams.get("maxPrice");
  const querySubcategories = searchParams.getAll("subcat");

  return { querySizes, queryMaxPrice, querySubcategories };
}

export function useScrollBlock(): any {
  const breakpoint = 900;

  const blockScroll = (): void => {
    document.body.style.overflow = "hidden";
  };

  const allowScroll = (): void => {
    document.body.style.overflowY = "scroll";
  };

  const handleWindowSizeChange = (): void => {
    if (window.innerWidth > breakpoint) {
      allowScroll();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
  }, []);

  return { blockScroll, allowScroll };
}

export function useIsMobile(breakpoint: number): {
  isMobile: boolean;
} {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  const handleWindowSizeChange = (): void => {
    setIsMobile(window.innerWidth <= breakpoint);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
  }, []);

  return { isMobile };
}
