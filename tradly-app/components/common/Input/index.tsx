import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ColorValue,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput as TextInputBase,
  TextInputProps as TextInputBaseProps,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// Reanimated
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

// Components
import Text from "../Text";

// Types & Interfaces
import { FontFamily, FontSize, TextVariant } from "@/interfaces";
import { fontFamilies, fontSizes, text } from "@/themes";

// Props
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
        placeholder = "",
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
        value,
        onFocus,
        onBlur,
        ...props
      }: TextInputProps,
      ref: Ref<TextInputBase>,
    ) => {
      const isEditable = !isDisabled;
      const [isFocusedState, setIsFocusedState] = useState(false);
      const opacity = isEditable ? 1 : 0.5;

      // Reanimated values
      const isFocused = useSharedValue(false);

      useEffect(() => {
        isFocused.value = isFocusedState;
      }, [isFocused, isFocusedState]);

      const animatedPlaceholderStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isFocused.value ? 0 : 1, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }),
        transform: [
          {
            translateX: withTiming(isFocused.value ? 20 : 0, {
              duration: 300,
              easing: Easing.out(Easing.cubic),
            }),
          },
        ],
      }));

      const handleFocus = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          setIsFocusedState(true);
          onFocus?.(e);
        },
        [onFocus],
      );

      const handleBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          if (!value) {
            setIsFocusedState(false);
          }
          onBlur?.(e);
        },
        [onBlur, value],
      );

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

            <View style={styles.inputContainer}>
              {!!placeholder && !value && (
                <Animated.Text
                  style={[
                    styles.animatedPlaceholder,
                    {
                      fontSize: fontSizes[`${inputSize}`],
                      color: placeholderTextColor,
                      fontFamily: fontFamilies[`${font}`],
                    },
                    animatedPlaceholderStyle,
                  ]}
                  pointerEvents="none"
                >
                  {placeholder}
                </Animated.Text>
              )}
              <TextInputBase
                ref={ref}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
            </View>

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
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: "auto",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  animatedPlaceholder: {
    position: "absolute",
    left: 0,
  },
});

Input.displayName = "Input";

export default Input;
