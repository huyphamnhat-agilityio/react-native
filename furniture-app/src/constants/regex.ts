export const REGEX = {
  ALL_WHITE_SPACE: /\S/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME: /^[A-Za-z\s]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,32})/,
};
