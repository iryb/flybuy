import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BannerState, BannerSlide } from "@/common/types/types";
import { ApiPath } from "@/common/enums/apiPath";

const initialState: BannerState = {
  data: null,
};

export const fetchBannerSlides = createAsyncThunk(
  `${ApiPath.API}/banner`,
  async () => {
    const response = await fetch(`${ApiPath.API}/banners?populate=image`);

    const slides = await response.json();

    const data = [...(await slides).data].map((slide) => {
      const item: BannerSlide = {
        image: slide.attributes.image.data.attributes.url,
        title: slide.attributes.title,
        link: slide.attributes.link,
      };
      return item;
    });

    return data;
  },
);

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBannerSlides.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default bannerSlice.reducer;
