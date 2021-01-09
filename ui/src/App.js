import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/UI/Layout';

const Home = React.lazy(() => {
  return import('./containers/home.js');
});

const app = () => {
  const routes = (
    <Switch>
      <Route
        path="/home"
        location={{ hash: 'Home' }}
        render={(props) => <Home {...props} />}
      />
      <Redirect to="/home" />
    </Switch>
  );
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(app);
