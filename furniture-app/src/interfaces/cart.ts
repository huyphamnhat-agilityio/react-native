export type CartItemData = {
  id: string;
  productId: string;
  productName: string;
  selectedColor: string;
  quantity: number;
  price: number;
  image: string;
};

export type CartPayload = {
  userId: string;
  items: CartItemData[];
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItemData[];
};
