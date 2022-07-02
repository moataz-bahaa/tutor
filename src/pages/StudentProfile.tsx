import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getStudentById } from '../features/students-slice';
import { useEffect } from 'react';
import NotFoundPage from '../components/NotFoundPage';
import Spinner from '../components/Spinner';

interface StudentProfileProps {}

const StudentProfile: React.FC<StudentProfileProps> = (props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStudentById(+id!));
  }, []);

  const { loading, error, student } = useAppSelector((state) => {
    return {
      loading: state.students.loading,
      error: state.students.error,
      student: state.students.currentStudent,
    };
  });

  if (loading) {
    return <Spinner />;
  }

  if (!id || error || !student) {
    return <NotFoundPage message={error} />;
  }

  return (
    <div className='student-profile'>
      <div className='container pt-10'>
        <div className='row g-3 mb-3'>
          <div className='col-12 col-lg-4 mb-1 img-container'>
            <img src='../images/student-male.jpg' alt='student' />
          </div>
          <ul className='col-12 col-lg-8 list-items pt-lg-5'>
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
      </div>
    </div>
  );
};

export default StudentProfile;
