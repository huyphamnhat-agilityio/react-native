import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {colors} from 'src/themes';

const ShoppingBagIconComponent = ({
  width = 20,
  height = 20,
  color = colors.white,
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}>
      <Path
        d="M17.9687 16.3105L16.6667 4.0606C16.6667 3.29044 16.07 2.66666 15.3333 2.66666H10H4.66667C3.93 2.66666 3.33333 3.29044 3.33333 4.0606L2.03133 16.3105C2.012 16.406 2 16.5043 2 16.606C2 17.3762 2.59667 18 3.33333 18H10H16.6667C17.4033 18 18 17.3762 18 16.606C18 16.5043 17.988 16.406 17.9687 16.3105ZM13.3333 6.08738V6.84847C13.3333 8.77002 11.838 10.3333 10 10.3333C8.162 10.3333 6.66667 8.77002 6.66667 6.84847V6.08738C6.27933 5.94381 6 5.56047 6 5.10605C6 4.52896 6.448 4.0606 7 4.0606C7.552 4.0606 8 4.52896 8 5.10605V6.84847C8 8.00126 8.89733 8.93938 10 8.93938C11.1027 8.93938 12 8.00126 12 6.84847V5.10605C12 4.52896 12.448 4.0606 13 4.0606C13.552 4.0606 14 4.52896 14 5.10605C14 5.56047 13.7207 5.94381 13.3333 6.08738Z"
        fill={color}
      />
    </Svg>
  );
};

export const ShoppingBagIcon = memo(ShoppingBagIconComponent);

ShoppingBagIcon.displayName = 'ShoppingBagIcon';
