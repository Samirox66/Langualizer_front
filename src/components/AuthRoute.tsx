import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Learn from '../routes/Learn';
import { useAppSelector } from '../store/hooks';

interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = ({ children }) => {
  const email = useAppSelector((state) => state.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (email == '') {
      navigate('/login');
    }
  }, []);

  return <>{children}</>;
};

export default AuthRoute;
