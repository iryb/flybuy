interface Size {
  size: string;
  count: number;
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
}

export type { CartItem, CartState, Size };
