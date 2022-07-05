import './styles/main.scss';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFoundPage from './components/NotFoundPage';
import StudentProfile from './pages/StudentProfile';
import Exam from './pages/Exam';
import PrivateRoute from '././components/PrivateRoute';
import RecordVideo from './components/videos/RecordVideo';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
// import { getAllStudents } from './features/students-slice'
// import axios from 'axios';

// TODO: videos(paging), exams(paging), students(activate_student)

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(getAllStudents());
    // const insertStudent = async(student: any) => {
    //   const res = await axios.post('/Student/Insert/Student', student);
    //   console.log(res.headers);
    // };
    // insertStudent({
    //   studentName: 'moataz bahaa',
    //   studentLevel: 3,
    //   studentAdress: 'string',
    //   studentEmail: 'string',
    //   studentPhone: 'string',
    //   studentFatherPhone: 'string',
    // });
  });
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/student/:id'
          element={
            <PrivateRoute>
              <StudentProfile />
            </PrivateRoute>
          }
        />
        <Route
          path='/exam/:id'
          element={
            <PrivateRoute>
              <Exam />
            </PrivateRoute>
          }
        />
        <Route
          path='/record-video'
          element={
            <PrivateRoute>
              <RecordVideo />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
