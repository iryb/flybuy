import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BannerState, BannerSlide } from "@/common/types/types";
import { ApiPath, ROOT } from "@/common/enums/apiPath";
import { RootState } from "@store/store";

const initialState: BannerState = {
  data: null,
};

export const fetchBannerSlides = createAsyncThunk(
  `${ApiPath.API}/banner`,
  async (_, { getState }) => {
    const { settings } = getState() as RootState;
    const endpoint = `${ROOT}${ApiPath.API}/banners?populate=image&locale=${settings.language}`;
    const response = await fetch(endpoint);

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
