import { colors } from "@/themes";
import Svg, {
  ClipPath,
  Defs,
  G,
  Mask,
  Path,
  Rect,
  SvgProps,
} from "react-native-svg";

const ProfileIcon = ({
  width = 24,
  height = 24,
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
      <G clipPath="url(#clip0_0_3278)">
        <Mask
          id="mask0_0_3278"
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
        <G Mask="url(#mask0_0_3278)">
          <Mask
            id="mask1_0_3278"
            style={{
              maskType: "luminance",
            }}
            maskUnits="userSpaceOnUse"
            x="2"
            y="-2"
            width="22"
            height="29"
          >
            <Rect x="2" y="-2" width="22" height="29" fill="white" />
          </Mask>
          <G mask="url(#mask1_0_3278)">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.625 8.625C18.625 5.51953 16.1055 3 13 3C9.89453 3 7.375 5.51953 7.375 8.625C7.375 11.7305 9.89453 14.25 13 14.25C16.1055 14.25 18.625 11.7305 18.625 8.625ZM15.8477 15.5C14.9805 15.8984 14.0156 16.125 13 16.125C11.9844 16.125 11.0234 15.8984 10.1523 15.5H8C5.23828 15.5 3 17.7383 3 20.5V21.125C3 22.1602 3.83984 23 4.875 23H21.125C22.1602 23 23 22.1602 23 21.125V20.5C23 17.7383 20.7617 15.5 18 15.5H15.8477Z"
              fill={fill}
            />
          </G>
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_0_3278">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ProfileIcon;
