export type UserAddress = {
  name: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
};

export type UserCard = {
  id: string;
  holderName: string;
  cardNumber: string;
  expiresDates: string;
  cvc: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: number;
  avatar: string;
  address: UserAddress;
  cards: UserCard[];
};

export type UserPayload = Omit<User, "id">;
