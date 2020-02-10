import * as APIRequest from './apis/method.api';

const endpoint = '/users';

export const postAdminApi = model => {
  return APIRequest.Post(`${endpoint}`, model);
};
