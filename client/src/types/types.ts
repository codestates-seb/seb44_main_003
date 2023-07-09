export type Member = {
  nickname: string;
  avatarUri: string;
  createdAt: string;
};

export type NewMember = {
  email: String;
  password: String;
  nickname: String;
  avatarUri?: String;
  category?: String;
  memberOtts?: String[];
  interests?: String[];
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
  email: string;
  password: string;
  confirm?: string;
};

export type ItemData = {
  id: number;
  title: string;
  mainPoster: string;
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
  mediaOtt: string[];
  recent: boolean;
  releaseDate: number;
  titlePoster: string;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  lastModifiedAt: string;
  member: { nickname: string; avatarUri: string };
};
