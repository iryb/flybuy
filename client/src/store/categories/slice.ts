import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoriesState } from "@/common/types/types";

const initialState: CategoriesState = {
  items: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
