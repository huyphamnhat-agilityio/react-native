import { colors } from "@/themes";
import { memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export type CheckboxProps = {
  active?: boolean;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  onPress?: () => void;
};

const Checkbox = memo(
  ({
    active = false,
    size = 20,
    activeColor = colors.green_100,
    inactiveColor = colors.gray_50,
    onPress,
  }: CheckboxProps) => {
    const innerSize = size / 2;

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View
          style={[
            styles.outerCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderColor: active ? activeColor : inactiveColor,
            },
          ]}
        >
          {active && (
            <View
              style={[
                styles.innerCircle,
                {
                  width: innerSize,
                  height: innerSize,
                  borderRadius: innerSize / 2,
                  backgroundColor: activeColor,
                },
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  outerCircle: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {},
});

Checkbox.displayName = "Checkbox";
export default Checkbox;
