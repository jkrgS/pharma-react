import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Snack from './components/shared/Snack';
import ProtectedRoute from './components/UI/ProtectedRoute';
import Layout from './components/UI/Layout';

const Home = React.lazy(() => {
  return import('./containers/home.js');
});
const Auth = React.lazy(() => {
  return import('./components/UI/Auth');
});

const App = () => {
  const routes = (
    <Routes>
      <Route
        exact
        path="/authentication"
        location={{ hash: 'Auth' }}
        element={<Auth />}
      />
      <Route
        path="/auth/reset-password/"
        location={{ hash: 'Reset' }}
        element={<Auth onReset={true} />}
      />
      <Route
        path="/auth/verify-email/"
        location={{ hash: 'Verify' }}
        element={<Auth onVerify={true} />}
      />
      <Route
        exact
        path="/home"
        location={{ hash: 'Home' }}
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      {/* <Link to="/home" /> */}
      {/* <Route index element={<Home />} /> */}
    </Routes>
  );
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      <Suspense>
        <Snack />
      </Suspense>
    </>
  );
};

export default App;
