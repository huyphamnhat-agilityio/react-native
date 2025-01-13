import Svg, {Path, SvgProps} from 'react-native-svg';
import {colors} from 'src/themes';

export const BackArrowIcon = ({
  width = 20,
  height = 20,
  color = colors.primary,
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 8 16"
      fill="none"
      {...props}>
      <Path
        d="M7.25 1.5L0.75 8L7.25 14.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
