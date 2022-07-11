import { configureStore, createReducer } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/adminSlice';
import videosReducer from '../features/videos/videoSlice';
import studentsReducer from '../features/students/students-slice';
import examsReducer from '../features/exams/examsSlice';


const store = configureStore({
  reducer: {
    admin: adminReducer,
    videos: videosReducer,
    students: studentsReducer,
    exams: examsReducer,
    lastAction: (state, action) => {
      return action.type;
    },
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
