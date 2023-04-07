import { CartItem } from "@/common/types/types";

export const formatPrice = (num: number): string => {
  return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export const formatStringCapitalize = (str: string): string => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./g, (word) => word.toUpperCase());
};

export const getUniqueSizes = (items: CartItem[]): string[] => {
  const sizes = items.map((item) => item.attributes.size?.data);
  const uniqueSizes = new Set<string>();

  sizes.forEach((size) => {
    size?.forEach((s) => (s.count > 0 ? uniqueSizes.add(s.size) : null));
  });

  return Array.from(uniqueSizes);
};

export const getPriceRange = (items: CartItem[]): [number, number] => {
  const prices = items.map((item) => item.attributes.price);
  const uniquePrices = new Set(prices);
  const min = Math.min(...Array.from(uniquePrices));
  const max = Math.max(...Array.from(uniquePrices));

  return [min, max];
};
