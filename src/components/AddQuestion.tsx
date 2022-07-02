import Modal from './Modal';
import React, { useState } from 'react';

interface AddQuestionProps {}

type Question = {
  text: string;
  answers: {
    'answer-1': string;
    'answer-2': string;
    'answer-3': string;
    'answer-4': string;
  };
  correctAnswerNumber: number;
};

const AddQuestion: React.FC<AddQuestionProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState<Question>({} as Question);

  const handleChangeOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion((q) => {
      return {
        ...q,
        answers: {
          ...q.answers,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  return (
    <div className='add-question mb-1'>
      <button
        className='btn btn-lg-lg btn-blue'
        onClick={() => setIsOpen(true)}
      >
        اضاقة سؤال
      </button>
      <Modal
        header='اضاقة سؤال'
        onClose={() => setIsOpen(false)}
        closeButton
        footerButton={{
          text: 'اضاقة',
          onClick: () => {
            console.log(question);
            // setIsOpen(false);
          },
        }}
        show={isOpen}
      >
        <form className='question-form py-1'>
          <div className='row mb-1'>
            <div className='col-12 col-md-2'>
              <label>السؤال</label>
            </div>
            <div className='col-12 col-md-10'>
              <textarea
                name=''
                id=''
                className='form-control'
                onChange={(e) => {
                  setQuestion((q) => {
                    return {
                      ...q,
                      text: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>
          <div className='row mb-1'>
            <div className='col-12 col-md-2'>
              <label>الاختيار الاول</label>
            </div>
            <div className='col-12 col-md-10'>
              <input
                type='text'
                name='answer-1'
                id=''
                className='form-control'
                onChange={handleChangeOnInput}
              />
            </div>
          </div>
          <div className='row mb-1'>
            <div className='col-12 col-md-2'>
              <label>الاختيار الثانى</label>
            </div>
            <div className='col-12 col-md-10'>
              <input
                type='text'
                name='answer-2'
                id=''
                className='form-control'
                onChange={handleChangeOnInput}
              />
            </div>
          </div>
          <div className='row mb-1'>
            <div className='col-12 col-md-2'>
              <label>الاختيار الثالث</label>
            </div>
            <div className='col-12 col-md-10'>
              <input
                type='text'
                name='answer-3'
                id=''
                className='form-control'
                onChange={handleChangeOnInput}
              />
            </div>
          </div>
          <div className='row mb-1'>
            <div className='col-12 col-md-2'>
              <label>الاختيار الرابع</label>
            </div>
            <div className='col-12 col-md-10'>
              <input
                type='text'
                name='answer-4'
                id=''
                className='form-control'
                onChange={handleChangeOnInput}
              />
            </div>
          </div>
          <div className='row mb-1'>
            <div className='col-12 col-md-2'>
              <label>الاجابه الصحيحه</label>
            </div>
            <div className='col-12 col-md-10'>
              <select
                className='form-control'
                onChange={(e) => {
                  setQuestion((q) => {
                    return {
                      ...q,
                      correctAnswerNumber: +e.target.value,
                    };
                  });
                }}
              >
                <option value='1'>الاختيار الاول</option>
                <option value='2'>الاختيار الثانى</option>
                <option value='3'>الاختيار الثالث</option>
                <option value='4'>الاختيار الرابع</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddQuestion;
