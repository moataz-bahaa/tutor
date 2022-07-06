import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import { useRef, useEffect, useState } from 'react';
import { logout } from '../../features/admin-slice';
import { useAppDispatch } from '../../app/hooks';

interface ComponentProps {}

const Component: React.FC<ComponentProps> = ({}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hideUserMenuOnClickOutside = (e: any) => {
      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', hideUserMenuOnClickOutside);
    return () => {
      document.removeEventListener('mousedown', hideUserMenuOnClickOutside);
    };
  }, [showUserMenu]);

  const toggleShowUserMenu = () => setShowUserMenu((value) => !value);

  return (
    <div className='user-menu' ref={userMenuRef}>
      <FaUserCircle
        className={`user-icon ${showUserMenu && 'active'}`}
        onClick={toggleShowUserMenu}
      />
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            className='user-menu-content'
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            <div className='user-menu-item'>البروفايل</div>
            <div className='user-menu-item' onClick={() => dispatch(logout())}>
              تسجيل الخروج
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Component;
