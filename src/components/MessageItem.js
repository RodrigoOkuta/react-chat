import React from 'react';
import { format } from 'date-fns';

import { updateMessageLikeApi } from '../services/chat';
import './MessageItem.css';

const MessageItem = ({ name, date, text, userName, id, likes, userId }) => {
  const handleLikeClick = async () => {
    await updateMessageLikeApi(id);
  };

  return (
    <div className={`comment ${userName === name ? 'own-message' : ''}`}>
      <div className="content">
        <a className="author">{name}</a>
        <div className="metadata">
          <span className="date">{format(new Date(date), 'Pp')}</span>
        </div>
        <div className="text">{text}</div>
        {userName !== name && likes.includes(userId) && (
          <div className="actions">
            <span className="reply">(Liked)</span>
          </div>
        )}

        {userName !== name && !likes.includes(userId) && (
          <div className="actions">
            <button className="reply" onClick={handleLikeClick}>
              Like
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
