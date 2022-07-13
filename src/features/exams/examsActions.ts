import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExamInfo, ExamDetails, ExamWithQuestions } from './examsSlice';
import { State as Question } from '../../components/exams/AddQuestion';

export const fetchAllExams = createAsyncThunk(
  'exams/all',
  async (
    {
      pageNumber = 1,
      count = 3,
    }: { pageNumber?: number; count?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get<{
        item1: { examsCount: number; pageCount: number };
        item2: ExamInfo[];
      }>(`/Exam/Select/All/Exams/${pageNumber}/${count}/`);
      return {
        exams: res.data.item2,
        examsCount: res.data.item1.examsCount,
        pageCount: res.data.item1.pageCount,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExamsByLevel = createAsyncThunk(
  'exams/level',
  async (
    {
      level,
      pageNumber = 1,
      count = 3,
    }: { level: number; pageNumber?: number; count?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get<{
        item1: { examsCount: number; pageCount: number };
        item2: ExamInfo[];
      }>(`/Exam/Select/Exam/BY/Level/${pageNumber}/${count}/${level}`);
      return {
        exams: res.data.item2,
        examsCount: res.data.item1.examsCount,
        pageCount: res.data.item1.pageCount,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExamsByMonth = createAsyncThunk(
  'exams/month',
  async (
    {
      level,
      month,
      pageNumber = 1,
      count = 3,
    }: { level: number; month: number; pageNumber?: number; count?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get<{
        item1: { examsCount: number; pageCount: number };
        item2: ExamInfo[];
      }>(`/Exam/Select/Exam/BY/Month/${pageNumber}/${count}/${level}/${month}`);
      return {
        exams: res.data.item2,
        examsCount: res.data.item1.examsCount,
        pageCount: res.data.item1.pageCount,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExamDetailsById = createAsyncThunk(
  'exam/details/id',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axios.get<ExamDetails>(`/Exam/Select/Exam/BY/ID/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExamQuestionsById = createAsyncThunk(
  'exam/questions/id',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axios.get<{ Exam: ExamWithQuestions[] }>(
        `/Exam/Select/Exam/For/Student/BY/${id}`
      );
      return res.data.Exam[0].ExamQuestions;
    } catch (error: any) {
      // error.response.data => error return from server ''
      // return rejectWithValue(error.response.data);
      return [];
    }
  }
);

export const addExam = createAsyncThunk(
  'exam/add',
  async (obj: { exam: {}; callback: Function }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/Exam/Insert/Exam', obj.exam);
      const id = res.headers.location.split('/').at(-1);
      // alert('تم اضافة الامتحان بنجاح');
      // call back to navigate to /exam-detail/:id
      obj.callback(id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addQuestionToExam = createAsyncThunk(
  'exam/add/question',
  async (
    { question, answers, correctAnswerNumber }: Question,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res1 = await axios.post('/Exam/Insert/Exam/Question', question);
      const questionId = +res1.headers.location.split('/').at(-1)!;

      for (let answer of answers) {
        const res2 = await axios.post('/Exam/Insert/Exam/Question/Answer', {
          ...answer,
          questionId,
        });
      }

      const res3 = await axios.post('/Exam/Insert/Correct/Answer', {
        correctAnswerNumber,
        questionId,
      });

      dispatch(fetchExamQuestionsById(question.examId));
      return {};
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteExamById = createAsyncThunk(
  'exam/delete/id',
  async (
    { examId, callback }: { examId: number; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.delete(`/Exam/Delete/Exam/BY/ID/${examId}`);
      callback();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuestionById = createAsyncThunk(
  'question/delete',
  async (questionId: number, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/Exam/Delete/Exam/Question/BY/ID/${questionId}`);
      return questionId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
