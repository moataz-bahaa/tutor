import { createSlice } from '@reduxjs/toolkit';
import {
  deleteVideoById,
  fetchAllVideos,
  fetchVideosByLevel,
  fetchVideosByMonth,
  fetchVideosByWeek,
  uploadVideo,
  fetchVideoById
} from './videoActions';

export interface Video {
  videoId: number;
  videoName: string;
  videoNumber: string;
}

export interface VideoDetails {
  videoId: number;
  levelName: string;
  monthText: string;
  videoDate: string;
  videoName: string;
  weekText: string;
  videoNumber: string;
  videoNotes: string;
  videoPath: string;
}

interface InitialState {
  loading: boolean;
  data: {
    pageCount: number;
    videoCount: number;
    videos: Video[];
  };
  currentVideo: VideoDetails | null;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  data: {
    pageCount: 0,
    videoCount: 0,
    videos: [],
  },
  currentVideo: null,
  error: '',
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    clearVideosState: () => initialState,
  },
  extraReducers: (builder) => {

    //#region get all videos
    builder.addCase(fetchAllVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(fetchAllVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion

    //#region get videos by level
    builder.addCase(fetchVideosByLevel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVideosByLevel.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(fetchVideosByLevel.rejected, (state, action) => {
      state.loading = false;
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion

    //#region get videos by month
    builder.addCase(fetchVideosByMonth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVideosByMonth.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(fetchVideosByMonth.rejected, (state, action) => {
      state.loading = false;
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion

    //#region get videos by week
    builder.addCase(fetchVideosByWeek.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVideosByWeek.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(fetchVideosByWeek.rejected, (state, action) => {
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
    builder.addCase(deleteVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      const video = state.data.videos.find((v) => v.videoId === action.payload.id);
      const index = state.data.videos.indexOf(video!);
      state.data.videos.splice(index, 1);
      alert('تم حذف الفديو');
    });
    builder.addCase(deleteVideoById.rejected, (state, action) => {
      state.loading = false;
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion

    //#region fetch video by id
    builder.addCase(fetchVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.currentVideo = action.payload;
    });
    builder.addCase(fetchVideoById.rejected, (state, action) => {
      state.loading = false;
      state.error = <string>action.payload || 'خطا ف السيرفير';
    });
    //#endregion
  },
});

export default videosSlice.reducer;
export const { clearVideosState } = videosSlice.actions;
