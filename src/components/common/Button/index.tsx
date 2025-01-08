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

// Themes
import {borderRadius, colors} from 'src/themes';

export interface ButtonProps extends TouchableOpacityProps {
  IconLeft?: React.ReactElement;
  IconRight?: React.ReactElement;
  bgVariant?: 'primary' | 'outline';
  isLoading?: boolean;
  rounded?: keyof typeof borderRadius;
  style?: StyleProp<ViewStyle>;
  textVariant?: 'primary' | 'outline';
  title?: string;
  width?: DimensionValue;
}

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'outline':
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
    opacity: 0.5,
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Button;
