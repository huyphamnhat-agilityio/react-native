import {CartItemData} from 'src/interfaces';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export type CartStore = {
  cart: Array<CartItemData>;
  addToCart: (item: CartItemData) => void;
  removeFromCart: (color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  getTotalMoney: () => number;
};

export const useCartStore = create(
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

      return totalMoney;
    },
  })),
);

// export const useCartStore = create<CartStore>()(set => ({
//   cart: [],
//   addToCart: item =>
//     set(({cart, ...rest}) => {
//       const cartItem = cart.find(
//         p => p.id === item.id && p.selectedColor === item.selectedColor,
//       );

//       if (cartItem) {
//         cartItem.quantity += item.quantity;
//       } else {
//         cart.push({...item});
//       }

//       return {
//         ...rest,
//         cart,
//       };
//     }),
//   removeFromCart: color =>
//     set(({cart, ...rest}) => {
//       const filteredCart = cart.filter(p => p.selectedColor !== color);
//       return {
//         ...rest,
//         cart: filteredCart,
//       };
//     }),
//   updateQuantity: (id, color, quantity) =>
//     set(({cart, ...rest}) => {
//       const newCart = cart.map(item => {
//         if (item.id === id && item.selectedColor === color) {
//           return {...item, quantity};
//         }
//         return item;
//       });

//       return {
//         ...rest,
//         cart: newCart,
//       };
//     }),
// }));
