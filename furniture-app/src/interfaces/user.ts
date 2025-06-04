export type ShippingAddress = {
  name: string;
  address: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  shippingAddress: ShippingAddress[];
};

export type UserPayload = Omit<User, 'id'>;
