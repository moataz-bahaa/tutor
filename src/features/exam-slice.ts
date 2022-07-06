import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchExamsByLevel,
  fetchExamsByMonth,
  fetchExamDetailsById,
  fetchExamQuestionsById,
  addExam
} from '../app/api';

export const getExamsByLevel = createAsyncThunk('exams/level', fetchExamsByLevel);
export const getExamsByMonth = createAsyncThunk('exams/month', fetchExamsByMonth);
export const getExamDetailsById = createAsyncThunk('exam/details/id', fetchExamDetailsById);
export const getExamQuestionsById = createAsyncThunk('exam/questions/id', fetchExamQuestionsById);
export const addExamAction = createAsyncThunk('exam/add', addExam);

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

    // get exam details by id
    builder
      .addCase(getExamDetailsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExamDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.curExam.details = action.payload;
      })
      .addCase(getExamDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.curExam = initialState.curExam;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // get exam questions by id
    builder
      .addCase(getExamQuestionsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExamQuestionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.curExam.questions = action.payload;
      })
      .addCase(getExamQuestionsById.rejected, (state, action) => {
        state.loading = false;
        state.curExam = initialState.curExam;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // add exam
    builder
      .addCase(addExamAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExamAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(addExamAction.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });
  },
});

export default exmasSlice.reducer;
