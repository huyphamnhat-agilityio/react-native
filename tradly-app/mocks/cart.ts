import { CartItemData } from "@/interfaces";
import { MOCK_PRODUCTS } from "./product";

export const MOCK_CART_ITEMS: CartItemData[] = [
  {
    id: MOCK_PRODUCTS[0].id,
    productId: MOCK_PRODUCTS[0].id,
    productName: MOCK_PRODUCTS[0].name,
    image: MOCK_PRODUCTS[0].imageUrl,
    price: MOCK_PRODUCTS[0].price,
    originalPrice: MOCK_PRODUCTS[0].originalPrice,
    quantity: 1,
  },
];
