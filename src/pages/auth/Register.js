import React from 'react';
import { withFormik } from 'formik';
import { string, object, ref } from 'yup';

import Card from '../../layouts/Card';
import { Input } from '../../components/EspressoFormElements';
import { postAdminApi } from '../../services/user';
import Auth from '../../util/Auth';
import history from '../../routes/history';
import { ToastError } from '../../components/Toast';

const Register = props => {
  const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = props;

  return (
    <Card headerText="Mintbean Chatroom Register">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="userName"
          label="UserName"
          errors={errors.userName}
          touched={touched.userName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values.userName}
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
        />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
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
      const result = await postAdminApi(values);
      if (result.status === 201) {
        Auth.authenticateUser(result.data.token);
        history.push('/chat');
      }
    } catch (error) {
      ToastError(error.response.data.error);
    } finally {
      setSubmitting(false);
    }
  },
})(Register);

export default MyEnhancedForm;
