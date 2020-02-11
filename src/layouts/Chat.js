/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import Card from './Card';
import './Chat.css';
import Auth from '../util/Auth';
import history from '../routes/history';

const Chat = ({ text, name, children }) => {
  const onHandleLogout = () => {
    Auth.deAuthenticateUser();
    history.push('/');
  };

  return (
    <Card>
      <div className="full-screen">
        <div className="ui attached stackable menu no-border">
          <div className="ui container">
            <h1>{text}</h1>
            <div className="right item no-border">
              <div className="ui input no-border">
                <h3 className="user-greeting">Hello, {name}</h3>
                <a className="item no-border" onClick={onHandleLogout}>
                  <i className="power off icon"></i> Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </Card>
  );
};

export default Chat;
