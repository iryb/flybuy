import { CartItem, Image } from "@/common/types/types";
import { ROOT } from "@enums/apiPath";
import { Auth } from "@enums/auth";
import placeholder from "@images/productPlaceholder.jpg";

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

export const getProductImage = (item: Image): string => {
  const url = item?.data?.attributes.url as string | null;

  const imagePlaceholder = url ? `${ROOT}${url}` : placeholder;

  return imagePlaceholder;
};

export const getToken = (): string | null => {
  return localStorage.getItem(Auth.TOKEN) ?? sessionStorage.getItem(Auth.TOKEN);
};

export const setToken = (token: string): void => {
  if (token) {
    localStorage.setItem(Auth.TOKEN, token);
  }
};

export const setTemporaryToken = (token: string): void => {
  if (token) {
    sessionStorage.setItem(Auth.TOKEN, token);
  }
};

export const removeToken = (): void => {
  localStorage.removeItem(Auth.TOKEN);
  sessionStorage.removeItem(Auth.TOKEN);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US");
};

export const getDirtyValues = <T>(values: any, initialObject: T): object => {
  const data = { ...values };
  const keyValues = Object.keys(data);

  const dirtyValues = keyValues.filter(
    // @ts-expect-error
    (keyValue) => data[keyValue] !== initialObject[keyValue],
  );

  keyValues.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (!dirtyValues.includes(key)) delete data[key];
  });

  return data;
};
