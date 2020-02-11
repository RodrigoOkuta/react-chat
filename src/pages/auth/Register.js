import React from 'react';
import { withFormik } from 'formik';
import { string, object, ref } from 'yup';
import { Link } from 'react-router-dom';

import Card from '../../layouts/Card';
import { Input } from '../../components/EspressoFormElements';
import Auth from '../../util/Auth';
import history from '../../routes/history';
import { ToastError } from '../../components/Toast';
import { postUserApi } from '../../services/user';
import './Register.css';

const Register = props => {
  const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = props;

  return (
    <Card headerText="Mintbean Chatroom Register">
      <form className="ui form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="userName"
          label="UserName"
          errors={errors.userName}
          touched={touched.userName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values.userName}
          icon="user icon"
        />

        <Input
          type="password"
          name="password"
          label="Password"
          errors={errors.password}
          touched={touched.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values.password}
          icon="lock icon"
        />

        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          errors={errors.confirmPassword}
          touched={touched.confirmPassword}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values.confirmPassword}
          icon="lock icon"
        />
        <button className="ui blue submit button" type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <Link to="/">
          <button className="float-right">Return to login</button>
        </Link>
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      </form>
    </Card>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ userName: '', password: '', confirmPassword: '' }),
  validationSchema: object().shape({
    userName: string().required('UserName is required'),
    password: string()
      .min(7, 'Password has to be longer than 7 characters!')
      .required('Password is required!')
      .matches(/[a-z]/, 'Lowercase character required!')
      .matches(/[A-Z]/, 'Uppercase character required!')
      .matches(/[0-9]/, 'Numeric character required!')
      .matches(/[-@#!$%^&*()_+|~=`{}[\]:";'<>?,./]/, 'Symbol character required!'),
    confirmPassword: string()
      .oneOf([ref('password'), ''], "Passwords don't match")
      .required('Password is required!'),
  }),

  handleSubmit: async (values, { setSubmitting }) => {
    try {
      const result = await postUserApi(values);
      if (result.status === 201) {
        Auth.authenticateUser(result.data.token);
        history.push({ pathname: '/chat', state: { user: result.data.user } });
      }
    } catch (error) {
      ToastError(error.response.data.error);
      setSubmitting(false);
    }
  },
})(Register);

export default MyEnhancedForm;
