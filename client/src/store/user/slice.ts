import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserState } from "@/common/types/types";
import { ApiPath } from "@/common/enums/apiPath";
import { Auth } from "@/common/enums/auth";

const initialState: UserState = {
  data: {
    name: "",
    email: "",
  },
};

export const fetchUser = createAsyncThunk(
  `${ApiPath.API}/users/me`,
  async (authToken: string) => {
    const response = await fetch(`${ApiPath.API}/users/me`, {
      headers: { Authorization: `${Auth.BEARER} ${authToken}` },
    });

    return await response.json();
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data.name = action.payload.username;
      state.data.email = action.payload.email;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
