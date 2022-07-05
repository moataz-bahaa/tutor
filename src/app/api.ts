import axios from 'axios';
import { Student } from '../features/students-slice';
import { Video } from '../features/videos-slice';
import {
  ExamDetails,
  ExamInfo,
  ExamWithQuestions,
  getExamById,
} from '../features/exam-slice';

axios.defaults.baseURL = 'http://mobisite201.somee.com/api';
// axios.defaults.timeout = 10000;

//#region student
export const fetchAllStudents = async (
  { pageNumber = 1, studentCount = 3 },
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
};

export const fetchStudentsByLevel = async (
  { levelId = 1, pageNumber = 1, studentCount = 3 },
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
};

export const fetchStudentsByName = async (
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
    }>(`/Student/Select/Student/BY/Contains/Name/${pageNumber}/${studentCount}/${name}`);
    return {
      students: res.data.item2,
      studentCount: res.data.item1.studentCount,
      pageCount: res.data.item1.pageCount,
    };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const fetchStudentById = async (id: number, { rejectWithValue }: any) => {
  try {
    const res = await axios.get<Student>(`/Student/Select/Student/BY/ID/${id}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const deleteStudentById = async (id: number, { rejectWithValue }: any) => {
  try {
    const res = await axios.delete(`/Student/Delete/Student/${id}`);
    return { id, data: res.data };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const authenticateStudent = async (student: Student, { rejectWithValue }: any) => {
  try {
    const data = {
      studentUserName: student.studentUserName,
      studentPassWord: student.studentPassWord,
      studentMobileMacAdress: student.studentMobileMacAdress,
      authValue: !student.authValue,
      studentId: student.studentId,
    };

    const res = await axios.post('/Student/Insert/Student/Authentication', data, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return { data: res.data, student };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};
//#endregion

//#region video
export const postVideo = async (data: FormData, { rejectWithValue }: any) => {
  try {
    const res = await axios.post<string>('/Videos/Insert/Video', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const fetchAllVideos = async (
  { pageNumber = 1, rowCount = 4 },
  { rejectWithValue }: any
) => {
  try {
    const res = await axios.get<{
      item1: { videoCount: 24; pageCount: 9 };
      item2: Video[];
    }>(`/Videos/Select/All/Videos/${pageNumber}/${rowCount}`);
    return {
      pageCount: res.data.item1.pageCount,
      videoCount: res.data.item1.videoCount,
      videos: res.data.item2,
    };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const fetchVideosByLevel = async (
  {
    level,
    pageNumber,
    videoCount = 4,
  }: { level: number; pageNumber: number; videoCount?: number },
  { rejectWithValue }: any
) => {
  try {
    const res = await axios.get<{
      item1: { videoCount: number; pageCount: number };
      item2: Video[];
    }>(`/Videos/Select/Video/By/level/${pageNumber}/${videoCount}/${level}`);
    return {
      pageCount: res.data.item1.pageCount,
      videoCount: res.data.item1.videoCount,
      videos: res.data.item2,
    };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const fetchVideosByMonth = async (
  {
    level,
    month,
    pageNumber,
    count = 4,
  }: { level: number; month: number; pageNumber: number; count?: number },
  { rejectWithValue }: any
) => {
  try {
    const res = await axios.get<{
      item1: { videoCount: number; pageCount: number };
      item2: Video[];
    }>(`/Videos/Select/Video/BY/Month/${pageNumber}/${count}/${level}/${month}`);

    return {
      pageCount: res.data.item1.pageCount,
      videoCount: res.data.item1.videoCount,
      videos: res.data.item2,
    };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const fetchVideoByWeek = async (
  {
    level,
    month,
    week,
    pageNumber,
    count = 4,
  }: { level: number; month: number; week: number; pageNumber: number; count?: number },
  { rejectWithValue }: any
) => {
  try {
    const res = await axios.get<{
      item1: { videoCount: number; pageCount: number };
      item2: Video[];
    }>(`/Videos/Select/Video/BY/Week/${pageNumber}/${count}/${level}/${month}/${week}`);

    return {
      pageCount: res.data.item1.pageCount,
      videoCount: res.data.item1.videoCount,
      videos: res.data.item2,
    };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const deleteVideoById = async (id: number, { rejectWithValue }: any) => {
  try {
    const res = await axios.delete(`/Videos/Delete/Video/BY/ID/${id}`);
    return { data: res.data, id };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const fetchVideoById = async (id: number, { rejectWithValue }: any) => {
  try {
    const res = await axios.get(`/Videos/Select/Video/BY/ID/${id}`);
    return {};
  } catch (error: any) {
    rejectWithValue(error.response.data);
  }
};

//#endregion

//#region Exams
export const fetchExamsByLevel = async (
  {
    level,
    pageNumber = 1,
    count = 3,
  }: { level: number; pageNumber?: number; count?: number },
  { rejectWithValue }: any
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
};

export const fetchExamsByMonth = async (
  {
    level,
    month,
    pageNumber = 1,
    count = 3,
  }: { level: number; month: number; pageNumber?: number; count?: number },
  { rejectWithValue }: any
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
};

// Exam/Select/Exam/For/Student/BY/1
export const fetchExamById = async (id: number, { rejectWithValue }: any) => {
  try {
    const res1 = await axios.get<ExamDetails>(`/Exam/Select/Exam/BY/ID/${id}`);
    console.log({ res1 });
    const res2 = await axios.get<{ Exam: ExamWithQuestions[] }>(
      `/Exam/Select/Exam/For/Student/BY/${id}`
    );
    return {
      details: res1.data,
      questions: res2.data.Exam[0].ExamQuestions,
    };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const addExam = async () => {};

export const addQuestionToExam = async (ExamId: number, { rejectWithValue }: any) => {
  /**
   * add quetesin
   * add answer
   *
   *
   *
   */
};
//#endregion
