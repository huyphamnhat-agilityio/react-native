import { memo } from "react";
import {
  StyleSheet,
  Text as TextBase,
  TextProps as TextBaseProps,
} from "react-native";

// Types & Interfaces
import { FontFamily, FontSize, TextVariant } from "@/interfaces";

// Themes
import { fontFamilies, fontSizes, text } from "@/themes";

export type TextProps = TextBaseProps & {
  font?: FontFamily;
  size?: FontSize;
  textVariant?: TextVariant;
};

const Text = memo(
  ({
    textVariant = "primary",
    size = 3.5,
    style,
    font = "Montserrat_500Medium",
    children,
    ...props
  }: TextProps) => {
    return (
      <TextBase
        style={[
          styles.text,
          {
            color: text[`${textVariant}`],
            fontSize: fontSizes[`${size}`],
            fontFamily: fontFamilies[`${font}`],
          },
          style,
        ]}
        {...props}
      >
        {children}
      </TextBase>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
});

Text.displayName = "Text";

export default Text;
