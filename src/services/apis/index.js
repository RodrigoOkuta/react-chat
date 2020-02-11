import axios from 'axios';
import Auth from '../../util/Auth';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
  },
});

instance.interceptors.request.use(function(config) {
  const token = Auth.getToken();
  config.headers.Authorization = token;

  return config;
});

instance.defaults.headers.common['Authorization'] = Auth.getToken();

export default instance;
