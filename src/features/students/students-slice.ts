import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteStudentById,
  fetchAllStudents,
  fetchStudentById,
  fetchStudentsByLevel,
  fetchStudentsByName,
  authenticateStudent,
  insertStudentPayment,
} from './students-actions';

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
  reducers: {
    toggleCurrentAuthValue: (state) => {
      if (state.currentStudent) {
        state.currentStudent.authValue = !state.currentStudent.authValue;
      }
    },
    clearStudentsState: () => initialState,
  },
  extraReducers: (builder) => {
    // get all students
    builder
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // get student by id
    builder
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
        state.error = '';
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // get students by level
    builder
      .addCase(fetchStudentsByLevel.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentsByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(fetchStudentsByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // get students by name
    builder
      .addCase(fetchStudentsByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(fetchStudentsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // delete student
    builder
      .addCase(deleteStudentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        const student = state.data.students.find(
          (s) => s.studentId === action.payload.id
        );
        const index = state.data.students.indexOf(student!);
        state.data.students.splice(index, 1);
      })
      .addCase(deleteStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // auth student
    builder
      .addCase(authenticateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        const student = state.data.students.find((s) => s.studentId === action.payload);
        if (student) {
          student.authValue = !student.authValue;
        }
      })
      .addCase(authenticateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });

    // insert student month payment
    builder
      .addCase(insertStudentPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(insertStudentPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        alert('تم');
      })
      .addCase(insertStudentPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload || 'خطا ف السرقير';
      });
  },
});

export default studentSlice.reducer;
export const { toggleCurrentAuthValue, clearStudentsState } = studentSlice.actions;
