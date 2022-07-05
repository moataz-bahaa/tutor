import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllVideos,
  postVideo,
  deleteVideoById,
  fetchVideosByLevel,
  fetchVideosByMonth,
  fetchVideoByWeek,
} from '../app/api';

export const getAllVideos = createAsyncThunk('videos/getAll', fetchAllVideos);
export const getVideosByLevel = createAsyncThunk('videos/level', fetchVideosByLevel);
export const getVideosByMonth = createAsyncThunk('videos/month', fetchVideosByMonth);
export const getVideosByWeek = createAsyncThunk('videos/week', fetchVideoByWeek);
export const uploadVideo = createAsyncThunk('videos/upload', postVideo);
export const deleteVideo = createAsyncThunk('videos/delete', deleteVideoById);

export interface Video {
  videoId: number;
  videoName: string;
  videoNumber: string;
}

export interface VideoDetails {
  videoId: number
  videoName: string;
  levelName: string;
  monthText: string;
  weekText: string;
  videoNumber: string;
  videoDate: string;
  videoNotes: string;
  videoPath: string;
}


interface InitialState {
  loading: boolean;
  data: {
    pageCount: number;
    videoCount: number;
    videos: Video[];
  }
  error: string;
}

const initialState: InitialState = {
  loading: false,
  data: {
    pageCount: 0,
    videoCount: 0,
    videos: [],
  },
  error: '',
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region get all videos
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
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion

    //#region get videos by level
    builder.addCase(getVideosByLevel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideosByLevel.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getVideosByLevel.rejected, (state, action) => {
      state.loading = false;
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion

    //#region get videos by month
    builder.addCase(getVideosByMonth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideosByMonth.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getVideosByMonth.rejected, (state, action) => {
      state.loading = false;
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion

    //#region get videos by week
    builder.addCase(getVideosByWeek.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideosByWeek.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getVideosByWeek.rejected, (state, action) => {
      state.loading = false;
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion

    //#region upload video
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
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion

    //#region delete video by id
    builder.addCase(deleteVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      const video = state.data.videos.find((v) => v.videoId === action.payload.id);
      const index = state.data.videos.indexOf(video!);
      state.data.videos.splice(index, 1);
      alert('تم حذف الفديو');
    });
    builder.addCase(deleteVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion
  },
});

export default videosSlice.reducer;
// export const {} = videosSlice.actions;
