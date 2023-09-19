import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/common/types/types";

const initialState: CartState = {
  isCartOpen: false,
  cart: [],
  items: [],
  coupon: "",
};

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
    setCoupon: (state, action: PayloadAction<string>) => {
      state.coupon = action.payload;
    },
  },
});

export const {
  setItems,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  addToCartById,
  setCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
