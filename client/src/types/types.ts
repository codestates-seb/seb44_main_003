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
