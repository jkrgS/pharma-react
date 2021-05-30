import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/UI/Layout';

const Home = React.lazy(() => {
  return import('./containers/home.js');
});
const Auth = React.lazy(() => {
  return import('./components/UI/Auth');
});

const app = () => {
  const routes = (
    <Switch>
      <Route
        path="/home"
        location={{ hash: 'Home' }}
        render={(props) => (
          <Layout>
            <Home {...props} />
          </Layout>
        )}
      />
      <Route
        path="/authentication"
        location={{ hash: 'Auth' }}
        render={(props) => <Auth {...props} />}
      />
      <Redirect to="/home" />
    </Switch>
  );
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </div>
  );
};

export default withRouter(app);
