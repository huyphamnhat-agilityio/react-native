import { QUERY_KEY } from "@/constants";
import { QueryFunctionContext } from "@tanstack/react-query";

type QueryKeys = readonly unknown[];

type QueryContextFromKeys<
  KeyFactory extends Record<
    string,
    QueryKeys | ((...args: any[]) => QueryKeys)
  >,
> = {
  [K in keyof KeyFactory]: KeyFactory[K] extends (...args: any[]) => QueryKeys
    ? QueryFunctionContext<ReturnType<KeyFactory[K]>>
    : KeyFactory[K] extends QueryKeys
      ? QueryFunctionContext<KeyFactory[K]>
      : never;
};

export type QueryContexts = QueryContextFromKeys<typeof QUERY_KEY>;
