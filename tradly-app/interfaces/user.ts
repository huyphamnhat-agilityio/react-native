export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
};

export type UserPayload = Omit<User, "id">;
