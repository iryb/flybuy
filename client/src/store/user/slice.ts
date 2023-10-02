import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserState } from "@/common/types/types";
import { ApiPath, ROOT } from "@/common/enums/apiPath";
import { Auth } from "@/common/enums/auth";

const initialState: UserState = {
  data: {
    name: "",
    email: "",
    id: "",
  },
};

export const fetchUser = createAsyncThunk(
  `${ROOT}${ApiPath.USERAPI}/me`,
  async (authToken: string) => {
    const response = await fetch(`${ROOT}${ApiPath.USERAPI}/me`, {
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
    logout: (state) => {
      state.data.name = "";
      state.data.email = "";
      state.data.id = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data.name = action.payload.username;
      state.data.email = action.payload.email;
      state.data.id = action.payload.id;
    });
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
