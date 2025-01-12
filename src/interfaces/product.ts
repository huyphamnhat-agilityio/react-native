export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  stock: number;
  rating: number;
  price: number;
  reviewCount: number;
  variants: Array<{
    color: string;
    image: string;
  }>;
};
