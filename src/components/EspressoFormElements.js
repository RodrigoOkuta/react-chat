import React from 'react';

import './EspressoFormElements.css';

export const Input = ({
  handleBlur,
  handleChange,
  errors,
  touched,
  type,
  name,
  label,
  values,
  icon = null,
}) => (
  <div className="field">
    <label>{label}</label>
    <div className="ui left icon input">
      <input
        className={`display-block input-element ${errors && touched ? 'error-message' : ''}`}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
        defaultValue={values}
      />
      {icon && <i className={icon}></i>}
    </div>
    {errors && touched && <span className="display-block error-message">{errors}</span>}
  </div>
);

export const TextArea = ({ handleBlur, handleChange, errors, touched, name, values }) => (
  <div className="field">
    <div className="ui left icon input">
      <textarea
        rows="3"
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={values}
      ></textarea>
    </div>
    {errors && touched && <span className="display-block error-message">{errors}</span>}
  </div>
);
