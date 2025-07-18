import { forwardRef, memo, Ref } from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextInput as TextInputBase,
  TextInputProps as TextInputBaseProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// Components
import Text from "../Text";

// Types & Interfaces
import { FontFamily, FontSize, TextVariant } from "@/interfaces";
import { fontFamilies, fontSizes, text } from "@/themes";

// Themes

export type TextInputProps = TextInputBaseProps & {
  LeftContent?: React.ReactElement;
  RightContent?: React.ReactElement;
  errorMessage?: string;
  font?: FontFamily;
  inputSize?: FontSize;
  inputVariant?: TextVariant;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  labelSize?: FontSize;
  labelVariant?: TextVariant;
  labelDistance?: number;
  labelFont?: FontFamily;
  backgroundColor?: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
};

const Input = memo(
  forwardRef(
    (
      {
        label,
        font = "Montserrat_500Medium",
        labelSize = 3.5,
        inputSize = 3.5,
        inputVariant = "primary",
        labelVariant = "primary",
        labelFont = "Montserrat_500Medium",
        LeftContent,
        RightContent,
        numberOfLines = 1,
        placeholderTextColor = text.white,
        isDisabled = false,
        isError = false,
        errorMessage = "",
        backgroundColor,
        labelDistance,
        containerStyle,
        wrapperStyle,
        errorStyle,
        style,
        ...props
      }: TextInputProps,
      ref: Ref<TextInputBase>,
    ) => {
      const isEditable = !isDisabled;

      const opacity = isEditable ? 1 : 0.5;
      return (
        <View
          style={[
            styles.container,
            { opacity, backgroundColor, gap: labelDistance },
            containerStyle,
          ]}
        >
          {label && (
            <Text font={labelFont} size={labelSize} textVariant={labelVariant}>
              {label}
            </Text>
          )}
          <View style={[styles.wrapper, wrapperStyle]}>
            {LeftContent}
            <TextInputBase
              ref={ref}
              placeholderTextColor={placeholderTextColor}
              numberOfLines={numberOfLines}
              style={[
                styles.input,
                {
                  fontSize: fontSizes[`${inputSize}`],
                  color: text[`${inputVariant}`],
                  fontFamily: fontFamilies[`${font}`],
                },
                style,
              ]}
              editable={isEditable}
              {...props}
            />
            {RightContent}
          </View>

          {isError && !!errorMessage && (
            <Text
              style={errorStyle}
              font={font}
              size={labelSize}
              textVariant="danger"
            >
              {errorMessage}
            </Text>
          )}
        </View>
      );
    },
  ),
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    width: "100%",
    height: "auto",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

Input.displayName = "Input";

export default Input;
