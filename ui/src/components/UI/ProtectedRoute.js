import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Layout from './Layout';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token')
  );

  useEffect(() => setIsAuthenticated(localStorage.getItem('token')), []);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/authentication" />
        )
      }
    />
  );
};

export default ProtectedRoute;
