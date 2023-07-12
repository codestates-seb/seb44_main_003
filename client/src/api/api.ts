import axios from 'axios';
import {
  NewMember,
  LoginInfo,
  ItemData,
  CommentData,
  SelectedData,
  ContentData,
  Comment,
} from '../types/types';
import { COMMENTS_PER_PAGE } from '../constant/constantValue';

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
export const GetUser = (): Promise<NewMember> =>
  instance.get('/members').then((res) => res.data);

export const Login = (data: LoginInfo) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data);

export const PostUser = (data: NewMember) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/members`, data);

export const PatchUser = (data: any) => instance.patch(`/members`, data);

export const DeleteUser = () => instance.delete('/members');

/* TV 데이터 가져오기 */
export const GetTVData = (genre: string): Promise<ItemData> =>
  axios
    .get(
      `${
        import.meta.env.VITE_BASE_URL
      }/medias/tv?genre=${genre}&ott=netfilx,tving,watcha,disney,wavve`
    )
    .then((res) => res.data);

/* Movie 데이터 가져오기 */
export const GetMovieData = (genre: string): Promise<ItemData> =>
  axios
    .get(
      `${
        import.meta.env.VITE_BASE_URL
      }/medias/movie?genre=${genre}&ott=netfilx,tving,watcha,disney,wavve`
    )
    .then((res) => res.data);

export const GetDataDetail = (mediaId: string): Promise<SelectedData> =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/medias/${mediaId}`)
    .then((res) => res.data);

/* 검색결과 가져오기 */
export const GetSearchedData = (keyword: string | null) =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/search?q=${keyword}`)
    .then((res) => res.data);

/* 후기 데이터 */
export const GetComments = ({
  id,
  page,
}: {
  id: string;
  page: number;
}): Promise<CommentData> =>
  axios
    .get(
      `${
        import.meta.env.VITE_BASE_URL
      }/reviews?mediaId=${id}&page=${page}&size=${COMMENTS_PER_PAGE}`
    )
    .then((res) => res.data);

/* 후기 추가 */
export const PostComment = ({
  mediaId,
  content,
}: {
  mediaId: string;
  content: string;
}) => instance.post('/reviews', { mediaId: parseInt(mediaId), content });

/* 후기 삭제 */
export const DeleteComment = (id: string) => instance.delete(`/reviews/${id}`);

/* 후기 업데이트 */
export const PatchComment = ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => instance.patch(`/reviews/${id}`, { content: content });

/* 리스트 필터 가져오기 */
export const GetFilterdData = (queryString: string | null): Promise<ItemData> =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${queryString}`)
    .then((res) => res.data);

/* 북마크 조회 */
export const GetIsBookmark = (mediaId: string | null) =>
  instance.get(`/bookmarks/${mediaId}`).then((res) => res.data);

/* 북마크 생성/삭제 */
export const PostBookmark = (mediaId: string | null) =>
  instance.post(`/bookmarks`, { mediaId });

/* 추천 조회 */
export const GetIsRecommend = (mediaId: string | null) =>
  instance.get(`/recommend/${mediaId}`).then((res) => res.data);

/* 추천 생성/삭제 */
export const PostRecommend = (mediaId: string | null) =>
  instance.post(`/recommend`, { mediaId });

/* 유저 찜, 좋아요 조회 */
export const GetUserContents = (path: string): Promise<ContentData[]> =>
  instance.get(`/${path}`).then((res) => res.data);
