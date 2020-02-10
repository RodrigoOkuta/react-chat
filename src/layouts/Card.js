import React from 'react';

import './Card.css';

const Card = ({ children, headerText }) => {
  return (
    <div className="ui raised very padded text container segment">
      <h2 className="ui header text-center">{headerText}</h2>
      {children}
    </div>
  );
};

export default Card;
