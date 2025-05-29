import {memo} from 'react';
import {
  StyleSheet,
  Text as TextBase,
  TextProps as TextBaseProps,
} from 'react-native';

// Types & Interfaces
import {FontFamily, FontSize, TextVariant} from 'src/interfaces';

// Themes
import {colors, fontFamilies, fontSizes} from 'src/themes';

export interface TextProps extends TextBaseProps {
  font?: FontFamily;
  size?: FontSize;
  textVariant?: TextVariant;
}

const Text = memo(
  ({
    textVariant = 'primary',
    size = 'sm',
    style,
    font = 'NuniToSansNormal',
    children,
    ...props
  }: TextProps) => {
    return (
      <TextBase
        style={[
          styles.text,
          {
            color: colors.text[`${textVariant}`],
            fontSize: fontSizes[`${size}`],
            fontFamily: fontFamilies[`${font}`],
          },
          style,
        ]}
        {...props}>
        {children}
      </TextBase>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
});

Text.displayName = 'Text';

export default Text;
