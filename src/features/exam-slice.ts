import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExamsByLevel, fetchExamsByMonth, fetchExamById } from '../app/api';

export const getExamsByLevel = createAsyncThunk('exams/level', fetchExamsByLevel);
export const getExamsByMonth = createAsyncThunk('exams/month', fetchExamsByMonth);
export const getExamById = createAsyncThunk('exam/id', fetchExamById);

export interface ExamInfo {
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

export interface Answer {
  AnswerID: number;
  AnswerNumber: string;
  AnswerText: string;
  CorrectAnswer: [
    {
      CorrectAnswerNumber: string;
    }
  ];
}

export interface Question {
  QuestionID: number;
  QuestionNumber: string;
  QuestionText: string;
  ExamAnswers: [Answer, Answer, Answer, Answer];
}

export interface ExamWithQuestions {
  ExamID: number;
  ExamName: string;
  ExamQuestions: Question[];
}

interface InitialState {
  loading: boolean;
  data: {
    exams: ExamInfo[];
    examsCount: number;
    pageCount: number;
  };
  curExam: {
    details: ExamDetails | null;
    questions: Question[] | null;
  };
  error: string;
}

const initialState: InitialState = {
  loading: false,
  data: {
    exams: [],
    examsCount: 0,
    pageCount: 0,
  },
  curExam: {
    details: null,
    questions: null,
  },
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
        state.data = action.payload;
      })
      .addCase(getExamsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // get exams by month
    builder
      .addCase(getExamsByMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExamsByMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.data = action.payload;
      })
      .addCase(getExamsByMonth.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // get exam by id
    builder
      .addCase(getExamById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.curExam = action.payload;
      })
      .addCase(getExamById.rejected, (state, action) => {
        state.loading = false;
        state.curExam = initialState.curExam;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });
  },
});

export default exmasSlice.reducer;
