import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {colors} from 'src/themes';

const LogoutIconComponent = ({
  width = 18,
  height = 18,
  color = colors.primary,
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      {...props}>
      <Path
        d="M11.5133 5.15792V4.38042C11.5133 2.68459 10.1383 1.30959 8.4425 1.30959H4.38C2.685 1.30959 1.31 2.68459 1.31 4.38042V13.6554C1.31 15.3513 2.685 16.7263 4.38 16.7263H8.45083C10.1417 16.7263 11.5133 15.3554 11.5133 13.6646V12.8788"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.1746 9.01783H7.14041"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.7343 6.58858L17.1743 9.01775L14.7343 11.4478"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const LogoutIcon = memo(LogoutIconComponent);

LogoutIcon.displayName = 'LogoutIcon';
