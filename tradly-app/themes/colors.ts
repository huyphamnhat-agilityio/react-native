export const colors = {
  green_50: "#85bcb0",
  green_100: "#13B58C",
  green_200: "#33907C",

  gray_50: "#DCDCDC",
  gray_100: "#A6A6A6",
  gray_200: "#848484",
  gray_300: "#4A4A4A",

  white: "#FFFFFF",

  black: "#000000",

  danger: "#810c0c",
} as const;

export const text = {
  primary: colors.green_200,
  secondary: colors.gray_100,
  tertiary: colors.gray_200,
  quaternary: colors.gray_300,
  alternative: colors.gray_50,
  white: colors.white,
  black: colors.black,
  danger: colors.danger,
} as const;

export const background = {
  primary: colors.green_200,
  white: colors.white,
} as const;

export const border = {
  white: colors.white,
  none: "transparent",
} as const;
