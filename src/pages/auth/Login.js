import React from 'react';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import { string, object } from 'yup';

import Card from '../../layouts/Card';
import { Input } from '../../components/EspressoFormElements';
import Auth from '../../util/Auth';
import history from '../../routes/history';
import { ToastError } from '../../components/Toast';
import { postUserLoginApi } from '../../services/user';
import './Login.css';

const Login = props => {
  const { values, touched, errors, handleSubmit, handleChange, handleBlur } = props;

  return (
    <Card headerText="Mintbean Chatroom Login">
      <div className="ui two column very relaxed stackable grid container">
        <div className="column">
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
            <button className="ui blue submit button" type="submit">
              Submit
            </button>
            {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
          </form>
        </div>
        <div className="column center-element">
          <Link to="/Register">
            <button>
              <i className="signup icon"></i>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className="ui vertical divider">Or</div>
    </Card>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ userName: '', password: '' }),
  validationSchema: object().shape({
    userName: string().required('UserName is required'),
    password: string().required('Password is required'),
  }),

  handleSubmit: async (values, { setSubmitting }) => {
    try {
      const result = await postUserLoginApi(values);
      if (result.status === 200) {
        Auth.authenticateUser(result.data.token);
        history.push({ pathname: '/chat', state: { user: result.data.user } });
      }
    } catch (error) {
      ToastError(error.response.data.error);
      setSubmitting(false);
    }
  },
})(Login);

export default MyEnhancedForm;
