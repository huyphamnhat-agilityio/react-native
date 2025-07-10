import { colors } from "@/themes";
import Svg, { G, Mask, Path, Rect, SvgProps } from "react-native-svg";

const LocationIcon = ({
  width = 16,
  height = 16,
  fill = colors.white,
  ...props
}: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <Mask
        id="mask0_0_1618"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={width}
        height={height}
      >
        <Rect width={width} height={height} fill="white" />
      </Mask>
      <G mask="url(#mask0_0_1618)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.6665 6.3335C2.6665 3.57206 4.90507 1.3335 7.6665 1.3335C10.4279 1.3335 12.6665 3.57206 12.6665 6.3335C12.6665 8.34946 11.9642 8.91243 8.18036 14.3978C7.93205 14.7565 7.40093 14.7565 7.15265 14.3978C3.36885 8.91243 2.6665 8.34946 2.6665 6.3335ZM9.74984 6.3335C9.74984 5.1829 8.8171 4.25016 7.6665 4.25016C6.5159 4.25016 5.58317 5.1829 5.58317 6.3335C5.58317 7.48409 6.5159 8.41683 7.6665 8.41683C8.8171 8.41683 9.74984 7.48409 9.74984 6.3335Z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};

export default LocationIcon;
