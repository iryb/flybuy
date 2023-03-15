export const formatPrice = (num: number): string => {
  return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
