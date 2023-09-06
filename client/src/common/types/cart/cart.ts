interface Size {
  size: string;
  count: number;
}

interface Image {
  data: {
    attributes: { formats: { medium: { url: string } } };
  } | null;
}

interface CartItem {
  id: string;
  count: number;
  attributes: {
    name: string;
    category?: string;
    price: number;
    image: {
      data: {
        attributes: { formats: { medium: { url: string } } };
      } | null;
    };
    fullDescription: string;
    size: {
      data: Size[];
    };
    slug: string;
    sku: string;
  };
}

interface Product {
  id: string;
  count: number;
  size: string;
  price: number;
  sku: string;
}

interface CartState {
  isCartOpen: boolean;
  cart: Product[];
  items: CartItem[];
}

interface ProductPreview {
  id: string;
  count: number;
  attributes: {
    name: string;
    price: number;
    image: {
      data: {
        attributes: { formats: { medium: { url: string } } };
      } | null;
    };
    size: string;
    sku: string;
  };
}

export type { CartItem, CartState, Size, Image, ProductPreview, Product };
