import React, { Children } from 'react';

interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = ({ children }) => {
  return <>{children}</>;
};

export default AuthRoute;
