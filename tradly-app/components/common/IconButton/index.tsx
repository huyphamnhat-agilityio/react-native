import { memo } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

// Themes
import { colors } from "@/themes";

// Component
import Text from "../Text";

// Types
import { FontFamily, FontSize, TextVariant } from "@/interfaces";

export type IconButtonProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
  label?: string;
  onPress?: () => void;
  labelFont?: FontFamily;
  labelSize?: FontSize;
  labelVariant?: TextVariant;
} & TouchableOpacityProps;

const IconButton = memo(
  ({
    icon,
    iconSize = 24,
    label = "",
    onPress,
    labelFont = "Montserrat_500Medium",
    labelSize = 3.5,
    labelVariant = "white",
    disabled,
    ...rest
  }: IconButtonProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.iconButton,
          {
            opacity: disabled ? 0.7 : 1,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
        {...rest}
      >
        <MaterialIcons name={icon} size={iconSize} color={colors.white} />
        <Text
          font={labelFont}
          size={labelSize}
          textVariant={labelVariant}
          style={styles.iconButtonLabel}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});

IconButton.displayName = "IconButton";

export default IconButton;
