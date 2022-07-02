import { motion } from 'framer-motion';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getAllStudents, deleteStudent, authStudent } from '../features/students-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import Pagination from './Pagination';
import FilterStudents from './FilterStudents';
import Alert from './Alert';

interface StudentsDashboardProps {}

const StudentsDashboard: React.FC<StudentsDashboardProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    dispatch(getAllStudents({ pageNumber: activePage }));
  }, []);

  const { students, loading, error } = useAppSelector((state) => {
    return {
      students: state.students.data,
      loading: state.students.loading,
      error: state.students.error,
    };
  });

  return (
    <>
      <FilterStudents />
      {error ? (
        <Alert message={error} variant='danger' />
      ) : loading ? (
        <Spinner />
      ) : (
        <table className='students-table'>
          <thead>
            <tr>
              <th>رقم</th>
              <th>رقم الطالب</th>
              <th>اسم الطالب</th>
              <th>المستوى</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => {
              return (
                <motion.tr
                  key={student.studentId}
                  initial={{ opacity: 0 }}
                  whileInView={{ type: 'sprint', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <td
                    onClick={(e) => {
                      navigate(`/student/${student.studentId}`);
                    }}
                  >
                    {i + 1}
                  </td>
                  <td
                    onClick={(e) => {
                      navigate(`/student/${student.studentId}`);
                    }}
                  >
                    {student.studentId}
                  </td>
                  <td
                    onClick={(e) => {
                      navigate(`/student/${student.studentId}`);
                    }}
                  >
                    {student.studentName}
                  </td>
                  <td
                    onClick={(e) => {
                      navigate(`/student/${student.studentId}`);
                    }}
                  >
                    {student.levelName || student.levelId}
                  </td>
                  <td>
                    <button
                      className='btn btn-green ml-md-1'
                      onClick={() => {
                        dispatch(authStudent(student));
                      }}
                    >
                      {student.authValue ? 'قفل الحساب' : 'تنشيط الحساب'}
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => {
                        dispatch(deleteStudent(student.studentId));
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      )}
      {students.length > 8 && (
        <Pagination
          activePage={activePage}
          numberOfPages={10}
          setActivePage={setActivePage}
        />
      )}
    </>
  );
};

export default StudentsDashboard;
