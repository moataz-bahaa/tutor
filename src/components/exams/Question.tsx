import { Question } from '../../features/exam-slice';

interface ComponentProps {
  question: Question;
}

const Component: React.FC<ComponentProps> = ({ question }) => {
  return (
    <>
      <h2 className='text-blue text-center'>{question.QuestionNumber}</h2>
      <ul className='list-items mb-2'>
        <li>{question.QuestionText}</li>
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
