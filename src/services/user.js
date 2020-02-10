import * as APIRequest from './apis/method.api';

const endpoint = '/users';

export const postUserApi = model => {
  return APIRequest.Post(`${endpoint}`, model);
};

export const postUserLoginApi = model => {
  return APIRequest.Post(`${endpoint}/login`, model);
};
