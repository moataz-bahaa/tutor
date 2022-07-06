import React, { useState } from 'react';
import Modal from '../Modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addExamAction } from '../../features/exam-slice';
import { useNavigate } from 'react-router-dom';

interface AddExamProps {}

interface Exam {
  examLevel: number;
  examMonth: number;
  examName: string;
  examNumber: string;
  examTimeLine: string;
}

const AddExam: React.FC<AddExamProps> = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [exam, setExam] = useState({} as Exam);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.exams.loading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExam((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddExam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addExamAction({
        exam,
        callback: (id: string) => navigate(`/exam-details/${id}`),
      })
    );
  };

  return (
    <div className='add-exam'>
      <button className='btn btn-lg btn-blue' onClick={() => setShowModal(true)}>
        اضافة امتحان
      </button>
      <Modal
        show={showModal}
        header='اضافة امتحان'
        closeButton
        onClose={() => setShowModal(false)}
        footerButton={{
          text: loading ? 'جارى الاضافه...' : 'اضافة',
          type: 'submit',
          form: 'add-exam-form',
        }}
      >
        <form id='add-exam-form' onSubmit={handleAddExam}>
          <input
            onChange={handleChange}
            className='form-control mb-1'
            type='text'
            name='examName'
            placeholder='اسم الامتحان'
          />
          <input
            onChange={handleChange}
            className='form-control mb-2'
            type='text'
            name='examNumber'
            placeholder='رقم الامتحان'
          />
          <input
            onChange={handleChange}
            className='form-control mb-1'
            type='number'
            name='examMonth'
            min='1'
            max='12'
            placeholder='امتحان شهر'
          />
          <input
            onChange={handleChange}
            className='form-control mb-1'
            type='time'
            name='examTimeLine'
          />
          <input
            onChange={handleChange}
            className='form-control mb-1'
            type='number'
            name='examLevel'
            min='1'
            max='3'
            placeholder='امتحان الصف'
          />
        </form>
      </Modal>
    </div>
  );
};

export default AddExam;
