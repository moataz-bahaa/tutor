import { BiMenu } from 'react-icons/bi';
import { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import NavMenu from './NavMenu';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = (props) => {
  const [isFixedTop, setIsFixedTop] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);

  const toggleShowMenu = () => setShowMenu((value) => !value);

  useEffect(() => {
    const handleScroll = (e: any) => {
      if (window.scrollY > 10 && !isFixedTop) {
        setIsFixedTop(true);
      } else if (window.scrollY < 10 && isFixedTop) {
        setIsFixedTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixedTop]);

  const { isLoggedIn } = useAppSelector((state) => {
    return {
      isLoggedIn: state.admin.isLoggedIn,
    };
  });

  if (!isLoggedIn) {
    return null;
  }
  return (
    <nav className={`navbar ${isFixedTop && 'small-padding'}`} ref={navbarRef}>
      <div className='container'>
        <div className='navbar-content'>
          <div className='navbar-content-title d-flex js-space-between'>
            <div>مدرس خصوصى</div>
            <BiMenu className='menu-icon' onClick={toggleShowMenu} />
          </div>
          <NavMenu
            isLoggedIn={isLoggedIn}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            navbarRef={navbarRef}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
