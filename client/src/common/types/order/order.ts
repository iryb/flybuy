interface OrderProduct {
  id: string;
  count: number;
}

interface Order {
  id: string;
  attributes: {
    createdAt: string;
    products: OrderProduct[];
  };
}

interface OrderState {
  data: Order[];
}

export type { Order, OrderState };
