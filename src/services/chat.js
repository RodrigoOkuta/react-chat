import * as APIRequest from './apis/method.api';

const endpoint = '/messages';

export const postMessageApi = model => {
  return APIRequest.Post(`${endpoint}`, model);
};

export const getMessagesApi = () => {
  return APIRequest.Get(`${endpoint}`);
};

export const updateMessageLikeApi = id => {
  return APIRequest.Patch(`${endpoint}/like?messageId=${id}`);
};
