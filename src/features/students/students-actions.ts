import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Student } from './students-slice';

axios.defaults.baseURL = 'http://mobisite201.somee.com/api';

export const fetchAllStudents = createAsyncThunk(
  'students/all',
  async (
    { pageNumber = 1, studentCount = 3 }: { pageNumber: number; studentCount?: number },
    { rejectWithValue }: any
  ) => {
    try {
      const res = await axios.get<{
        item1: { studentCount: number; pageCount: number };
        item2: Student[];
      }>(`/Student/Select/All/Students/${pageNumber}/${studentCount}`);
      return {
        students: res.data.item2,
        studentCount: res.data.item1.studentCount,
        pageCount: res.data.item1.pageCount,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  'student/id',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axios.get<Student>(`/Student/Select/Student/BY/ID/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentsByName = createAsyncThunk(
  'students/name',
  async (
    {
      name,
      pageNumber = 1,
      studentCount = 3,
    }: { name: string; pageNumber: number; studentCount?: number },
    { rejectWithValue }: any
  ) => {
    try {
      const res = await axios.get<{
        item1: { studentCount: number; pageCount: number };
        item2: Student[];
      }>(
        `/Student/Select/Student/BY/Contains/Name/${pageNumber}/${studentCount}/${name}`
      );
      return {
        students: res.data.item2,
        studentCount: res.data.item1.studentCount,
        pageCount: res.data.item1.pageCount,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentsByLevel = createAsyncThunk(
  'students/level',
  async (
    {
      levelId = 1,
      pageNumber = 1,
      studentCount = 3,
    }: { levelId: number; pageNumber: number; studentCount?: number },
    { rejectWithValue }: any
  ) => {
    try {
      const res = await axios.get<{
        item1: { studentCount: number; pageCount: number };
        item2: Student[];
      }>(`/Student/Select/Students/BY/Level/${pageNumber}/${studentCount}/${levelId}`);
      return {
        students: res.data.item2,
        studentCount: res.data.item1.studentCount,
        pageCount: res.data.item1.pageCount,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStudentById = createAsyncThunk(
  'student/delete',
  async (id: number, { rejectWithValue }: any) => {
    try {
      const res = await axios.delete(`/Student/Delete/Student/${id}`);
      return { id, data: res.data };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authenticateStudent = createAsyncThunk(
  'student/authenticate',
  async (
    { studentId, value }: { studentId: number; value: boolean },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(`/Student/Activate/Student/Acount/${studentId}`, [
        {
          op: 'replace',
          path: '/authValue',
          value,
        },
      ]);
      return studentId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const insertStudentPayment = createAsyncThunk(
  'student/insert-payment',
  async (
    { payMonth, studentId }: { payMonth: number; studentId: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post<string>('/Student/Insert/Student/Payment', {
        payMonth,
        studentId,
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
