import React, { useState } from 'react';
import Modal from '../Modal';
import { useAppDispatch, useAppSelector, useMonths } from '../../app/hooks';
import { addExam } from '../../features/exams/examsActions';
import { useNavigate } from 'react-router-dom';
import { SpinnerForBtn } from '../Spinner';

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
  const [exam, setExam] = useState<Exam>({
    examLevel: 0,
    examMonth: 0,
    examName: '',
    examNumber: '',
    examTimeLine: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const months = useMonths();
  const { loading } = useAppSelector((state) => {
    return {
      loading: state.exams.loading,
      // lastAction: state.lastAction
    };
  });

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
    if (exam.examMonth === 0 || exam.examLevel === 0) {
      return alert('املا جميع البيانات اولا');
    }
    dispatch(
      addExam({
        exam,
        callback: (id: string) => navigate(`/exam-details/${id}`),
      })
    );
  };

  return (
    <div className='add-exam mb-1'>
      <button className='btn btn-lg btn-blue' onClick={() => setShowModal(true)}>
        اضافة امتحان
      </button>
      <Modal
        show={showModal}
        header='اضافة امتحان'
        closeButton
        onClose={() => setShowModal(false)}
        footerButton={{
          text: loading ? <SpinnerForBtn /> : 'اضافة',
          type: 'submit',
          form: 'add-exam-form',
        }}
      >
        <form id='add-exam-form' onSubmit={handleAddExam}>
          <input
            required
            onChange={handleChange}
            className='form-control mb-1'
            type='text'
            name='examName'
            placeholder='اسم الامتحان'
          />
          <input
            required
            onChange={handleChange}
            className='form-control mb-1'
            type='text'
            name='examNumber'
            placeholder='رقم الامتحان'
          />
          <select
            className='form-control mb-1'
            value={exam.examMonth}
            onChange={(e) => {
              setExam((prev) => ({
                ...prev,
                examMonth: +e.target.value,
              }));
            }}
          >
            <option value='0'>اختر شهر</option>
            {months.map((m) => (
              <option key={m.monthId} value={m.monthId}>
                {m.monthText}
              </option>
            ))}
          </select>
          <input
            required
            onChange={handleChange}
            className='form-control mb-1'
            type='time'
            name='examTimeLine'
          />
          <select
            className='form-control mb-1'
            value={exam.examLevel}
            onChange={(e) => {
              setExam((prev) => ({
                ...prev,
                examLevel: +e.target.value,
              }));
            }}
          >
            <option value='0' hidden>
              اختر الصف
            </option>
            <option value='1'>الصف الاول</option>
            <option value='2'>الصف الثانى</option>
            <option value='3'>الصف الثالث</option>
          </select>
        </form>
      </Modal>
    </div>
  );
};

export default AddExam;
