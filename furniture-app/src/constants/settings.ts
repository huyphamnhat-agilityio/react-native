export const SETTINGS = {
  SHIPPING_ADDRESS: {
    title: 'Shipping Address',
    description: (quantity: number) =>
      `${
        quantity > 10 ? quantity : quantity > 0 ? '0' + quantity : '0'
      } address${quantity > 1 ? 'es' : ''}`,
    screen: 'ShippingAddress',
  },
} as const;
