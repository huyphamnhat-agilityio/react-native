export const FORM_VALIDATION_MESSAGES = {
  REQUIRED: (item: string) => `${item} must not be empty.`,
  ALL_WHITE_SPACE: (item: string) => `${item} cannot contain only whitespace.`,
  INVALID: (item: string) => `${item} is invalid. Please try again.`,
  MIN_LENGTH: (item: string, min: number) =>
    `${item} must be at least ${min} characters.`,
  MAX_LENGTH: (item: string, max: number) =>
    `${item} must be less than ${max} characters.`,
  INVALID_PASSWORD:
    "Password must be between 8 and 32 characters, and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
  PASSWORD_NOT_MATCH: "Password does not match",
  FORMAT: (ariaLabel: string) =>
    `${ariaLabel} does not follow the correct format.`,
  MAX_SIZE: ({
    item,
    size,
    unit,
  }: {
    item: string;
    size: number;
    unit: string;
  }) => `Max ${item} size is ${size}${unit}`,
};
