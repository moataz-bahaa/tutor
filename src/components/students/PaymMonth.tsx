import Modal from '../Modal';
import { FcMoneyTransfer } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { insertStudentPayment } from '../../features/students/students-actions';
import { CgSpinnerTwo } from 'react-icons/cg';
import Alert from '../Alert';

const Spinner = <CgSpinnerTwo className='spinner' fontSize='20px' />;

interface PayMonthProps {
  studentId: number;
}

const PayMonth: React.FC<PayMonthProps> = ({ studentId }) => {
  const [showModal, setShowModal] = useState(false);
  const [months, setMonths] = useState<{ monthId: number; monthText: string }[]>([]);
  const [payMonth, setPayMonth] = useState(0);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => {
    return {
      loading: state.students.loading,
      error: state.students.error,
    };
  });

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const res = await axios.get('/Dates/Select/Months');
        setMonths(res.data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };
    fetchMonths();
  }, []);

  return (
    <>
      <button className='btn btn-blue' onClick={() => setShowModal(true)}>
        دفع شهر
        <FcMoneyTransfer />
      </button>
      <Modal
        closeButton
        onClose={() => setShowModal(false)}
        show={showModal}
        header='دفع شهر'
        footerButton={{
          text: loading ? Spinner : 'دفع',
          onClick: async() => {
            if (payMonth === 0) {
              return alert('اختر شهر اولا');
            }
            await dispatch(insertStudentPayment({ payMonth, studentId }));
          },
        }}
      >
        {error && <Alert message={error} variant='danger' />}
        <select
          className='form-control my-2'
          onChange={(e) => {
            setPayMonth(+e.target.value);
          }}
          value={payMonth}
        >
          <option hidden value='0'>
            اختر الشهر
          </option>
          {months.map((m) => (
            <option key={m.monthId} value={m.monthId}>
              {m.monthText}
            </option>
          ))}
        </select>
      </Modal>
    </>
  );
};

export default PayMonth;
