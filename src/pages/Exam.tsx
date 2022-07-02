import AddQuestion from '../components/AddQuestion';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector} from '../app/hooks';
import { useEffect } from 'react';
import { getExamById } from '../features/exam-slice';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

interface AddExamProps {}

const Exam: React.FC<AddExamProps> = (props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getExamById(+id!));
  }, []);

  const { error, loading, exam } = useAppSelector((state) => {
    return {
      loading: state.exams.loading,
      exam: state.exams.curExam,
      error: state.exams.error
    }
  });

  if (error || !exam) {
    return <Alert message={error} variant='danger' />;
  }
  return (
    <div className='add-exam pt-10'>
      <div className='container'>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <AddQuestion />
            <ul className="list-items">
              <li>{exam.examId}</li>
              <li>{exam.examDate}</li>
              <li>{exam.examName}</li>
              <li>{exam.examNumber}</li>
              <li>{exam.examTimeLine}</li>
              <li>{exam.levelName}</li>
              <li>{exam.monthText}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Exam