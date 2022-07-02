import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector(state => state.admin.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />
  }

  return children;
};

export default PrivateRoute;

