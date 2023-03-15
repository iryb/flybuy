interface CartItem {
  id: string;
  name: string;
  count: number;
  price: number;
}

interface CartState {
  isCartOpen: boolean;
  cart: CartItem[] | [];
  items: CartItem[] | [];
}

export type { CartItem, CartState };
