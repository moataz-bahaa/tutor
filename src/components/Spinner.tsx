import { CgSpinnerTwo } from 'react-icons/cg';

const Spinner = () => {
  return (
    <div className=''>
      <img
        src='/images/spinner.gif'
        style={{
          width: '250px',
          margin: 'auto',
          display: 'block',
        }}
        alt='Loading....'
      />
    </div>
  );
};

export const SpinnerForBtn = ({ className }: { className?: string }) => {
  return (
    <CgSpinnerTwo className={`spinner ${className ? className : ''}`} fontSize='20px' />
  );
};

export default Spinner;
