import axios from 'axios';
<<<<<<< HEAD
import { Member, NewMember, LoginInfo } from '../types/types';
=======
import { Member, TV } from '../types/types';
>>>>>>> 0a02dfe (feat/tvpage: TV 페이지 구현 완료)

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
export const GetUser = (): Promise<Member> =>
  instance.get('/members').then((res) => res.data[0]);

export const Login = (data: LoginInfo) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data);

export const PostUser = (data: NewMember) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/members`, data);

export const PatchUser = (data: any) => instance.patch(`/members`, data);

export const DeleteUser = () => instance.delete('/members');

/* TV 데이터 가져오기 */
export const GetTVData = (): Promise<TV[]> =>
  instance.get('/TV').then((res) => res.data);
