export const FORM_VALIDATION_MESSAGE = {
  REQUIRED: (item: string) => `${item} must not be empty.`,
  ALL_WHITE_SPACE: (item: string) => `${item} cannot contain only whitespace.`,
  INVALID: (item: string) => `${item} is invalid. Please try again.`,
  MIN_LENGTH: (item: string, min: number) =>
    `${item} must be at least ${min} characters.`,
  MAX_LENGTH: (item: string, max: number) =>
    `${item} must be less than ${max} characters.`,
  PASSWORD_NOT_MATCH: 'Password does not match',
  FORMAT: (ariaLabel: string) =>
    `${ariaLabel} does not follow the correct format.`,
  MAX_SIZE: ({item, size, unit}: {item: string; size: number; unit: string}) =>
    `Max ${item} size is ${size}${unit}`,
};

export const FETCH_ERROR_MESSAGES: Record<number, string> = {
  400: 'The request could not be understood by the server due to malformed syntax. Please check your input and try again.',
  401: 'You are not authorized to access this resource. Please log in with valid credentials and try again.',
  403: 'You do not have permission to access this resource. Please contact the administrator if you believe this is an error.',
  404: 'The requested resource could not be found on this server. Please check the URL and try again.',
  405: 'The HTTP method used is not allowed for this resource. Please refer to the API documentation for the correct method.',
  406: 'The requested resource cannot generate content acceptable according to the Accept headers sent in the request. Please modify your request and try again.',
} as const;

export const SUCCESS_MESSAGE = {
  ADD_TO_CART: 'The product has been added to cart!',
} as const;

export const ERROR_MESSAGE: Record<string, Record<number, string>> = {
  LOGIN: {
    404: 'Login failed! Please check your email or password and try again.',
    500: 'Login failed! The server is unavailable now. Please try again later.',
  },
  PRODUCT_LIST: {
    404: 'No product match with the keywords.',
    500: 'Failed to load product list. Please try again later.',
  },
} as const;
