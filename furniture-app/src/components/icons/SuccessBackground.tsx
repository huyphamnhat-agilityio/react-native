import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SuccessBackgroundComponent = ({
  width = 269,
  height = 230,
  color = '#f9f9f9',
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 269 230"
      fill="none"
      {...props}>
      <Path
        d="M124.085 0.0181746C75.9921 -0.715348 39.8297 20.9541 32.4822 28.9006C30.1444 32.1098 22.8894 40.8204 27.0473 55.4908C31.7884 72.2192 37.378 72.912 23 88.9578C6.87134 106.957 -15.1098 141.68 14.9483 185.233C45.0064 228.786 118.849 232.096 157.8 229.244C195.373 226.493 241.632 208.521 259.496 186.15C278.533 162.31 264.987 124.687 253.409 106.837C241.813 88.9578 268.013 52.7401 244.468 33.0267C220.922 13.3133 184.201 0.935078 124.085 0.0181746Z"
        fill={color}
      />
    </Svg>
  );
};

export const SuccessBackground = memo(SuccessBackgroundComponent);

SuccessBackground.displayName = 'SuccessBackground';
