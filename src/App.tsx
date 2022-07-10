import './styles/main.scss';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFoundPage from './components/NotFoundPage';
import StudentProfile from './pages/StudentProfile';
import Exam from './pages/ExamDetails';
import PrivateRoute from '././components/PrivateRoute';
import RecordVideo from './pages/RecordVideo';
import ExamQuestions from './pages/ExamQuestions';

function App() {
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
          path='/exam-details/:id'
          element={
            <PrivateRoute>
              <Exam />
            </PrivateRoute>
          }
        />
        <Route
          path='/exam-questions/:id'
          element={
            <PrivateRoute>
              <ExamQuestions />
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
