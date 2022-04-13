import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token')
  );
  const location = useLocation();

  useEffect(() => setIsAuthenticated(localStorage.getItem('token')), []);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/authentication" state={{ from: location }} />
  );
};

export default ProtectedRoute;
