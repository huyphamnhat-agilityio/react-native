import { Cart, Product, QueryParams } from "@/interfaces";

export const QUERY_KEY = {
  PRODUCTS: (params?: QueryParams<Product>) =>
    [{ scope: "products", params }] as const,
  PRODUCT: (id: string) => [{ scope: "product", id }] as const,
  CARTS: (params?: QueryParams<Pick<Cart, "userId" | "id">>) =>
    [{ scope: "carts", params }] as const,
} as const;
