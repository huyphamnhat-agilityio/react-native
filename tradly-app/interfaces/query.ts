type FilterOperators<T> = {
  _lt?: T;
  _lte?: T;
  _gt?: T;
  _gte?: T;
  _ne?: T;
  _like?: T;
};

type FieldFilter<T> = T | FilterOperators<T>;

type Filters<T> = {
  [K in keyof T]?: FieldFilter<T[K]>;
};

type ValidParam = string | number | boolean | undefined;

type CustomFilters = {
  [key: string]: ValidParam | FilterOperators<any>;
};

export type BaseQueryParams = {
  _page?: number;
  _start?: number;
  _end?: number;
  _limit?: number;
  _sort?: string;
};

export type QueryParams<T> = BaseQueryParams & Filters<T> & CustomFilters;
