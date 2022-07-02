import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllVideos,
  postVideo,
  deleteVideoById,
  fetchVideosByLevel,
} from '../app/api';

export const getAllVideos = createAsyncThunk('videos/getAll', fetchAllVideos);
export const getVideosByLevel = createAsyncThunk('videos/level', fetchVideosByLevel);
export const uploadVideo = createAsyncThunk('videos/upload', postVideo);
export const deleteVideo = createAsyncThunk('videos/delete', deleteVideoById);

export interface Video {
  videoId: number;
  videoName: string;
  videoNumber: string;
}

interface InitialState {
  loading: boolean;
  data: Video[];
  error: string;
}

const initialState: InitialState = {
  loading: false,
  data: [],
  error: '',
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all videos
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getAllVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'خطا ف السيرفير';
    });

    // upload video
    builder.addCase(uploadVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      alert('تم رفع الملف بنجاح');
    });
    builder.addCase(uploadVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'خطا ف السيرفير';
    });

    // delete video by id
    builder.addCase(deleteVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      const video = state.data.find((v) => v.videoId === action.payload.id);
      const index = state.data.indexOf(video!);
      state.data.splice(index, 1);
    });
    builder.addCase(deleteVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'خطا ف السيرفير';
    });
  },
});

export default videosSlice.reducer;
// export const {} = videosSlice.actions;
