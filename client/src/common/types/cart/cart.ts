interface Size {
  size: string;
  count: number;
}

interface Image {
  data: {
    attributes: { url: string };
  } | null;
}

interface CartItem {
  id: string;
  count: number;
  attributes: {
    name: string;
    category?: string;
    price: number;
    image: Image;
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
  coupon?: Coupon;
}

interface ProductPreview {
  id: string;
  count: number;
  attributes: {
    name: string;
    price: number;
    image: Image;
    size: string;
    sku: string;
    slug: string;
  };
}

interface Coupon {
  name: string;
  percent: number;
}

export type {
  CartItem,
  CartState,
  Size,
  Image,
  ProductPreview,
  Product,
  Coupon,
};
