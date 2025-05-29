import {memo} from 'react';
import Svg, {Rect, SvgProps} from 'react-native-svg';
import {colors} from 'src/themes';

const MinusIconComponent = ({
  width = 30,
  height = 30,
  color = colors.primary,
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      {...props}>
      <Rect opacity="0.4" width={width} height={height} rx="6" fill="#E0E0E0" />
      <Rect x="8" y="14" width="14" height="2" rx="1" fill={color} />
    </Svg>
  );
};

export const MinusIcon = memo(MinusIconComponent);

MinusIcon.displayName = 'MinusIcon';
