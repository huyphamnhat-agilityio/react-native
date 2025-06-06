import {CartItemData} from 'src/interfaces';

export const getTotalMoney = (cartItems: CartItemData[]) => {
  const totalMoney = cartItems.reduce(
    (accumulator, {price, quantity}) => accumulator + price * quantity,
    0,
  );

  return Math.round(totalMoney * 100) / 100;
};
