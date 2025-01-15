import {CartItem} from 'src/interfaces';
import {create} from 'zustand';

export type CartStore = {
  cart: Array<CartItem>;
  addToCart: (item: CartItem) => void;
};

export const useCartStore = create<CartStore>()(set => ({
  cart: [],
  addToCart: (item: CartItem) =>
    set(({cart, ...rest}) => {
      const cartItem = cart.find(p => p.id === item.id);

      if (cartItem) {
        cartItem.quantity += item.quantity;
      } else {
        cart.push({...item, quantity: 1});
      }
      return {
        ...rest,
        cart,
      };
    }),
}));
