import axios from 'axios';
import {
  NewMember,
  LoginInfo,
  ItemData,
  CommentData,
  SelectedData,
  AddData,
  ContentData,
  Description,
} from '../types/types';
import { COMMENTS_PER_PAGE } from '../constant/constantValue';
import { AUTOCOMPLETE_RESULT_SIZE } from '../constant/constantValue';
import { useTokens } from '../hooks/useTokens';

/* 액세스 토큰이 필요한 요청에 사용 */
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const accessToken = localStorage.getItem('token');
  const refresh = localStorage.getItem('refresh');
  newConfig.headers.Authorization = accessToken;
  newConfig.headers.Refresh = refresh;
  return newConfig;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 500) {
      const headers = error.response.headers;
      const accessToken = headers.authorization;
      const refreshToken = headers.refresh;
      useTokens(accessToken, refreshToken);
      const originalRequestConfig = error.config;
      const newAccess = localStorage.getItem('token');
      const newRefresh = localStorage.getItem('refresh');
      originalRequestConfig.headers['Authorization'] = newAccess;
      originalRequestConfig.headers['refresh'] = newRefresh;

      return axios(originalRequestConfig);
    }
    return Promise.reject(error);
  }
);

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
    .get(`${import.meta.env.VITE_BASE_URL}/medias/tv?genre=${genre}`)
    .then((res) => res.data);

/* Movie 데이터 가져오기 */
export const GetMovieData = (genre: string): Promise<ItemData> =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/medias/movie?genre=${genre}`)
    .then((res) => res.data);

/* ott top10 데이터 가져오기 */
export const GetOttTopList = (ott: string): Promise<ItemData> =>
  axios
    .get(
      `${
        import.meta.env.VITE_BASE_URL
      }/medias/recommendation?page=1&size=10&ottName=${ott}`
    )
    .then((res) => res.data);

export const GetDataDetail = (mediaId: string): Promise<SelectedData> =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/medias/${mediaId}`)
    .then((res) => res.data);

/* 검색결과 가져오기 */
export const GetSearchedData = (keyword: string) =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/search?q=${keyword}`)
    .then((res) => res.data);

/* 자동완성 검색 */
export const GetAutoComplete = (keyword: string): Promise<string[]> =>
  axios
    .get(
      `${
        import.meta.env.VITE_BASE_URL
      }/search/autocomplete?q=${keyword}&limit=${AUTOCOMPLETE_RESULT_SIZE}`
    )
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
export const GetFilterdData = (queryString: string): Promise<ItemData> =>
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${queryString}`)
    .then((res) => res.data);

/* 북마크 조회 */
export const GetIsBookmark = (mediaId: string) =>
  instance.get(`/bookmarks/${mediaId}`).then((res) => res.data);

/* 북마크 생성/삭제 */
export const PostBookmark = (mediaId: string) =>
  instance.post(`/bookmarks`, { mediaId });

/* 추천 조회 */
export const GetIsRecommend = (mediaId: string) =>
  instance.get(`/recommend/${mediaId}`).then((res) => res.data);

/* 추천 생성/삭제 */
export const PostRecommend = (mediaId: string) =>
  instance.post(`/recommend`, { mediaId });

/* 유저 찜, 좋아요 조회 */
export const GetUserContents = (path: string): Promise<ContentData[]> =>
  instance.get(`/${path}`).then((res) => res.data);

/* 유저 후기 목록 조회 */
export const GetUserReviews = (page: number): Promise<CommentData> =>
  instance
    .get(`/reviews/me?page=${page}&size=${COMMENTS_PER_PAGE}`)
    .then((res) => res.data);

/* 유저 프로필 사진 업로드 */
export const PostUserProfile = (data: FormData) => {
  const accessToken = localStorage.getItem('token');
  return axios.post(`${import.meta.env.VITE_BASE_URL}/members/upload`, data, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data',
    },
  });
};

/* 관리자 미디어 생성 */
export const AdminPostData = (mediaData: AddData) =>
  instance.post(`/medias`, mediaData);

/* 관리자 미디어 제거 */
export const AdminDeleteData = (mediaId: string) =>
  instance.delete(`/medias/${mediaId}`);

/* 관리자 미디어 수정 */
export const AdminPatchData = ({
  mediaId,
  mediaData,
}: {
  mediaId: string | null;
  mediaData: AddData;
}) => instance.patch(`/medias/${mediaId}`, mediaData);

/* 오류제보 */
export const PostReport = (discription: Description) =>
  instance.post(`/reports`, discription);

/* 오류확인 */
export const GetReport = () => instance.get(`/reports`).then((res) => res.data);

/* 오류삭제 */
export const DeleteReport = (reportId: string) =>
  instance.delete(`/reports/${reportId}`).then((res) => res.data);
