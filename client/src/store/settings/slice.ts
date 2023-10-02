import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "@/common/types/types";

const initialState: SettingsState = {
  language: "en",
};

export const settingsSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
