import {forwardRef, memo, Ref} from 'react';
import {
  DimensionValue,
  StyleSheet,
  TextInput as TextInputBase,
  TextInputProps as TextInputBaseProps,
  View,
} from 'react-native';

// Components
import Text from '../Text';

// Types & Interfaces
import {FontFamily, FontSize, TextVariant} from 'src/interfaces';

// Themes
import {colors, fontFamilies, fontSizes} from 'src/themes';

export interface TextInputProps extends TextInputBaseProps {
  LeftContent?: React.ReactElement;
  RightContent?: React.ReactElement;
  errorMessage?: string;
  font?: FontFamily;
  inputSize?: FontSize;
  inputVariant?: TextVariant;
  isDisabled?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  label?: string;
  labelSize?: FontSize;
  labelVariant?: TextVariant;
  inputWidth?: DimensionValue;
  inputHeight?: DimensionValue;
  borderBottomWidth?: number;
}

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
        isLoading = false,
        isError = false,
        errorMessage = '',
        inputWidth = '94%',
        inputHeight = 'auto',
        borderBottomWidth = 2,
        style,
        ...props
      }: TextInputProps,
      ref: Ref<TextInputBase>,
    ) => {
      const isEditable = !isDisabled && !isLoading;

      const errorBorderVariant = isError
        ? colors.border.danger
        : colors.border.secondary;

      const opacity = !isEditable ? 0.5 : 1;
      return (
        <View style={[styles.wrapper, {opacity}]}>
          {label && (
            <Text font={font} size={labelSize} textVariant={labelVariant}>
              {label}
            </Text>
          )}
          <View
            style={[
              styles.container,
              {
                borderBottomWidth,
                borderBottomColor: errorBorderVariant,
              },
            ]}>
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
          {isError && !!errorMessage && (
            <Text font={font} size={labelSize} textVariant="danger">
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
