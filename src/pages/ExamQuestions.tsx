import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getExamQuestionsById } from '../features/exam-slice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import Question from '../components/exams/Question';
import AddQuestion from '../components/exams/AddQuestion';

interface ComponentProps {}

const Component: React.FC<ComponentProps> = ({}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getExamQuestionsById(+id!));
  }, []);

  const { error, loading, questions } = useAppSelector((state) => {
    return {
      loading: state.exams.loading,
      questions: state.exams.curExam.questions,
      error: state.exams.error,
    };
  });

  if (loading) {
    return <Spinner />;
  }

  if (error || !questions) {
    return (
      <div className='container pt-5'>
        <Alert message={error} variant='danger' />
      </div>
    );
  }

  return (
    <div className='container py-5 exam-questions'>
      {questions.map((q) => {
        return <Question key={q.QuestionID} question={q} />;
      })}
      <AddQuestion examId={+id!} />
    </div>
  );
};

export default Component;
