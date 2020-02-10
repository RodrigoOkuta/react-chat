import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from './history';
import LandingLayout from '../layouts/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Chat from '../pages/chat';
import Auth from '../util/Auth';

const index = () => {
  return (
    <Router history={history}>
      <Switch>
        <LandingLayout>
          <Switch>
            <Route
              path="/"
              exact={true}
              component={() => {
                if (Auth.isUserAuthenticated()) {
                  return <Redirect to="/Chat" />;
                }
                return <Redirect to="/Login" />;
              }}
            />
            <Route path="/Login" exact={true}>
              <Login />
            </Route>
            <Route path="/Register" exact={true}>
              <Register />
            </Route>
            <Route path="/Chat" exact={true}>
              <Chat />
            </Route>
          </Switch>
        </LandingLayout>
      </Switch>
    </Router>
  );
};

export default index;
