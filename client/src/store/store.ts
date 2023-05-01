import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@store/cart/slice";
import categoriesReducer from "@store/categories/slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
