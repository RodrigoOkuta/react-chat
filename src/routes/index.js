import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history';
import LandingLayout from '../layouts/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const index = () => {
  return (
    <Router history={history}>
      <Switch>
        <LandingLayout>
          <Switch>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </LandingLayout>
      </Switch>
    </Router>
  );
};

export default index;
