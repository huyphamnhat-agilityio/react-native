import { QueryParams } from "@/interfaces";

export const toQueryString = <T>(params?: QueryParams<T>): string =>
  params
    ? "?" +
      Object.entries(params)
        .flatMap(([key, value]) => {
          if (value === undefined) {
            return [];
          }

          if (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
          ) {
            return Object.entries(value).map(
              ([op, opValue]) => `${key}${op}=${encodeURIComponent(opValue)}`,
            );
          }

          return [
            `${key}=${encodeURIComponent(value as string | number | boolean)}`,
          ];
        })
        .join("&")
    : "";
