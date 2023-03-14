interface CartItem {
  id: string;
  name: string;
  count: number;
}

interface CartState {
  isCartOpen: boolean;
  cart: CartItem[] | [];
  items: CartItem[] | [];
}

export type { CartItem, CartState };
