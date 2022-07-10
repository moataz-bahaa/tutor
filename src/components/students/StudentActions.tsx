import { MdDelete } from 'react-icons/md';
import {
  deleteStudentById,
  authenticateStudent,
} from '../../features/students/students-actions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PayMonth from './PaymMonth';
import { toggleCurrentAuthValue } from '../../features/students/students-slice';
import { CgSpinnerTwo } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

interface StudentActionsProps {
  studentId: number;
  authValue: boolean;
}

const StudentActions: React.FC<StudentActionsProps> = ({ studentId, authValue }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => {
    const lastAction = state.lastAction;
    return {
      loading:
        state.students.loading &&
        lastAction !== authenticateStudent.fulfilled.type &&
        lastAction !== authenticateStudent.rejected.type,
    };
  });
  const authenticateBtnText = authValue ? 'قفل الحساب' : 'تنشيط الحساب';
  return (
    <>
      <button
        className='btn btn-green ml-md-1'
        onClick={() => {
          dispatch(
            authenticateStudent({
              studentId,
              value: !authValue,
            })
          );
          dispatch(toggleCurrentAuthValue());
        }}
        disabled={loading}
      >
        {loading ? (
          <CgSpinnerTwo className='spinner' fontSize='20px' />
        ) : (
          authenticateBtnText
        )}
      </button>
      <button
        className='btn btn-danger ml-md-1'
        onClick={() => {
          dispatch(deleteStudentById(studentId));
          navigate('/dashboard');
        }}
      >
        <MdDelete />
      </button>
      <PayMonth studentId={studentId} />
    </>
  );
};

export default StudentActions;
