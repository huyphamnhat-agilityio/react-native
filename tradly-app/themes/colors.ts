export const colors = {
  green_50: "#85bcb0",
  green_100: "#13B58C",
  green_200: "#33907C",

  gray_50: "#DCDCDC",
  gray_100: "#A6A6A6",
  gray_200: "#848484",
  gray_300: "#4A4A4A",

  white: "#FFFFFF",
  white_50: "#F6F9FF",
  white_opacity_10: "#FFFFFF1A",
  white_opacity_20: "#FFFFFF33",
  white_opacity_30: "#FFFFFF4D",

  black: "#000000",
  black_opacity_10: "#0000001A",
  black_opacity_30: "#0000004D",

  danger: "#810c0c",
} as const;

export const text = {
  primary: colors.green_200,
  secondary: colors.gray_100,
  tertiary: colors.gray_200,
  quaternary: colors.gray_300,
  alternative: colors.gray_50,
  white: colors.white,
  white_opacity_20: colors.white_opacity_20,
  white_opacity_30: colors.white_opacity_30,
  black: colors.black,
  danger: colors.danger,
} as const;

export const background = {
  primary: colors.green_200,
  secondary: colors.white_50,
  white_opacity_10: colors.white_opacity_10,
  white_opacity_30: colors.white_opacity_30,
  backdrop: colors.black_opacity_30,
  white: colors.white,
  black: colors.black,
} as const;

export const border = {
  secondary: colors.gray_100,
  alternative: colors.gray_50,
  black_opacity_10: colors.black_opacity_10,
  white_opacity_30: colors.white_opacity_30,
  white: colors.white,
  none: "transparent",
} as const;
