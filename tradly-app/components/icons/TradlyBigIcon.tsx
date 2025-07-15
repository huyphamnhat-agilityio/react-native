import { colors } from "@/themes";
import Svg, { Path, SvgProps } from "react-native-svg";

const TradlyBigIcon = ({
  width = 34,
  height = 34,
  fill = colors.green_200,
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      {...props}
    >
      <Path
        d="M33 17C33 8.16344 25.8366 1 17 1C8.16344 1 1 8.16344 1 17C1 25.8366 8.16344 33 17 33C25.8366 33 33 25.8366 33 17Z"
        fill={fill}
        stroke="white"
      />
      <Path
        d="M10.6001 11.2629V9H23.4001V11.2629H18.4008V23.4H15.5994V11.2629H10.6001Z"
        fill="white"
      />
    </Svg>
  );
};

export default TradlyBigIcon;
