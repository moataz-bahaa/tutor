import { Question } from '../../features/exams/examsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteQuestionById } from '../../features/exams/examsActions';
import { SpinnerForBtn } from '../Spinner';

interface ComponentProps {
  question: Question;
}

const Component: React.FC<ComponentProps> = ({ question }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => {
    const lastAction = state.lastAction;
    return {
      loading: state.exams.loading && lastAction === deleteQuestionById.pending.type,
    };
  });

  const handleDeleteQuestion = () => dispatch(deleteQuestionById(question.QuestionID));

  return (
    <>
      <h1 className='text-blue text-center'>{question.QuestionNumber}</h1>
      <ul className='list-items mb-2'>
        <li className='d-flex js-space-between'>
          {question.QuestionText}
          <button className='btn btn-danger' onClick={handleDeleteQuestion}>
            {loading ? <SpinnerForBtn /> : 'حذف السؤال'}
          </button>
        </li>
        {question.ExamAnswers.map((answer) => (
          <li
            key={answer.AnswerID}
            className={
              answer.AnswerNumber === answer.CorrectAnswer[0].CorrectAnswerNumber
                ? 'active'
                : ''
            }
          >
            {answer.AnswerNumber}) {answer.AnswerText}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Component;
