export type LoginBody = {
  username: string;
  password: string;
};

export type LoginResponse = {
  username: string;
  token: string;
  topicIds: number[];
  userId: string;
};
