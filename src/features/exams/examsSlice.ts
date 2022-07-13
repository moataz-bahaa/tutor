import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllExams,
  fetchExamsByLevel,
  fetchExamsByMonth,
  fetchExamDetailsById,
  fetchExamQuestionsById,
  addExam,
  addQuestionToExam,
  deleteExamById,
  deleteQuestionById,
} from './examsActions';

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
    questions: Question[];
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
    questions: [],
  },
  error: '',
};

const exmasSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    clearExamsState: () => initialState,
  },
  extraReducers: (builder) => {
    // fetch all exams
    builder
      .addCase(fetchAllExams.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllExams.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.data = action.payload;
      })
      .addCase(fetchAllExams.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });
    
    // get exams by level
    builder
      .addCase(fetchExamsByLevel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchExamsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.data = action.payload;
      })
      .addCase(fetchExamsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // get exams by month
    builder
      .addCase(fetchExamsByMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExamsByMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.data = action.payload;
      })
      .addCase(fetchExamsByMonth.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // get exam details by id
    builder
      .addCase(fetchExamDetailsById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchExamDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.curExam.details = action.payload;
      })
      .addCase(fetchExamDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.curExam = initialState.curExam;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // get exam questions by id
    builder
      .addCase(fetchExamQuestionsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExamQuestionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.curExam.questions = action.payload;
      })
      .addCase(fetchExamQuestionsById.rejected, (state, action) => {
        state.loading = false;
        state.curExam = initialState.curExam;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // add exam
    builder
      .addCase(addExam.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExam.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        alert('تمت الاضافه');
      })
      .addCase(addExam.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // add question to exam
    builder
      .addCase(addQuestionToExam.pending, (state) => {
        state.loading = true;
      })
      .addCase(addQuestionToExam.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        alert('تم اضافة السؤال');
      })
      .addCase(addQuestionToExam.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // delete exam by id
    builder
      .addCase(deleteExamById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(deleteExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السيرقير';
      });

    // delete question by id
    builder
      .addCase(deleteQuestionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        alert('تمت عملية الحذف');
        const question = state.curExam.questions.find(
          (q) => q.QuestionID === action.payload
        );
        const index = state.curExam.questions.indexOf(question!);
        state.curExam.questions.splice(index, 1);
      })
      .addCase(deleteQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السيرقير';
        alert(state.error);
      });
  },
});

export default exmasSlice.reducer;
export const { clearExamsState } = exmasSlice.actions;
