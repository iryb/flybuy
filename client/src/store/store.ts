import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@store/cart/slice";
import categoriesReducer from "@store/categories/slice";
import userReducer from "@store/user/slice";
import orderReducer from "@store/order/slice";
import bannerReducer from "@store/banner/slice";
import settingsReducer from "@store/settings/slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    user: userReducer,
    order: orderReducer,
    banner: bannerReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
