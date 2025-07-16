export type UserAddress = {
  name: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
};
export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  address: UserAddress;
};

export type UserPayload = Omit<User, "id">;
