import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import UserMenu from './UserMenu';

interface ComponentProps {
  isLoggedIn: boolean;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  navbarRef: React.MutableRefObject<HTMLElement | null>;
}

const Component: React.FC<ComponentProps> = ({ isLoggedIn, showMenu, setShowMenu, navbarRef }) => {

  useEffect(() => {
    const hideNavbarMenuOnClickOutside = (e: any) => {
      if (showMenu && navbarRef.current && !navbarRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', hideNavbarMenuOnClickOutside);
    return () => {
      document.removeEventListener('mousedown', hideNavbarMenuOnClickOutside);
    };
  }, [showMenu]);

  return (
    <div className={`navbar-content-collapse ${showMenu && 'show'}`}>
      <div className='navbar-content-menu'>
        <NavLink
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setShowMenu(false)}
          to='/'
        >
          الصفحه الرئيسه
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setShowMenu(false)}
          to='/dashboard'
        >
          الداشبورد
        </NavLink>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setShowMenu(false)}
            to='/login'
          >
            تسجيل الدخول
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Component;
