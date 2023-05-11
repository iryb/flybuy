import { CartItem } from "../cart/cart";

interface Order {
  id: string;
  attributes: {
    createdAt: string;
    products: CartItem[];
  };
}

interface OrderState {
  data: Order[];
}

export type { Order, OrderState };
