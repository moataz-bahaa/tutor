import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { getExamDetailsById } from '../features/exam-slice';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

interface AddExamProps {}

const Exam: React.FC<AddExamProps> = (props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getExamDetailsById(+id!));
  }, []);

  const { error, loading, details } = useAppSelector((state) => {
    return {
      loading: state.exams.loading,
      details: state.exams.curExam.details,
      error: state.exams.error,
    };
  });

  if (loading) {
    return <Spinner />;
  }

  if (error || !details) {
    return (
      <div className='container pt-5'>
        <Alert message={error} variant='danger' />
      </div>
    );
  }

  return (
    <div className='exam py-5'>
      <div className='container'>
        <>
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
