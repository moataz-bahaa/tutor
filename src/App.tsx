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
import RecordVideo from './components/RecordVideo';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getAllStudents } from './features/students-slice'

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllStudents());
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
