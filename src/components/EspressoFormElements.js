import React from 'react';

import './EspressoFormElements.css';

export const Input = ({ handleBlur, handleChange, errors, touched, type, name, label, values }) => (
  <React.Fragment>
    <label>{label}</label>
    <input
      className={`display-block input-element ${errors && touched ? 'error-message' : ''}`}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      type={type}
      defaultValue={values}
    />
    {errors && touched && <span className="display-block error-message">{errors}</span>}
  </React.Fragment>
);
