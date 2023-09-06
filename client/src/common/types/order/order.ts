interface OrderProduct {
  id: string;
  count: number;
  size: string;
  sku: string;
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
