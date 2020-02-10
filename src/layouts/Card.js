import React from 'react';

import './Card.css';

const Card = ({ children, headerText }) => {
  return (
    <div>
      <h2 className="ui header text-center">{headerText}</h2>
      <div className="ui raised very padded text container segment">{children}</div>
    </div>
  );
};

export default Card;
