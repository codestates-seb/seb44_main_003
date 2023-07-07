import axios from 'axios';
import {
  Member,
  NewMember,
  LoginInfo,
  ItemData,
  Comment,
  SelectedData,
} from '../types/types';

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
  instance.get('/members').then((res) => res.data);

export const Login = (data: LoginInfo) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data);

export const PostUser = (data: NewMember) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/members`, data);

export const PatchUser = (data: any) => instance.patch(`/members`, data);

export const DeleteUser = () => instance.delete('/members');

/* TV 데이터 가져오기 */
export const GetTVData = (genre: string): Promise<ItemData[]> =>
  axios
    .get(
      `${
        import.meta.env.VITE_BASE_URL
      }/medias/tv?page=1&size=300&genre=${genre}&ott=netfilx,tving,watcha,disney,wavve`
    )
    .then((res) => res.data);

/* Movie 데이터 가져오기 */
export const GetMovieData = (genre: string): Promise<ItemData[]> =>
  axios
    .get(
      `${
        import.meta.env.VITE_BASE_URL
      }/medias/movie?page=1&size=300&genre=${genre}&ott=netfilx,tving,watcha,disney,wavve`
    )
    .then((res) => res.data);

export const GetDataDetail = (mediaId: string): Promise<SelectedData> =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/medias/${mediaId}`)
    .then((res) => res.data);

/* 검색결과 가져오기 */
export const GetSearchedData = (keyword: string | null) =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/search?keyword=${keyword}`)
    .then((res) => res.data);

/* 후기 데이터 */
export const GetComments = ({
  id,
  page,
  size,
}: {
  id: string;
  page: number;
  size: number;
}): Promise<Comment[]> =>
  axios
    .get(
      `${
        import.meta.env.VITE_BASE_URL
      }/reviews?mediaId=${id}&page=${page}&size=${size}`
    )
    .then((res) => res.data);

/* 리스트 필터 가져오기 */
export const GetFilterdData = (queryString: string | null) =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${queryString}`)
    .then((res) => res.data);

/* 북마크 조회 */
export const GetIsBookmark = (mediaId: string | null) =>
  instance.get(`/bookmarks/${mediaId}`).then((res) => res.data);

/* 북마크 생성 */
export const PostBookmark = (mediaId: string | null) =>
  instance.post(`/bookmarks`, { mediaId });
