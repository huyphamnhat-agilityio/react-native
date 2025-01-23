import {
  ActivityIndicator,
  DimensionValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

// Type & Interfaces
import {BorderRadius, FontFamily, FontSize} from 'src/interfaces';

// Themes
import {borderRadius, colors} from 'src/themes';
import Text from '../Text';
import {memo} from 'react';

export interface ButtonProps extends TouchableOpacityProps {
  IconLeft?: React.ReactElement;
  IconRight?: React.ReactElement;
  bgVariant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'disabled'
    | 'alternative'
    | 'white'
    | 'none';
  isLoading?: boolean;
  rounded?: BorderRadius;
  style?: StyleProp<ViewStyle>;
  textVariant?: 'primary' | 'outline';
  title?: string;
  titleFont?: FontFamily;
  titleSize?: FontSize;
  width?: DimensionValue;
}

const Button = memo(
  ({
    IconLeft,
    IconRight,
    bgVariant = 'primary',
    disabled,
    isLoading = false,
    rounded = 'none',
    style,
    textVariant = 'primary',
    title = '',
    titleFont = 'NuniToSansNormal',
    titleSize = 'sm',
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
          bgVariantStyle[bgVariant],
          borderVariantStyle[bgVariant],
          {
            borderRadius: borderRadius[rounded],
            opacity,
            width,
          },
          style,
        ]}
        disabled={isDisabled}
        {...props}>
        {IconLeft}

        <View style={styles.wrapper}>
          {!!title && isLoading && (
            <ActivityIndicator color={textVariantStyle[textVariant].color} />
          )}
          {!!title && (
            <Text
              font={titleFont}
              size={titleSize}
              style={textVariantStyle[textVariant]}>
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
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const bgVariantStyle = StyleSheet.create({
  primary: {
    backgroundColor: colors.background.primary,
  },
  secondary: {
    backgroundColor: colors.background.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.background.disabled,
  },
  alternative: {
    backgroundColor: colors.background.alternative,
  },
  white: {
    backgroundColor: colors.white,
  },
  none: {
    backgroundColor: 'transparent',
  },
});

const borderVariantStyle = StyleSheet.create({
  primary: {
    borderColor: 'transparent',
  },
  secondary: {
    borderColor: 'transparent',
  },
  outline: {
    borderColor: colors.border.primary,
  },
  disabled: {
    borderColor: 'transparent',
  },
  alternative: {
    borderColor: 'transparent',
  },
  white: {
    borderColor: 'transparent',
  },
  none: {
    borderColor: 'transparent',
  },
});

const textVariantStyle = StyleSheet.create({
  primary: {
    color: colors.white,
  },
  outline: {
    color: colors.text.secondary,
  },
});
Button.displayName = 'Button';

export default Button;
