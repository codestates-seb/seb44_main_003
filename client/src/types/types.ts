export type Member = {
  nickname: string;
  avatarUri: string;
  createdAt: string;
};

export type NewMember = {
  memberId: number;
  email: string;
  password: string;
  nickname: string;
  createdAt: string;
  avatarUri: string;
  category: string;
  memberOtts: { memberOttName: string }[];
  interests: { interestName: string }[];
  roles: string[];
};

export type LoginInfo = {
  email: string;
  password: string;
};

export type MemberLikes = {
  category: String;
  memberOtts: String[];
  interests: String[];
};

export type AuthData = {
  nickname: string;
  email: string;
  password: string;
  confirm?: string;
};

export type ContentData = {
  id: number;
  title: string;
  mainPoster: string;
};

export type ItemData = {
  content: ContentData[];
  currentPage: number;
  totalPages: number;
};

export type SelectedData = {
  title: string;
  content: string;
  category: string;
  creator: string;
  cast: string;
  ageRate: string;
  checkBookmark: boolean;
  countRecommend: number;
  genre: string[];
  mainPoster: string;
  mediaOtt: Array<{
    createdAt: string;
    lastModifiedAt: string;
    mediaOttId: number;
    ottAddress: string;
    ottName: string;
  }>;
  recent: boolean;
  releaseDate: number;
  titlePoster: string;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  lastModifiedAt: string;
  member?: { memberId: number; nickname: string; avatarUri: string };
  media?: { mediaId: number; title: string; mainPoster: string };
};

export type CommentData = {
  currentPage: number;
  totalPage: number;
  totalReviews: number;
  reviews: Comment[];
};

export type Question = {
  closeModal: () => void;
  onNextClick: () => void;
  onReset: () => void;
};

export type AddData = {
  title: string;
  content: string;
  category: string;
  creator: string;
  cast: string;
  mainPoster: string;
  titlePoster: string;
  releaseDate: number;
  ageRate: string;
  recent: boolean;
  genre: string[];
  mediaOtt: {
    ottName: string;
    ottAddress: string;
  }[];
};

export type Description = {
  mediaId: number;
  title: string;
  content: string;
};

export type ModalType = {
  isOpen: boolean;
  content: JSX.Element | string;
};

export type OpenModalType = {
  content: JSX.Element | string;
};

export type ItemProps = {
  index: number;
  size: number;
};

export type Report = {
  completion: boolean;
  content: string;
  createdAt: string;
  id: number;
  lastModifiedAt: string;
  mediaId: number;
  title: string;
};

export type BannerImgsType = {
  url: string;
  alt: string;
  id: number;
}[];
