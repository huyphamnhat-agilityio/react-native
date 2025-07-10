import { colors } from "@/themes";
import Svg, { G, Mask, Path, SvgProps, Rect } from "react-native-svg";
const SearchIcon = ({
  width = 24,
  height = 24,
  fill = colors.green_100,
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
        id="mask0_0_4363"
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
      <G mask="url(#mask0_0_4363)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 11.1111C3 6.63147 6.63147 3 11.1111 3C15.5908 3 19.2222 6.63147 19.2222 11.1111C19.2222 15.5908 15.5908 19.2222 11.1111 19.2222C6.63147 19.2222 3 15.5908 3 11.1111ZM17.2222 11.1111C17.2222 7.73604 14.4862 5 11.1111 5C7.73604 5 5 7.73604 5 11.1111C5 14.4862 7.73604 17.2222 11.1111 17.2222C14.4862 17.2222 17.2222 14.4862 17.2222 11.1111Z"
          fill={fill}
        />
        <Path
          d="M20.7071 20.7071C20.3165 21.0976 19.6834 21.0976 19.2929 20.7071L15.4262 16.8404C15.0357 16.4499 15.0357 15.8167 15.4262 15.4262C15.8167 15.0357 16.4499 15.0357 16.8404 15.4262L20.7071 19.2929C21.0976 19.6834 21.0976 20.3165 20.7071 20.7071Z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};

export default SearchIcon;
