import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoriesState } from "@/common/types/types";
import { ApiPath } from "@/common/enums/apiPath";

const initialState: CategoriesState = {
  items: [],
  subcategories: [],
};

export const fetchSubcategories = createAsyncThunk(
  `${ApiPath.API}/categories`,
  async () => {
    const response = await fetch(`${ApiPath.API}/categories?populate=*`);

    const categories = await response.json();

    const data = [...(await categories).data].map((category) => {
      const subcategories: string[] = [];

      category.attributes.subcategories.data.map((item: any) => {
        subcategories.push(item.attributes.title);
      });

      const item = {
        title: category.attributes.title,
        items: subcategories,
      };

      return item;
    });

    return data;
  },
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubcategories.fulfilled, (state, action) => {
      state.subcategories = action.payload;
    });
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
