import {Text as TextBase, TextProps as TextBaseProps} from 'react-native';
import {colors, fontFamilies, fontSizes} from 'src/themes';

export interface TextProps extends TextBaseProps {
  font?: keyof typeof fontFamilies;
  size?: keyof typeof fontSizes;
  textVariant?: keyof typeof colors.text;
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
