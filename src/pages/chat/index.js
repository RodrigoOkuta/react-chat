/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import { string, object } from 'yup';

import ChatLayout from '../../layouts/Chat';
import './index.css';
import { TextArea } from '../../components/EspressoFormElements';
import MessageItem from '../../components/MessageItem';
import history from '../../routes/history';
import { postMessageApi, getMessagesApi } from '../../services/chat';
import { ToastError, ToastSuccess } from '../../components/Toast';

const Chat = props => {
  const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = props;

  const [list, setList] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const result = await getMessagesApi();

        setList(result.data.messages);
      } catch (error) {}
    })();
  }, []);

  return (
    <ChatLayout text="Mintbean Chatroom" name={history.location.state.user.userName}>
      <form className="ui reply form" onSubmit={handleSubmit}>
        <div className="field">
          <TextArea
            name="message"
            errors={errors.message}
            touched={touched.message}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values.message}
          />
        </div>
        <button
          className="ui blue labeled submit icon button"
          disabled={isSubmitting}
          type="submit"
        >
          <i className="icon edit"></i> Send Message
        </button>
      </form>

      <div className="ui comments">
        {list.map(message => {
          const {
            user: { userName },
            message: text,
            createdAt,
            _id,
            likes,
          } = message;
          return (
            <MessageItem
              id={_id}
              userId={history.location.state.user._id}
              key={_id}
              name={userName}
              date={createdAt}
              text={text}
              userName={history.location.state.user.userName}
              likes={likes}
            />
          );
        })}
      </div>

      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </ChatLayout>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ message: '' }),
  validationSchema: object().shape({
    message: string().required('Message is required'),
  }),
  handleSubmit: async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await postMessageApi(values);
      resetForm();
      if (result.status === 201) {
        ToastSuccess('Message sent. Please refresh the page');
      }
    } catch (error) {
      ToastError(error.response.data.error);
    } finally {
      setSubmitting(false);
    }
  },
})(Chat);

export default MyEnhancedForm;
