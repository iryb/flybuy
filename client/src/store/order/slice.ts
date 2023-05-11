import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderState } from "@/common/types/types";
import { ApiPath } from "@/common/enums/apiPath";

const initialState: OrderState = {
  data: [],
};

export const fetchOrders = createAsyncThunk(
  `${ApiPath.API}/api/orders`,
  async (userId: string) => {
    const response = await fetch(
      `${ApiPath.API}/orders?filters[userId][$eq]=${userId}`,
    );

    const orders: Promise<OrderState> = await response.json();

    const productsData = [...(await orders).data].map(async (order) => {
      const products = order.attributes.products;

      // fetch product data
      return await Promise.all(
        products.map(async (product) => {
          if (!product.id) {
            throw new Error("Product must have id");
          } else {
            // eslint-disable-next-line
            const endpoint = `${ApiPath.API}/items?filters[id][$eq]=${product.id}`;
            const productResponse = await fetch(endpoint);
            return await productResponse.json();
          }
        }),
      );
    });

    console.log(await Promise.all(productsData));

    return await Promise.all(productsData);
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      // state.data = action.payload;
    });
  },
});

export default orderSlice.reducer;
