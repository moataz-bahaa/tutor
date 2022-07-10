import Modal from '../Modal';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addQuestionToExam } from '../../features/exams/examsActions';
import Alert from '../Alert';
import { SpinnerForBtn } from '../Spinner';

interface AddQuestionProps {
  examId: number;
}

interface Question {
  questionNumber: string;
  questionText: string;
  examId: number;
}

interface Answer {
  answerNumber: string;
  answerText: string;
}

export interface State {
  question: Question;
  answers: Answer[];
  correctAnswerNumber: string;
}

const AddQuestion: React.FC<AddQuestionProps> = ({ examId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<State>({
    question: {
      questionNumber: '',
      questionText: '',
      examId,
    },
    answers: [],
    correctAnswerNumber: '',
  });
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => {
    const lastAction = state.lastAction;
    return {
      loading: state.exams.loading && lastAction === addQuestionToExam.pending.type,
      error: lastAction === addQuestionToExam.rejected.type ? state.exams.error : '',
    };
  });

  const addAnswer = () => {
    setState((prev) => {
      return {
        ...prev,
        answers: [...prev.answers, { answerNumber: '', answerText: '' }],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addQuestionToExam(state));
  };

  return (
    <div className='add-question mb-1'>
      <button className='btn btn-lg-lg btn-blue' onClick={() => setIsOpen(true)}>
        اضاقة سؤال
      </button>
      <Modal
        header='اضاقة سؤال'
        onClose={() => setIsOpen(false)}
        closeButton
        footerButton={{
          text: loading ? <SpinnerForBtn /> : 'اضاقة',
          type: 'submit',
          form: 'add-question-form',
        }}
        show={isOpen}
      >
        {error && <Alert message={error} variant='danger' />}
        <form
          id='add-question-form'
          className='question-form py-1'
          onSubmit={handleSubmit}
        >
          <div className='row g-1 mb-1'>
            <input
              required
              type='text'
              className='col-2 form-control'
              placeholder='رقم السؤال'
              value={state.question.questionNumber}
              onChange={(e) => {
                setState((prev) => {
                  return {
                    ...prev,
                    question: {
                      ...prev.question,
                      questionNumber: e.target.value,
                    },
                  };
                });
              }}
            />
            <input
              required
              type='text'
              className='col-10 form-control'
              placeholder='السؤال'
              value={state.question.questionText}
              onChange={(e) => {
                setState((prev) => {
                  return {
                    ...prev,
                    question: {
                      ...prev.question,
                      questionText: e.target.value,
                    },
                  };
                });
              }}
            />
          </div>
          {state.answers.map((answer, index) => {
            return (
              <div key={index} className='row g-1 mb-1'>
                <input
                  required
                  type='text'
                  className='col-2 form-control'
                  placeholder='رقم الاجابه'
                  value={answer.answerNumber}
                  onChange={(e) => {
                    const newState = { ...state };
                    newState.answers[index].answerNumber = e.target.value;
                    setState(newState);
                  }}
                />
                <input
                  required
                  type='text'
                  className='col-10 form-control'
                  placeholder='الاجابه'
                  value={answer.answerText}
                  onChange={(e) => {
                    const newState = { ...state };
                    newState.answers[index].answerText = e.target.value;
                    setState(newState);
                  }}
                />
              </div>
            );
          })}
          {state.answers.length > 0 && (
            <select
              required
              className='form-control mb-1'
              value={state.correctAnswerNumber}
              onChange={(e) => {
                setState((prev) => {
                  return {
                    ...prev,
                    correctAnswerNumber: e.target.value,
                  };
                });
              }}
            >
              {state.answers.map((answer) => (
                <option key={Math.random()} value={answer.answerNumber}>
                  {answer.answerNumber}
                </option>
              ))}
            </select>
          )}
          <button type='button' className='btn btn-blue' onClick={addAnswer}>
            اضافة اجابه
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddQuestion;
