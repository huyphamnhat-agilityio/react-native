import React from 'react';
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
import {borderRadius, colors} from 'src/themes';

export interface CustomButtonProps extends TouchableOpacityProps {
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

const getBgVariantStyle = (variant: CustomButtonProps['bgVariant']) => {
  switch (variant) {
    case 'outline':
      return 'transparent';

    default:
      return colors.background.primary;
  }
};

const getTextVariantStyle = (variant: CustomButtonProps['textVariant']) => {
  switch (variant) {
    case 'outline':
      return colors.text.secondary;

    default:
      return colors.white;
  }
};

const CustomButton = ({
  IconLeft,
  IconRight,
  bgVariant = 'primary',
  isLoading = false,
  rounded = 'none',
  style,
  textVariant = 'primary',
  title = '',
  disabled,
  width,
  ...props
}: CustomButtonProps) => {
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
        {isLoading && <ActivityIndicator color={textColor} />}
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

export default CustomButton;
