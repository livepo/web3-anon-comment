import axios from 'axios';

const request = axios.create({
  baseURL: '/api', // 可根据后端配置更改
  timeout: 10000,
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default request;
