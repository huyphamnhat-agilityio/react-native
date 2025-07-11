import { Product, QueryParams } from "@/interfaces";

export const QUERY_KEY = {
  PRODUCTS: (params?: QueryParams<Product>) =>
    [{ scope: "products", params }] as const,

  PRODUCT: (id: string) => [{ scope: "product", id }] as const,
} as const;
