import {Product} from './product';

export type Favorites = {
  id: string;
  userId: string;
  items: Product[];
};

export type FavoritesPayload = {
  userId: string;
  items: Product[];
};
