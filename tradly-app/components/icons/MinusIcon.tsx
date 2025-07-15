import { colors } from "@/themes";
import Svg, { Rect, SvgProps } from "react-native-svg";

const MinusIcon = ({
  width = 14,
  height = 2,
  color = colors.black,
  ...props
}: SvgProps) => {
  return (
    <Svg width={width} height={height} fill="none" {...props}>
      <Rect width={14} height={2} fill={color} rx={1} />
    </Svg>
  );
};

export default MinusIcon;
