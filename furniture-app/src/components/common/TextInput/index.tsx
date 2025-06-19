import { forwardRef, memo, Ref } from 'react';
import {
  ColorValue,
  DimensionValue,
  StyleProp,
  StyleSheet,
  TextInput as TextInputBase,
  TextInputProps as TextInputBaseProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

// Components
import Text from '../Text';

// Types & Interfaces
import { FontFamily, FontSize, TextVariant } from 'src/interfaces';

// Themes
import { colors, fontFamilies, fontSizes } from 'src/themes';

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
  inputWidth?: DimensionValue;
  inputHeight?: DimensionValue;
  innerBorderBottomWidth?: number;
  backgroundColor?: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
  errorPosition?: 'inner' | 'outer';
  errorStyle?: StyleProp<TextStyle>;
};

const TextInput = memo(
  forwardRef(
    (
      {
        label,
        font = 'NunitoSansNormal',
        labelSize = 'sm',
        inputSize = 'sm',
        inputVariant = 'primary',
        labelVariant = 'primary',
        LeftContent,
        RightContent,
        numberOfLines = 1,
        placeholderTextColor = colors.text.placeholder,
        isDisabled = false,
        isError = false,
        errorMessage = '',
        inputWidth = '94%',
        inputHeight = 'auto',
        innerBorderBottomWidth = 2,
        backgroundColor,
        labelDistance,
        errorPosition = 'inner',
        containerStyle,
        errorStyle,
        style,
        ...props
      }: TextInputProps,
      ref: Ref<TextInputBase>,
    ) => {
      const isEditable = !isDisabled;

      const errorBorderVariant = isError
        ? colors.border.danger
        : colors.border.secondary;

      const opacity = isEditable ? 1 : 0.5;
      return (
        <View>
          <View
            style={[
              styles.wrapper,
              { opacity, backgroundColor, gap: labelDistance },
              containerStyle,
            ]}
          >
            {label && (
              <Text font={font} size={labelSize} textVariant={labelVariant}>
                {label}
              </Text>
            )}
            <View
              style={[
                styles.container,
                {
                  borderBottomWidth: innerBorderBottomWidth,
                  borderBottomColor: errorBorderVariant,
                },
              ]}
            >
              {LeftContent}
              <TextInputBase
                ref={ref}
                placeholderTextColor={placeholderTextColor}
                numberOfLines={numberOfLines}
                style={[
                  styles.input,
                  {
                    fontSize: fontSizes[`${inputSize}`],
                    color: colors.text[`${inputVariant}`],
                    fontFamily: fontFamilies[`${font}`],
                    width: inputWidth,
                    height: inputHeight,
                  },
                  style,
                ]}
                editable={isEditable}
                {...props}
              />
              {RightContent}
            </View>

            {isError && !!errorMessage && errorPosition === 'inner' && (
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
          {isError && !!errorMessage && errorPosition === 'outer' && (
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
  wrapper: {
    display: 'flex',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

TextInput.displayName = 'TextInput';

export default TextInput;
