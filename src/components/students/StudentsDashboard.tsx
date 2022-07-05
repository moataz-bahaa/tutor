import { motion } from 'framer-motion';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
  getAllStudents,
  deleteStudent,
  authStudent,
  getStudentsByLevel,
  getStudentsByName,
} from '../../features/students-slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import FilterStudents from './FilterStudents';
import Alert from '../Alert';

interface StudentsDashboardProps {}

const StudentsDashboard: React.FC<StudentsDashboardProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState<{
    type: 'all' | 'level' | 'search';
    activePage: number;
    value?: string | number;
  }>({ type: 'all', activePage: 1 });

  useEffect(() => {
    if (current.type === 'all') {
      dispatch(getAllStudents({ pageNumber: current.activePage }));
    } else if (current.type === 'level') {
      dispatch(getStudentsByLevel({ pageNumber: current.activePage }));
    } else if (current.type === 'search') {
      dispatch(
        getStudentsByName({
          name: current.value as string,
          pageNumber: current.activePage,
        })
      );
    }
  }, [current]);

  const { students, loading, error, numberOfPages } = useAppSelector((state) => {
    return {
      students: state.students.data.students,
      loading: state.students.loading,
      error: state.students.error,
      numberOfPages: state.students.data.pageCount,
    };
  });

  const setPage = (value: number) => {
    return setCurrent((prevState) => {
      return {
        ...prevState,
        activePage: value,
      };
    });
  };

  return (
    <>
      <FilterStudents setCurrent={setCurrent} />
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
      <Pagination
        activePage={current.activePage}
        numberOfPages={numberOfPages}
        setPage={setPage}
      />
    </>
  );
};

export default StudentsDashboard;
