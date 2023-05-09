import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@store/cart/slice";
import categoriesReducer from "@store/categories/slice";
import userReducer from "@store/user/slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
