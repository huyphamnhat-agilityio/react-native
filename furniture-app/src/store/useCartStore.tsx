import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartItemData} from 'src/interfaces';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

export type CartStore = {
  cart: Array<CartItemData>;
  addToCart: (item: CartItemData) => void;
  removeFromCart: (color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  getTotalMoney: () => number;
  clearCart: () => void;
};

export const useCartStore = create(
  persist(
    immer<CartStore>((set, get) => ({
      cart: [],
      addToCart: item =>
        set(state => {
          const cartItem = state.cart.find(
            p => p.id === item.id && p.selectedColor === item.selectedColor,
          );

          if (cartItem) {
            cartItem.quantity += item.quantity;
          } else {
            state.cart.push({...item});
          }
        }),
      removeFromCart: color =>
        set(state => {
          state.cart = state.cart.filter(p => p.selectedColor !== color);
        }),
      updateQuantity: (id, color, quantity) =>
        set(state => {
          const cartItem = state.cart.find(
            p => p.id === id && p.selectedColor === color,
          );

          if (cartItem) {
            cartItem.quantity = quantity;
          }
        }),
      getTotalMoney: () => {
        const cart = get().cart;

        const totalMoney = cart.reduce(
          (accumulator, {price, quantity}) => accumulator + price * quantity,
          0,
        );

        return Math.round(totalMoney * 100) / 100;
      },
      clearCart: () =>
        set(state => {
          state.cart = [];
        }),
    })),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
