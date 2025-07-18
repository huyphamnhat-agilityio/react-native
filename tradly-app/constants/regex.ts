export const REGEX = {
  ALL_WHITE_SPACE: /\S/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME: /^[A-Za-z\s]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?=.{8,32})/,
  PHONE: /^\+\d{12}$/,
  EXPIRES_DATES: /^(0[1-9]|1[0-2])\/\d{2}$/,
} as const;
