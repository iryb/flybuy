import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState, Coupon } from "@/common/types/types";
import { ApiPath } from "@/common/enums/apiPath";
import { RootState } from "@store/store";

const savedCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") as string)
  : [];

const initialState: CartState = {
  isCartOpen: false,
  cart: savedCartItems,
  items: [],
  coupon: undefined,
};

export const fetchCoupon = createAsyncThunk(
  `${ApiPath.API}/coupon`,
  async (coupon: string, { getState }) => {
    const {
      user: {
        data: { email },
      },
    } = getState() as RootState;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const endpoint = `${ApiPath.API}/coupons?filters[email][$eq]=${email}&filters[coupon][$eq]=${coupon}`;
    const response = await fetch(endpoint);

    const res = await response.json();

    const newCoupon: Coupon = {
      name: res?.data[0].attributes.coupon,
      percent: res?.data[0].attributes.percent,
    };

    return newCoupon;
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCartById: (
      state,
      action: PayloadAction<{
        id: string;
        count: number;
        size: string;
        price: number;
        sku: string;
      }>,
    ) => {
      const itemDuplicate = state.cart.some(
        ({ id, size }) =>
          id === action.payload.id && size === action.payload.size,
      );
      if (itemDuplicate) {
        state.cart = state.cart.map((item) => {
          if (
            item.id === action.payload.id &&
            item.size === action.payload.size
          ) {
            item.count += action.payload.count;
          }
          return item;
        });
      } else {
        state.cart = [...state.cart, action.payload];
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        id: string;
        size: string;
      }>,
    ) => {
      state.cart = state.cart.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size),
      );
    },
    increaseCount: (
      state,
      action: PayloadAction<{
        id: string;
        size: string;
      }>,
    ) => {
      state.cart = state.cart.map((item) => {
        if (
          item.id === action.payload.id &&
          item.size === action.payload.size
        ) {
          item.count++;
        }
        return item;
      });
    },
    decreaseCount: (
      state,
      action: PayloadAction<{
        id: string;
        size: string;
      }>,
    ) => {
      state.cart = state.cart.map((item) => {
        if (
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.count > 1
        ) {
          item.count--;
        }
        return item;
      });
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      state.coupon = action.payload;
    });
  },
});

export const {
  setItems,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  addToCartById,
} = cartSlice.actions;

export default cartSlice.reducer;
