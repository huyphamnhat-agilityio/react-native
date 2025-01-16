import {Product} from 'src/interfaces';

export const MOCK_PRODUCT: Product = {
  id: '1',
  name: 'Classic Dining Chair',
  category: 'chair',
  price: 89.99,
  stock: 15,
  rating: 4.8,
  reviewCount: 189,
  description:
    'Traditional wooden dining chair with elegant spindle back design',
  variants: [
    {
      color: '#8a8fa3',
      image: 'https://m.media-amazon.com/images/I/711I3okfOpL._AC_SL1500_.jpg',
    },
    {
      color: '#d46752',
      image: 'https://m.media-amazon.com/images/I/71yHuoto4xL._AC_SL1500_.jpg',
    },
    {
      color: '#efe1b2',
      image: 'https://m.media-amazon.com/images/I/61qCjXHCA4L._AC_SL1500_.jpg',
    },
  ],
};
