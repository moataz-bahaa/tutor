import { createAsyncThunk } from '@reduxjs/toolkit';
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
