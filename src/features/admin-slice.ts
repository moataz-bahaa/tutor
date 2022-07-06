import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'admin/login',
  async (user: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/Teacher/Teacher/Authentication/${user.username}/${user.password}`
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

interface Admin {}

interface InitialState {
  loading: boolean;
  isLoggedIn: boolean;
  error: string;
  data: Admin;
}

const initialState: InitialState = {
  loading: false,
  isLoggedIn: true,
  error: '',
  data: {},
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = '';
        state.isLoggedIn = true;
      });
  },
});

export default adminSlice.reducer;
export const { logout } = adminSlice.actions;
