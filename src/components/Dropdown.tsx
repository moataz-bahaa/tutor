import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdArrowDropdown } from 'react-icons/io';

type Item = {
  label: string;
  onClick: () => void;
};
interface DropdownProps {
  title: string;
  items: Item[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((value) => !value);
  return (
    <div className='dropdown'>
      <div className='title' onClick={toggleMenu}>
        <div>{title}</div>
        <IoMdArrowDropdown />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: '200px' }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            className='items'
          >
            {items.map((item, index) => {
              return (
                <div
                  key={Math.random().toString()}
                  className='item'
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
