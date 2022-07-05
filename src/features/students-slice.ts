import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllStudents,
  fetchStudentById,
  fetchStudentsByLevel,
  fetchStudentsByName,
  deleteStudentById,
  authenticateStudent,
} from '../app/api';

export const getAllStudents = createAsyncThunk('students/all', fetchAllStudents);
export const getStudentById = createAsyncThunk('students/id', fetchStudentById);
export const getStudentsByName = createAsyncThunk('students/name', fetchStudentsByName);
export const getStudentsByLevel = createAsyncThunk(
  'students/level',
  fetchStudentsByLevel
);
export const deleteStudent = createAsyncThunk('students/delete', deleteStudentById);
export const authStudent = createAsyncThunk('students/authenticate', authenticateStudent);

export interface Student {
  studentId: number;
  studentName: string;
  studentPhone: string;
  levelId: number;
  levelName: string;
  studentAdress: string;
  studentFatherPhone: string;
  studentEmail: string;
  studentUserName: string;
  studentPassWord: string;
  studentMobileMacAdress: string;
  authValue: boolean;
}

interface InitialState {
  loading: boolean;
  data: {
    students: Student[];
    studentCount: number;
    pageCount: number;
  };
  currentStudent: Student | null;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  data: {
    students: [],
    studentCount: 0,
    pageCount: 0,
  },
  currentStudent: null,
  error: '',
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all students
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // get studetn by id
    builder
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
        state.error = '';
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // get students by level
    builder
      .addCase(getStudentsByLevel.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(getStudentsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // get students by name
    builder
      .addCase(getStudentsByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(getStudentsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // delete student
    // builder
    //   .addCase(deleteStudent.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(deleteStudent.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = '';
    //     const student = state.data.find((s) => s.studentId === action.payload.id);
    //     const index = state.data.indexOf(student!);
    //     state.data.splice(index, 1);
    //   })
    //   .addCase(deleteStudent.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = <string>action.payload || 'خطا ف السرقير';
    //   });

    // auth student
    // builder
    //   .addCase(authStudent.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(authStudent.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = '';
    //     const index = state.data.indexOf(action.payload.student);
    //     state.data[index].authValue = !state.data[index].authValue;
    //   })
    //   .addCase(authStudent.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = <string>action.payload || 'خطا ف السرقير';
    //   });
  },
});

export default studentSlice.reducer;
// export const {} = studentSlice.actions;
