import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchStudentById } from '../features/students/students-actions';
import { useEffect } from 'react';
import NotFoundPage from '../components/NotFoundPage';
import Spinner from '../components/Spinner';
import StudentActions from '../components/students/StudentActions';
import Alert from '../components/Alert';
import { clearStudentsState } from '../features/students/students-slice';

interface StudentProfileProps {}

const StudentProfile: React.FC<StudentProfileProps> = (props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchStudentById(+id!));
    return () => {
      dispatch(clearStudentsState());
    };
  }, []);

  const { loading, error, student, lastAction } = useAppSelector((state) => {
    return {
      loading: state.students.loading,
      error: state.students.error,
      student: state.students.currentStudent,
      lastAction: state.lastAction,
    };
  });

  if (!student || (loading && lastAction === fetchStudentById.pending.type)) {
    return (
      <div className='pt-10'>
        <Spinner />
      </div>
    );
  }

  if (error && lastAction === fetchStudentById.rejected.type) {
    return <NotFoundPage message={error} />;
  }

  return (
    <div className='student-profile pt-10 pb-5'>
      <div className='container py-5'>
        <div className='row g-3 mb-3'>
          <div className='col-12 col-lg-4 mb-1 img-container'>
            <img src='../images/student-male.jpg' alt='student' />
          </div>
          <ul className='col-12 col-lg-8 list-items'>
            <li>اسم الطالب: {student.studentName}</li>
            <li>الرقم التعريفى: {student.studentId}</li>
            <li>الايميل: {student.studentEmail}</li>
            <li>رقم الموبايل: {student.studentPhone}</li>
            <li>عنوان الطالب: {student.studentAdress}</li>
            <li>رقم تليفون ولى الامر: {student.studentFatherPhone}</li>
            <li>اسم المستخدم: {student.studentUserName}</li>
            <li>كلمة السر: {student.studentPassWord}</li>
            <li>عنوان الماك الخاص بموبايل الطالب: {student.studentMobileMacAdress}</li>
          </ul>
        </div>
        <StudentActions studentId={student.studentId} authValue={student.authValue} />
        {error &&
          (lastAction === 'student/authenticate' || lastAction === 'student/delete') && (
            <Alert message={error} variant='danger' />
          )}
      </div>
    </div>
  );
};

export default StudentProfile;
