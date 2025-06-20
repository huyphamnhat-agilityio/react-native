export const SCREENS = {
  AUTH: {
    BOARDING: 'Boarding',
    LOGIN: 'Login',
    REGISTER: 'Register',
  },

  MAIN: {
    HOME_TABS: 'HomeTabs',
    PRODUCT_DETAIL: 'ProductDetail',
    CART: 'Cart',
    CHECKOUT: 'Checkout',
    SUCCESS: 'Success',
  },

  TABS: {
    HOME: 'Home',
    FAVORITES: 'Favorites',
    PROFILE: 'Profile',
  },

  ADDRESS: {
    SHIPPING_ADDRESS: 'ShippingAddress',
    ADD_OR_EDIT_ADDRESS: 'AddOrEditAddress',
  },
} as const;

export const STACKS = {
  AUTH_STACKS: 'AuthStacks',
  MAIN_STACKS: 'MainStacks',
  ADDRESS_STACKS: 'AddressStacks',
} as const;
