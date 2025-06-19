import { forwardRef, memo, Ref } from 'react';
import {
  ColorValue,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

// Components
import Text from '../Text';

// Types & Interfaces
import { FontFamily, FontSize, TextVariant } from 'src/interfaces';

// Themes
import { colors } from 'src/themes';
import { Dropdown as DropdownBase } from 'react-native-element-dropdown';
import {
  DropdownProps as DropdownPropsBase,
  IDropdownRef,
} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

export type DropdownProps = DropdownPropsBase<any> & {
  errorMessage?: string;
  font?: FontFamily;
  isError?: boolean;
  label?: string;
  labelSize?: FontSize;
  labelVariant?: TextVariant;
  labelDistance?: number;
  backgroundColor?: ColorValue;
  mainContainerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
};

const Dropdown = memo(
  forwardRef(
    (
      {
        label,
        font = 'NunitoSansNormal',
        labelSize = 'sm',
        labelVariant = 'primary',
        isError = false,
        errorMessage = '',
        backgroundColor,
        labelDistance,
        mainContainerStyle,
        errorStyle,
        disable,
        style,
        ...props
      }: DropdownProps,
      ref: Ref<IDropdownRef>,
    ) => {
      const opacity = disable ? 0.5 : 1;

      const selectedColorStyled = disable
        ? colors.text.placeholder
        : colors.text.primary;

      return (
        <View>
          <View
            style={[
              { opacity, backgroundColor, gap: labelDistance },
              mainContainerStyle,
            ]}
          >
            {label && (
              <Text font={font} size={labelSize} textVariant={labelVariant}>
                {label}
              </Text>
            )}
            <DropdownBase
              ref={ref}
              style={style}
              disable={disable}
              selectedTextStyle={[
                {
                  color: selectedColorStyled,
                },
                props.selectedTextStyle,
              ]}
              {...props}
            />
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

Dropdown.displayName = 'Dropdown';

export default Dropdown;
