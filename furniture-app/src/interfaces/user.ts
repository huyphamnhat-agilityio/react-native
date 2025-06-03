export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export type UserPayload = Omit<User, 'id'>;
