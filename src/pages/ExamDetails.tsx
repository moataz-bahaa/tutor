import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { fetchExamDetailsById, deleteExamById } from '../features/exams/examsActions';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { SpinnerForBtn } from '../components/Spinner';

interface AddExamProps {}

const Exam: React.FC<AddExamProps> = (props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchExamDetailsById(+id!));
  }, []);

  const { error, loading, details, lastAction } = useAppSelector((state) => {
    return {
      loading: state.exams.loading,
      details: state.exams.curExam.details,
      error: state.exams.error,
      lastAction: state.lastAction,
    };
  });

  if (loading && lastAction === fetchExamDetailsById.pending.type) {
    return (
      <div className='pt-10'>
        <Spinner />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className='container pt-10'>
        <Alert message={error} variant='danger' />
      </div>
    );
  }

  return (
    <div className='exam pt-10 pb-5'>
      <div className='container'>
        <>
          <button
            className='btn btn-lg btn-danger'
            onClick={() =>
              dispatch(
                deleteExamById({
                  examId: details.examId,
                  callback: () => {
                    alert('تم حذف الامتحان');
                    navigate('/dashboard');
                  },
                })
              )
            }
          >
            {loading && lastAction === deleteExamById.pending.type ? (
              <SpinnerForBtn />
            ) : (
              'حذف الامتحان'
            )}
          </button>
          <ul className='list-items'>
            <li>{details.examId}</li>
            <li>{details.examDate}</li>
            <li>{details.examName}</li>
            <li>{details.examNumber}</li>
            <li>{details.examTimeLine}</li>
            <li>{details.levelName}</li>
            <li>{details.monthText}</li>
          </ul>
          <Link
            to={`/exam-questions/${details.examId}`}
            className='btn btn-lg btn-blue mt-2'
          >
            الاسئله
          </Link>
        </>
      </div>
    </div>
  );
};

export default Exam;
