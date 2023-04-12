import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/common/types/types";

const initialState: CartState = {
  isCartOpen: false,
  cart: [],
  items: [],
  sizes: [],
  priceRange: [0, 0],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemDuplicate = state.cart.some(
        ({ id }) => id === action.payload.id,
      );
      if (itemDuplicate) {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            item.count += action.payload.count;
          }
          return item;
        });
      } else {
        state.cart = [...state.cart, action.payload];
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },
    decreaseCount: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setSizes: (state, action: PayloadAction<string[]>) => {
      state.sizes = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  setSizes,
  setPriceRange,
} = cartSlice.actions;

export default cartSlice.reducer;
