import { Link } from 'react-router-dom';
import FilterExams from './FilterExams';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Alert from '../Alert';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';
import { useState, useEffect } from 'react';
import { getExamsByLevel, getExamsByMonth } from '../../features/exam-slice';

interface ExamsDashboardProps {}

export interface State {
  type: null | 'level' | 'level-month';
  page: number;
  level?: number;
  month?: number;
}

const ExamsDashboard: React.FC<ExamsDashboardProps> = (props) => {
  const [current, setCurrent] = useState<State>({ type: null, page: 1 });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (current.type === 'level') {
      dispatch(getExamsByLevel({ level: current.level!, pageNumber: current.page }));
    } else if (current.type === 'level-month') {
      dispatch(
        getExamsByMonth({
          level: current.level!,
          month: current.month!,
          pageNumber: current.page,
        })
      );
    }
  }, [current]);

  const { loading, error, exams, numberOfPages } = useAppSelector((state) => {
    return {
      loading: state.exams.loading,
      error: state.exams.error,
      exams: state.exams.data.exams,
      numberOfPages: state.exams.data.pageCount,
    };
  });

  return (
    <div className='exams-dashboard'>
      <Link className='btn btn-lg-lg btn-blue mb-2' to='/exam/328221'>
        اضافة امتحان
      </Link>
      <FilterExams current={current} setCurrent={setCurrent} />
      <h1 className='title'>الامتحانات</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert message={error} variant='danger' />
      ) : (
        <>
          <table className='exams-table'>
            <thead>
              <tr>
                <th>الرقم</th>
                <th>الرقم التعريفى</th>
                <th>اسم الامتحان</th>
                <th>رقم الامتحان</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => {
                return (
                  <tr key={exam.examId} onClick={() => navigate(`/exam/${exam.examId}`)}>
                    <td>{index + 1}</td>
                    <td>{exam.examId}</td>
                    <td>{exam.examName}</td>
                    <td>{exam.examNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            activePage={current.page}
            setPage={(value: number) => {
              setCurrent((prev) => {
                return {
                  ...prev,
                  page: value,
                };
              });
            }}
            numberOfPages={numberOfPages}
          />
        </>
      )}
    </div>
  );
};

export default ExamsDashboard;
