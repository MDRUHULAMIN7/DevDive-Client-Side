import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./UsersApi";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  error: "",
};
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (email) => {
  const users = await getUsers(email);
  return users;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError= true;
      state.error = action.error?.message;
    });
  },
});

export default usersSlice.reducer;
