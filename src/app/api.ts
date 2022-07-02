import axios from 'axios';
import { Student } from '../features/students-slice';
import { Video } from '../features/videos-slice';
// import { Exam } from '../features/exam-slice';

axios.defaults.baseURL = 'http://mobisite201.somee.com/api';
// axios.defaults.timeout = 10000;

// student endpoints
export const fetchAllStudents = async (
  { pageNumber = 1, rowCount = 50 } = { pageNumber: 1, rowCount: 50 }
) => {
  const params = new URLSearchParams();
  params.append('PageNumber', '3');
  params.append('RowCount', '2');
  console.log(params.toString());
  const res = await axios.get<Student[]>('/Student/Select/All/Students', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    params: {
      PageNumber: 1,
      RowCount: 1,
    },
  });
  // console.log(res.headers);
  // console.log(res.data.length);
  fetch(
    `http://mobisite201.somee.com/api/Student/Select/All/Students?PageNumber=1&RowCount=2`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      
    }
  )
    .then((res) => res.json())
    .then((data) => console.log({len: data.length}))
    .catch((err) => console.log(err.message));
  return res.data;
};

export const fetchStudentsByLevel = async (levelId: number) => {
  const res = await axios.get<Student[]>(`/Student/Select/Students/BY/Level/${levelId}`);
  return res.data;
};

export const fetchStudentById = async (id: number) => {
  const res = await axios.get<Student>(`/Student/Select/Student/BY/ID/${id}`);
  return res.data;
};

export const fetchStudentsByName = async (name: string) => {
  const res = await axios.get<Student[]>(
    `/Student/Select/Student/BY/Contains/Name/${name}`
  );
  return res.data;
};

export const deleteStudentById = async (id: number) => {
  const res = await axios.delete(`/Student/Delete/Student/${id}`);
  return { id, data: res.data };
};

export const authenticateStudent = async (student: Student) => {
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
};

// video endpoint

export const postVideo = async (data: FormData) => {
  const res = await axios.post<string>('/Videos/Insert/Video', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const fetchAllVideos = async () => {
  const res = await axios.get<Video[]>('/Videos/Select/All/Videos');
  return res.data;
};

export const fetchVideosByLevel = async (level: number) => {
  const res = await axios.get<Video[]>(`/Videos/Select/Video/By/level/${level}`);
  return res.data;
};

export const deleteVideoById = async (id: number) => {
  const res = await axios.delete(`/Videos/Delete/Video/BY/ID/${id}`);
  return { data: res.data, id };
};

// Exams
export const fetchExamsByLevel = async (level: number) => {
  const res = await axios.get(`/Exam/Select/Exam/BY/Level/${level}`);
  return {
    data: res.data,
    headers: res.headers,
  };
};

export const fetchExamById = async (id: number) => {
  const res = await axios.get(`/Exam/Select/Exam/BY/ID/${id}`);
  return {
    data: res.data,
    headers: res.headers,
  };
};
