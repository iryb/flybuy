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
  };
}

interface CartState {
  isCartOpen: boolean;
  cart: CartItem[];
  items: CartItem[];
  sizes: string[];
  priceRange: [number, number];
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
  };
}

export type { CartItem, CartState, Size, Image, ProductPreview };
