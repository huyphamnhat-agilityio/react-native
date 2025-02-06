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

export const MOCK_PRODUCTS: Array<Product> = [
  {
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
        image:
          'https://m.media-amazon.com/images/I/711I3okfOpL._AC_SL1500_.jpg',
      },
      {
        color: '#d46752',
        image:
          'https://m.media-amazon.com/images/I/71yHuoto4xL._AC_SL1500_.jpg',
      },
      {
        color: '#efe1b2',
        image:
          'https://m.media-amazon.com/images/I/61qCjXHCA4L._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '2',
    name: 'Floor Reading Lamp',
    category: 'lamp',
    price: 149.99,
    stock: 18,
    rating: 4.7,
    reviewCount: 245,
    description:
      'Tall floor lamp with flexible arm and focused LED light, perfect for reading',
    variants: [
      {
        color: '#000000',
        image:
          'https://m.media-amazon.com/images/I/61tKBisT-fL._AC_SL1500_.jpg',
      },
      {
        color: '#df603a',
        image:
          'https://m.media-amazon.com/images/I/91QAKaOKJZL._AC_SL1500_.jpg',
      },
      {
        color: '#379ccd',
        image:
          'https://m.media-amazon.com/images/I/91BKwNKX2EL._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '3',
    name: 'Scandinavian Armchair',
    category: 'armchair',
    price: 529.99,
    stock: 15,
    rating: 4.7,
    reviewCount: 168,
    description:
      'Minimalist Scandinavian-style armchair with wooden legs and comfortable padding',
    variants: [
      {
        color: '#000000',
        image:
          'https://m.media-amazon.com/images/I/81TkJswJG0L._AC_SL1500_.jpg',
      },
      {
        color: '#3c3b40',
        image:
          'https://m.media-amazon.com/images/I/814z1X4HtcL._AC_SL1500_.jpg',
      },
      {
        color: '#7f7574',
        image:
          'https://m.media-amazon.com/images/I/81bwiKeVWzL._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '4',
    name: 'Rustic Wooden Bed',
    category: 'bed',
    price: 999.99,
    stock: 12,
    rating: 4.7,
    reviewCount: 167,
    description:
      'Traditional wooden bed frame with rustic finish and classic design',
    variants: [
      {
        color: '#593934',
        image:
          'https://m.media-amazon.com/images/I/91rstt0EjJL._AC_SL1500_.jpg',
      },
      {
        color: '#935c29',
        image:
          'https://m.media-amazon.com/images/I/91ykHdFzdiL._AC_SL1500_.jpg',
      },
      {
        color: '#512d14',
        image:
          'https://m.media-amazon.com/images/I/91TelH+DbDL._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '5',
    name: 'Modern Dining Chair',
    category: 'chair',
    price: 159.99,
    stock: 40,
    rating: 4.5,
    reviewCount: 245,
    description:
      'Contemporary dining chair with curved back design and padded seat for maximum comfort',
    variants: [
      {
        color: '#8B4513',
        image:
          'https://m.media-amazon.com/images/I/61M0XLr7leL._AC_SL1500_.jpg',
      },
      {
        color: '#F5F5DC',
        image:
          'https://m.media-amazon.com/images/I/71JOGD501xL._AC_SL1500_.jpg',
      },
      {
        color: '#606166',
        image:
          'https://m.media-amazon.com/images/I/71jJjtVgntL._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '6',
    name: 'Architect Desk Lamp',
    category: 'lamp',
    price: 119.99,
    stock: 22,
    rating: 4.8,
    reviewCount: 212,
    description:
      'Professional swing-arm desk lamp with clamp mount and adjustable brightness',
    variants: [
      {
        color: '#000000',
        image:
          'https://m.media-amazon.com/images/I/51vsLXXdogL._AC_SL1500_.jpg',
      },
      {
        color: '#bca26f',
        image:
          'https://m.media-amazon.com/images/I/51slEyXj8EL._AC_SL1500_.jpg',
      },
      {
        color: '#FFFFFF',
        image:
          'https://m.media-amazon.com/images/I/61q9ax-NHjL._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '7',
    name: 'Ergonomic Office Chair',
    category: 'chair',
    price: 299.99,
    stock: 25,
    rating: 4.7,
    reviewCount: 328,
    description:
      'Fully adjustable ergonomic office chair with lumbar support and breathable mesh back',
    variants: [
      {
        color: '#000000',
        image:
          'https://m.media-amazon.com/images/I/71LWhgxJCaL._AC_SL1500_.jpg',
      },
      {
        color: '#90d5ff',
        image:
          'https://m.media-amazon.com/images/I/71gJXK4B20L._AC_SL1500_.jpg',
      },
      {
        color: '#be5103',
        image:
          'https://m.media-amazon.com/images/I/71Cd6YN8dmL._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '8',
    name: 'Coffee Table Modern',
    category: 'table',
    stock: 8,
    rating: 4.6,
    price: 49.99,
    reviewCount: 189,
    description:
      'Contemporary coffee table with sleek design and built-in storage compartment',
    variants: [
      {
        color: '#000000',
        image:
          'https://m.media-amazon.com/images/I/91dOElUKYkL._AC_SL1500_.jpg',
      },
      {
        color: '#e3ded9',
        image:
          'https://m.media-amazon.com/images/I/91yV6PlHC7L._AC_SL1500_.jpg',
      },
      {
        color: '#d8b589',
        image:
          'https://m.media-amazon.com/images/I/915fTWdQMFL._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '9',
    name: 'Modern Lounge Armchair',
    category: 'armchair',
    price: 449.99,
    stock: 18,
    rating: 4.6,
    reviewCount: 234,
    description:
      'Contemporary lounge armchair with clean lines and ergonomic design',
    variants: [
      {
        color: '#a29b88',
        image:
          'https://m.media-amazon.com/images/I/71rUHEn-sDL._AC_SL1500_.jpg',
      },
      {
        color: '#5e5e60',
        image:
          'https://m.media-amazon.com/images/I/81+zXqTFrIL._AC_SL1500_.jpg',
      },
      {
        color: '#5b5a46',
        image:
          'https://m.media-amazon.com/images/I/71mObwXcSFL._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '10',
    name: 'King Upholstered Bed',
    category: 'bed',
    price: 1299.99,
    stock: 10,
    rating: 4.8,
    reviewCount: 189,
    description:
      'Luxurious upholstered bed with tufted headboard and premium fabric finish',
    variants: [
      {
        color: '#a4988a',
        image:
          'https://m.media-amazon.com/images/I/81wxsyggYnL._AC_SL1500_.jpg',
      },
      {
        color: '#625954',
        image:
          'https://m.media-amazon.com/images/I/81ZsE2RsjJL._AC_SL1500_.jpg',
      },
      {
        color: '#949494',
        image:
          'https://m.media-amazon.com/images/I/81gkWruh9VL._AC_SL1500_.jpg',
      },
    ],
  },
  {
    id: '11',
    name: 'Rocking Chair',
    category: 'chair',
    price: 199.99,
    stock: 20,
    rating: 4.4,
    reviewCount: 167,
    description:
      'Classic wooden rocking chair with comfortable cushioned seat and traditional design',
    variants: [
      {
        color: '#000000',
        image:
          'https://m.media-amazon.com/images/I/71MddU5MM6L._AC_SL1024_.jpg',
      },
      {
        color: '#96b6cb',
        image:
          'https://m.media-amazon.com/images/I/71mQ9mRelML._AC_SL1200_.jpg',
      },
      {
        color: '#676767',
        image:
          'https://m.media-amazon.com/images/I/71zju2QrMYL._AC_SL1200_.jpg',
      },
    ],
  },
  {
    id: '12',
    name: 'Modern Table Lamp',
    category: 'lamp',
    price: 89.99,
    stock: 25,
    rating: 4.6,
    reviewCount: 178,
    description:
      'Sleek table lamp with adjustable head and touch-sensitive dimming control',
    variants: [
      {
        color: '#000000',
        image:
          'https://m.media-amazon.com/images/I/71FOaSg3vML._AC_SL1500_.jpg',
      },
      {
        color: '#4d4d4d',
        image: 'https://m.media-amazon.com/images/I/81QhhyYrbqL._AC_SX679_.jpg',
      },
      {
        color: '#eed096',
        image: 'https://m.media-amazon.com/images/I/71tRimHldWL._AC_SX679_.jpg',
      },
    ],
  },
];
