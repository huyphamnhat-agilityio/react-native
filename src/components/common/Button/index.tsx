import {
  ActivityIndicator,
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

// Type & Interfaces
import {BorderRadius} from 'src/interfaces';

// Themes
import {borderRadius, colors} from 'src/themes';

export interface ButtonProps extends TouchableOpacityProps {
  IconLeft?: React.ReactElement;
  IconRight?: React.ReactElement;
  bgVariant?: 'primary' | 'outline' | 'none';
  isLoading?: boolean;
  rounded?: BorderRadius;
  style?: StyleProp<ViewStyle>;
  textVariant?: 'primary' | 'outline';
  title?: string;
  width?: DimensionValue;
}

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'outline':
    case 'none':
      return 'transparent';

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

const Button = ({
  IconLeft,
  IconRight,
  bgVariant = 'primary',
  disabled,
  isLoading = false,
  rounded = 'none',
  style,
  textVariant = 'primary',
  title = '',
  width,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  const opacity = isDisabled ? 0.5 : 1;

  const backgroundColor = getBgVariantStyle(bgVariant);

  const borderColor = getBorderVariantStyle(bgVariant);

  const textColor = getTextVariantStyle(textVariant);
  return (
    <TouchableOpacity
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
            style={{
              color: textColor,
            }}>
            {title}
          </Text>
        )}
      </View>

      {IconRight}
    </TouchableOpacity>
  );
};

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

export default Button;
