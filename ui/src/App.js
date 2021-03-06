import React, { Suspense } from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  BrowserRouter,
} from 'react-router-dom';
import ProtectedRoute from './components/UI/ProtectedRoute';

const Home = React.lazy(() => {
  return import('./containers/home.js');
});
const Auth = React.lazy(() => {
  return import('./components/UI/Auth');
});

const App = () => {
  const routes = (
    <Switch>
      <Route
        exact
        path="/authentication"
        location={{ hash: 'Auth' }}
        render={(props) => <Auth {...props} />}
      />
      <Route
        path="/user/reset-password/"
        location={{ hash: 'Reset' }}
        render={(props) => <Auth {...props} onReset={true} />}
      />
      <ProtectedRoute
        exact
        path="/home"
        location={{ hash: 'Home' }}
        component={Home}
      />
      <Redirect to="/home" />
    </Switch>
  );
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </BrowserRouter>
  );
};

export default withRouter(App);
