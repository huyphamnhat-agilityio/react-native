import {CartItemData} from 'src/interfaces';
import {MOCK_PRODUCT} from './product';

export const MOCK_CART_ITEM: CartItemData = {
  id: MOCK_PRODUCT.id,
  image: MOCK_PRODUCT.variants[0].image,
  price: MOCK_PRODUCT.price,
  productId: MOCK_PRODUCT.id,
  productName: MOCK_PRODUCT.name,
  quantity: 2,
  selectedColor: MOCK_PRODUCT.variants[0].color,
};
