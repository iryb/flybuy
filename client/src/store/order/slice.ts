import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Order, OrderState } from "@/common/types/types";
import { ApiPath, ROOT } from "@/common/enums/apiPath";

const initialState: OrderState = {
  data: [],
};

export const fetchOrders = createAsyncThunk(
  `${ROOT}${ApiPath.ORDERAPI}`,
  async (userId: string) => {
    const response = await fetch(
      `${ROOT}${ApiPath.ORDERAPI}?filters[userId][$eq]=${userId}`,
    );

    const orders: Promise<OrderState> = await response.json();

    const data = [...(await orders).data].map(async (order) => {
      const orderData: Order = {
        id: order.id,
        attributes: {
          createdAt: order.attributes.createdAt,
          products: order.attributes.products,
        },
      };
      return orderData;
    });

    return await Promise.all(data);
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default orderSlice.reducer;
