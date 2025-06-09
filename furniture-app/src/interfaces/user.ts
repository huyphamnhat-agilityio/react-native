export type ShippingAddress = {
  id: string;
  name: string;
  address: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  shippingAddress: ShippingAddress[];
};

export type UserPayload = Omit<User, 'id'>;
