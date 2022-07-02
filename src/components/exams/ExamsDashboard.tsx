import { Link } from 'react-router-dom';
import FilterExams from './FilterExams';
import { useAppSelector } from '../../app/hooks';
import Alert from '../Alert';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';

interface ExamsDashboardProps {}

const ExamsDashboard: React.FC<ExamsDashboardProps> = (props) => {
  const { loading, error, exams } = useAppSelector((state) => {
    return {
      loading: state.exams.loading,
      error: state.exams.error,
      exams: state.exams.data,
    };
  });
  const navigate = useNavigate();

  return (
    <div className='exams-dashboard'>
      <Link className='btn btn-lg-lg btn-blue mb-2' to='/exam/328221'>
        اضافة امتحان
      </Link>
      <FilterExams />
      <h1 className='title'>الامتحانات</h1>
      {error ? (
        <Alert message={error} variant='danger' />
      ) : loading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
};

export default ExamsDashboard;
