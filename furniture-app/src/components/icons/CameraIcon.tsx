import Svg, {Path, SvgProps} from 'react-native-svg';
import {colors} from 'src/themes';

export const CameraIcon = ({
  width = 24,
  height = 24,
  color = colors.black,
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 -2 32 32">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M28 4h-3l-1-2c-.589-1.163-.896-2-2-2H10C8.896 0 8.53.954 8 2L7 4H4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4ZM16 24a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm0-14a6 6 0 0 0 0 12 6 6 0 0 0 0-12Z"
    />
  </Svg>
);
