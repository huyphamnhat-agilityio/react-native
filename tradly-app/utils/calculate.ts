import { CartItemData } from "@/interfaces";

export const getSalePercentage = (originalPrice: number, salePrice: number) =>
  (salePrice / originalPrice) * 100;

export const getCartSummary = (items: CartItemData[]) => {
  return items.reduce(
    (summary, item) => {
      summary.totalQuantity += item.quantity;
      summary.totalPrice += item.quantity * item.price;
      return summary;
    },
    {
      totalQuantity: 0,
      totalPrice: 0,
    },
  );
};

export const generateRandomID = () =>
  Math.random().toString(36).substring(2, 10);
