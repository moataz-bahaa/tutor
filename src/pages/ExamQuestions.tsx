import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchExamQuestionsById } from '../features/exams/examsActions';
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
    dispatch(fetchExamQuestionsById(+id!));
  }, []);

  const { error, loading, questions } = useAppSelector((state) => {
    const lastAction = state.lastAction;
    return {
      questions: state.exams.curExam.questions,
      error: lastAction === fetchExamQuestionsById.rejected.type ? state.exams.error : '',
      loading: state.exams.loading && lastAction === fetchExamQuestionsById.pending.type,
    };
  });

  if (loading) {
    return (
      <div className='pt-10'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container pt-10 pb-5'>
        <Alert message={error || 'لا توجد اساله'} variant='danger' />
      </div>
    );
  }

  return (
    <div className='container pt-10 pb-5 exam-questions'>
      {questions.map((q) => {
        return <Question key={q.QuestionID} question={q} />;
      })}
      <AddQuestion examId={+id!} />
    </div>
  );
};

export default Component;
