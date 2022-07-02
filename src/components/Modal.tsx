import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  header: string;
  show: boolean;
  closeButton: boolean;
  footerButton?: {
    text: string;
    onClick: () => void;
  };
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  header,
  footerButton,
  closeButton,
  show,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className='modal'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className='modal-content'
            initial={{
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: 0,
            }}
            animate={{ type: 'spring', top: '60px', opacity: 1 }}
            exit={{ top: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='modal-content-header d-flex js-space-between'>
              <div>{header}</div>
              <FaTimes className='close-icon' onClick={onClose} />
            </div>
            {children}
            <div className='modal-content-footer d-flex flex-end'>
              {closeButton && (
                <button
                  className='btn btn-lg-lg btn-danger ml-1'
                  onClick={onClose}
                >
                  اغلق
                </button>
              )}
              {footerButton && (
                <button
                  className='btn btn-lg-lg btn-blue'
                  onClick={footerButton.onClick}
                >
                  {footerButton.text}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
