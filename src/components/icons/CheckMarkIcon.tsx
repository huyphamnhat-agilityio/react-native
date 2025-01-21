import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const CheckMarkIconComponent = ({
  width = 50,
  height = 50,
  color = '#27ae60',
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.16748 25.001C4.16748 13.4948 13.4946 4.16769 25.0008 4.16769C36.5071 4.16769 45.8341 13.4948 45.8341 25.001C45.8341 36.5052 36.5071 45.8344 25.0008 45.8344C13.4946 45.8344 4.16748 36.5052 4.16748 25.001ZM24.3335 33.1113L35.4993 19.612C36.3182 18.6243 36.1104 17.2136 35.0374 16.4599C33.9594 15.7062 32.4268 15.8997 31.6103 16.8874L22.3608 28.067L18.3692 23.3738C17.5381 22.3928 15.9982 22.2219 14.9373 22.9891C13.874 23.754 13.6882 25.1692 14.5193 26.1456L20.464 33.136C20.9284 33.6805 21.6373 34 22.3877 34H22.4048C23.1626 33.9955 23.8739 33.667 24.3335 33.1113Z"
        fill={color}
      />
    </Svg>
  );
};

export const CheckMarkIcon = memo(CheckMarkIconComponent);

CheckMarkIcon.displayName = 'CheckMarkIcon';
