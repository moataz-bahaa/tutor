import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExamsByLevel, fetchExamById } from '../app/api';

export const getExamsByLevel = createAsyncThunk('exams/level', fetchExamsByLevel);
export const getExamById = createAsyncThunk('exam/id', fetchExamById);

export interface Exam {
  examId: number;
  examName: string;
  examNumber: string;
}

export interface ExamDetails {
  examId: number;
  examName: string;
  levelName: string;
  monthText: string;
  examNumber: string;
  examDate: string;
  examTimeLine: string;
}


interface InitialState {
  loading: boolean;
  data: Exam[];
  curExam: ExamDetails | null;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  data: [],
  curExam: null,
  error: '',
};

const exmasSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get exams by level
    builder
      .addCase(getExamsByLevel.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExamsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.data = action.payload.data;
      })
      .addCase(getExamsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || 'خطا ف السيرقير';
      });

    // get exam by id
    builder
      .addCase(getExamById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.curExam = action.payload.data;
      })
      .addCase(getExamById.rejected, (state, action) => {
        state.loading = false;
        state.curExam = null;
        state.error = action.error.message || 'خطا ف السيرقير';
      });
  },
});

export default exmasSlice.reducer;
