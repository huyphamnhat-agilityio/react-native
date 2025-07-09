import {
  ActivityIndicator,
  DimensionValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { memo } from "react";

// Type & Interfaces
import { BorderRadius, FontFamily, FontSize } from "@/interfaces";

// Themes
import { background, border, borderRadius, text } from "@/themes";

// Components
import Text from "../Text";

export type ButtonProps = TouchableOpacityProps & {
  IconLeft?: React.ReactElement;
  IconRight?: React.ReactElement;
  isLoading?: boolean;
  rounded?: BorderRadius;
  variant?: "primary" | "secondary" | "transparent";
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleFont?: FontFamily;
  titleSize?: FontSize;
  width?: DimensionValue;
};

const Button = memo(
  ({
    IconLeft,
    IconRight,
    disabled,
    isLoading = false,
    rounded = 0,
    style,
    variant = "primary",
    title = "",
    titleFont = "Montserrat_500Medium",
    titleSize = 3.5,
    width,
    children,
    ...props
  }: ButtonProps) => {
    const isDisabled = disabled || isLoading;

    const opacity = isDisabled ? 0.5 : 1;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.container,
          bgVariantStyle[variant],
          {
            borderRadius: borderRadius[rounded],
            borderColor: borderVariantStyle[variant].borderColor,
            opacity,
            width,
          },
          style,
        ]}
        disabled={isDisabled}
        {...props}
      >
        {IconLeft}

        <View style={styles.wrapper}>
          {!!title && isLoading && (
            <ActivityIndicator color={textVariantStyle[variant].color} />
          )}
          {!!title && (
            <Text
              font={titleFont}
              size={titleSize}
              style={textVariantStyle[variant]}
            >
              {title}
            </Text>
          )}
        </View>
        {children}

        {IconRight}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
});

const bgVariantStyle = StyleSheet.create({
  primary: {
    backgroundColor: background.primary,
  },
  secondary: {
    backgroundColor: background.white,
  },
  transparent: {
    backgroundColor: "transparent",
  },
});

const textVariantStyle = StyleSheet.create({
  primary: {
    color: text.white,
  },
  secondary: {
    color: text.primary,
  },
  transparent: {
    color: text.white,
  },
});

const borderVariantStyle = StyleSheet.create({
  primary: {
    borderColor: border.none,
  },
  secondary: {
    borderColor: border.none,
  },
  transparent: {
    borderColor: border.white,
  },
});

Button.displayName = "Button";

export default Button;
