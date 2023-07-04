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
  ott?: String[];
  interest?: String[];
};

export type LoginInfo = {
  email: string;
  password: string;
};

export type MemberLikes = {
  category: String;
  ott: String[];
  interest: String[];
};

export type AuthData = {
  email: string;
  password: string;
  confirm?: string;
};
