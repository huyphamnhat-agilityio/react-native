export const colors = {
  green_100: "#13B58C",
  green_200: "#33907C",

  gray_100: "#4F4F4F",
  gray_200: "#4A4A4A",

  white: "#FFFFFF",

  black: "#000000",
} as const;

export const text = {
  primary: colors.green_200,
  secondary: colors.gray_100,
  tertiary: colors.gray_200,
  white: colors.white,
  black: colors.black,
} as const;

export const background = {
  primary: colors.green_200,
  white: colors.white,
} as const;

export const border = {
  white: colors.white,
  none: "transparent",
} as const;
