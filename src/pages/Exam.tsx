import AddQuestion from '../components/exams/AddQuestion';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { getExamById } from '../features/exam-slice';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import Question from '../components/exams/Question';

interface AddExamProps {}

const Exam: React.FC<AddExamProps> = (props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getExamById(+id!));
  }, []);

  const { error, loading, details, questions } = useAppSelector((state) => {
    return {
      loading: state.exams.loading,
      details: state.exams.curExam.details,
      questions: state.exams.curExam.questions,
      error: state.exams.error,
    };
  });

  if (loading) {
    return (
      <div className='container pt-10'>
        <Spinner />;
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
    <div className='exam pt-10'>
      <div className='container'>
        {loading ? (
          <Spinner />
        ) : error || !details ? (
          <Alert message={error} variant='danger' />
        ) : (
          <>
            <AddQuestion />
            <ul className='list-items'>
              <li>{details.examId}</li>
              <li>{details.examDate}</li>
              <li>{details.examName}</li>
              <li>{details.examNumber}</li>
              <li>{details.examTimeLine}</li>
              <li>{details.levelName}</li>
              <li>{details.monthText}</li>
            </ul>
            {questions && (
              <div className='questions'>
                <h1 className='text-blue text-center text-underline my-2'>الاسئله</h1>
                {questions.map((q) => (
                  <Question key={q.QuestionID + Math.random()} question={q} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Exam;
