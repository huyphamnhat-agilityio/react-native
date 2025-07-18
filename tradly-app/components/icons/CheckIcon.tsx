import Svg, {
  G,
  Path,
  SvgProps,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
import { colors } from "@/themes";

const CheckIcon = ({
  width = 20,
  height = 20,
  fill = colors.green_100,
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
      <G clipPath="url(#clip0_0_2171)">
        <Path
          d="M9.55371 18.3105C14.3897 18.3104 18.3105 14.3888 18.3105 9.55273C18.3104 4.7168 14.3896 0.796068 9.55371 0.795898C4.71763 0.795898 0.796068 4.7167 0.795898 9.55273C0.795898 14.3889 4.71753 18.3105 9.55371 18.3105Z"
          fill="url(#paint0_linear_0_2171)"
          stroke="white"
          strokeWidth="1.59223"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.0818 6.3623C14.4258 6.70443 14.4258 7.25877 14.0818 7.59991L8.78684 12.8498C8.44284 13.192 7.88384 13.192 7.53984 12.8498L4.59784 9.93333C4.25384 9.59219 4.25384 9.03784 4.59784 8.69571C4.94284 8.35458 5.50184 8.35458 5.84584 8.69571L8.16384 10.9944L12.8338 6.3623C13.1778 6.02116 13.7368 6.02116 14.0818 6.3623Z"
          fill="white"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_0_2171"
          x1="28.6602"
          y1="-0.000350952"
          x2="28.6602"
          y2="19.1064"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={fill} />
          <Stop offset="1" stopColor={fill} />
        </LinearGradient>
        <ClipPath id="clip0_0_2171">
          <Rect width="19.1068" height="19.1068" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CheckIcon;
