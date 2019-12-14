import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...additionalProps }) => {
  return (
    <Route
      {...additionalProps}
      render={Props => {
        if (localStorage.getItem('token')) {
          return <Component {...Props} />;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
};

export default PrivateRoute;