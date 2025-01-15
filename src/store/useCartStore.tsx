import {CartItemData} from 'src/interfaces';
import {create} from 'zustand';

export type CartStore = {
  cart: Array<CartItemData>;
  addToCart: (item: CartItemData) => void;
  removeFromCart: (color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
};

export const useCartStore = create<CartStore>()(set => ({
  cart: [],
  addToCart: item =>
    set(({cart, ...rest}) => {
      const cartItem = cart.find(
        p => p.id === item.id && p.selectedColor === item.selectedColor,
      );

      if (cartItem) {
        cartItem.quantity += item.quantity;
      } else {
        cart.push({...item});
      }

      return {
        ...rest,
        cart,
      };
    }),
  removeFromCart: color =>
    set(({cart, ...rest}) => {
      const filteredCart = cart.filter(p => p.selectedColor !== color);
      return {
        ...rest,
        cart: filteredCart,
      };
    }),
  updateQuantity: (id, color, quantity) =>
    set(({cart, ...rest}) => {
      const newCart = cart.map(item => {
        if (item.id === id && item.selectedColor === color) {
          return {...item, quantity};
        }
        return item;
      });

      return {
        ...rest,
        cart: newCart,
      };
    }),
}));
