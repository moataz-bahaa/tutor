import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin-slice';
import videosReducer from '../features/videos-slice';
import studentsReducer from '../features/students-slice';
import examsReducer from '../features/exam-slice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    videos: videosReducer,
    students: studentsReducer,
    exams: examsReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
