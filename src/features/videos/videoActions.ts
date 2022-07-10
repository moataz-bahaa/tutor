import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Video } from './videoSlice';

export const fetchAllVideos = createAsyncThunk(
  'videos/getAll',
  async (
    { pageNumber = 1, rowCount = 4 }: { pageNumber: number; rowCount?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get<{
        item1: { videoCount: 24; pageCount: 9 };
        item2: Video[];
      }>(`/Videos/Select/All/Videos/${pageNumber}/${rowCount}`);
      return {
        pageCount: res.data.item1.pageCount,
        videoCount: res.data.item1.videoCount,
        videos: res.data.item2,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchVideosByLevel = createAsyncThunk(
  'videos/level',
  async (
    {
      level,
      pageNumber,
      videoCount = 4,
    }: { level: number; pageNumber: number; videoCount?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get<{
        item1: { videoCount: number; pageCount: number };
        item2: Video[];
      }>(`/Videos/Select/Video/By/level/${pageNumber}/${videoCount}/${level}`);
      return {
        pageCount: res.data.item1.pageCount,
        videoCount: res.data.item1.videoCount,
        videos: res.data.item2,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchVideosByMonth = createAsyncThunk(
  'videos/month',
  async (
    {
      level,
      month,
      pageNumber,
      count = 4,
    }: { level: number; month: number; pageNumber: number; count?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get<{
        item1: { videoCount: number; pageCount: number };
        item2: Video[];
      }>(`/Videos/Select/Video/BY/Month/${pageNumber}/${count}/${level}/${month}`);

      return {
        pageCount: res.data.item1.pageCount,
        videoCount: res.data.item1.videoCount,
        videos: res.data.item2,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchVideosByWeek = createAsyncThunk(
  'videos/week',
  async (
    {
      level,
      month,
      week,
      pageNumber,
      count = 4,
    }: { level: number; month: number; week: number; pageNumber: number; count?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get<{
        item1: { videoCount: number; pageCount: number };
        item2: Video[];
      }>(`/Videos/Select/Video/BY/Week/${pageNumber}/${count}/${level}/${month}/${week}`);

      return {
        pageCount: res.data.item1.pageCount,
        videoCount: res.data.item1.videoCount,
        videos: res.data.item2,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadVideo = createAsyncThunk(
  'videos/upload',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post<string>('/Videos/Insert/Video', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteVideoById = createAsyncThunk(
  'videos/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/Videos/Delete/Video/BY/ID/${id}`);
      return { data: res.data, id };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// const fetchVideoById = async (id: number, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(`/Videos/Select/Video/BY/ID/${id}`);
//     return {};
//   } catch (error: any) {
//     rejectWithValue(error.response.data);
//   }
// };
