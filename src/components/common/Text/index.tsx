import {Text as TextBase, TextProps as TextBaseProps} from 'react-native';
import {FontFamily, FontSize} from 'src/interfaces';
import {TextVariant} from 'src/interfaces/color';

// Themes
import {colors, fontFamilies, fontSizes} from 'src/themes';

export interface TextProps extends TextBaseProps {
  font?: FontFamily;
  size?: FontSize;
  textVariant?: TextVariant;
}

const Text = ({
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
};

export default Text;
