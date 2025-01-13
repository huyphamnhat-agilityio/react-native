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

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'outline':
    case 'none':
      return 'transparent';

    case 'secondary':
      return colors.background.quaternary;

    case 'disabled':
      return colors.background.disabled;

    case 'alternative':
      return colors.background.alternative;

    default:
      return colors.background.primary;
  }
};

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
  switch (variant) {
    case 'outline':
      return colors.text.secondary;

    default:
      return colors.white;
  }
};

const getBorderVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'outline':
      return colors.border.primary;

    default:
      return 'transparent';
  }
};

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

    const backgroundColor = getBgVariantStyle(bgVariant);

    const borderColor = getBorderVariantStyle(bgVariant);

    const textColor = getTextVariantStyle(textVariant);
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor,
            borderRadius: borderRadius[rounded],
            opacity,
            width,
            borderColor,
          },
          style,
        ]}
        disabled={isDisabled}
        {...props}>
        {IconLeft}

        <View style={styles.wrapper}>
          {!!title && isLoading && <ActivityIndicator color={textColor} />}
          {!!title && (
            <Text
              font={titleFont}
              size={titleSize}
              style={{
                color: textColor,
              }}>
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

Button.displayName = 'Button';

export default Button;
