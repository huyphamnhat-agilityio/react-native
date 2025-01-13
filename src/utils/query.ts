import {QueryParams, ValidParam} from 'src/interfaces';

/**
 * Converts an object of query parameters into a URL query string
 * @param params Object containing query parameters
 * @returns Formatted query string starting with '?' if params exist, empty string if not
 */
export const toQueryString = <T extends Record<string, ValidParam>>(
  params?: QueryParams<T>,
): string => {
  if (!params) {
    return '';
  }

  const queryParams: string[] = [];

  // Helper to add param if it exists
  const addParam = (key: string, value: ValidParam) => {
    if (value !== undefined) {
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      );
    }
  };

  // Handle pagination and ordering params first
  addParam('page', params.page);
  addParam('limit', params.limit);
  addParam('orderBy', params.orderBy);
  addParam('order', params.order);

  // Handle all other properties from T (Product in this case)
  Object.entries(params).forEach(([key, value]) => {
    // Skip the common params we already handled
    if (['page', 'limit', 'orderBy', 'order'].includes(key)) {
      return;
    }

    if (value !== undefined) {
      // Handle arrays
      if (Array.isArray(value)) {
        value.forEach(item => {
          addParam(`${key}[]`, item);
        });
      }
      // Handle objects (convert to JSON string)
      else if (typeof value === 'object' && value !== null) {
        addParam(key, JSON.stringify(value));
      }
      // Handle primitive values
      else {
        addParam(key, value);
      }
    }
  });

  return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
};
