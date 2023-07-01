import axios from 'axios';

const accessToken = localStorage.getItem('token');

/* 액세스 토큰이 필요한 요청에 사용 */
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token || '';
  return config;
});

/* 유저 정보 가져오기 */
export const GetUser = () =>
  instance.get('/members').then((res) => res.data[0]);
