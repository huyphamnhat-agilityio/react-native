export type ValidParam = string | number | boolean | undefined;

export type QueryParams<T extends Record<string, ValidParam>> = {
  page?: number;
  limit?: number;
  orderBy?: Extract<keyof T, string>;
  order?: 'asc' | 'desc';
} & Partial<T>;
