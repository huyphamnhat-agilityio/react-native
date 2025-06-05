import {memo} from 'react';
import Svg, {Rect, SvgProps} from 'react-native-svg';
import {colors} from 'src/themes';

const MinusIconComponent = ({
  width = 14,
  height = 2,
  color = colors.primary,
  ...props
}: SvgProps) => {
  return (
    <Svg width={width} height={height} fill="none" {...props}>
      <Rect width={14} height={2} fill={color} rx={1} />
    </Svg>
  );
};

export const MinusIcon = memo(MinusIconComponent);

MinusIcon.displayName = 'MinusIcon';
