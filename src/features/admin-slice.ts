import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const login = createAsyncThunk('admin/login', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json;
  return data;
});

const logout = createAsyncThunk('admin/logout', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json;
  return data;
});

interface Admin {}

interface InitialState {
  isLoggedIn: boolean;
  data: Admin;
}

const initialState: InitialState = {
  isLoggedIn: true,
  data: {},
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => {})
      .addCase(login.rejected, (state) => {})
      .addCase(login.fulfilled, (state, action: PayloadAction<Admin>) => {});

    // logout
    builder
      .addCase(logout.pending, (state) => {})
      .addCase(logout.rejected, (state) => {})
      .addCase(logout.fulfilled, (state) => {});
  },
});

export default adminSlice.reducer;
export const {} = adminSlice.actions;
