import { RelativePathString, useRouter } from "expo-router";
import { Fragment, memo, useCallback } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";

// Components
import { Text } from "@/components/common";

// Themes
import { background, borderRadius, colors } from "@/themes";

// Constants
import {
  fadeInDown400,
  SETTINGS_OPTIONS,
  TABLET_DEVICE_WIDTH,
} from "@/constants";

// Store
import { useScreenDimensions, useUserStore } from "@/store";

export type SettingMenuProps = {
  style?: StyleProp<ViewStyle>;
};

const SettingMenu = memo(({ style }: SettingMenuProps) => {
  const { navigate } = useRouter();

  const { screenWidth } = useScreenDimensions();

  const clearUserSession = useUserStore((state) => state.clearUserSession);

  const handleNavigate = useCallback(
    (destination: RelativePathString) => {
      if (!destination) return;
      navigate(destination);
    },
    [navigate],
  );

  const handleLogout = useCallback(
    () => clearUserSession(),
    [clearUserSession],
  );

  return (
    <Animated.View entering={fadeInDown400} style={style}>
      <View style={styles.settingsWrapper}>
        {SETTINGS_OPTIONS.map((item, index) => (
          <Fragment key={item.id}>
            <TouchableOpacity
              onPress={() =>
                item.title === "Logout"
                  ? handleLogout()
                  : handleNavigate(item.destination as RelativePathString)
              }
            >
              <Text
                textVariant={item.title === "Logout" ? "primary" : "quaternary"}
                size={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            {index !== SETTINGS_OPTIONS.length - 1 && (
              <View style={styles.separator} />
            )}
          </Fragment>
        ))}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  settingsWrapper: {
    marginTop: 28,
    backgroundColor: background.white,
    borderRadius: borderRadius[2],
    shadowColor: background.backdrop,
    elevation: 40,
    padding: 20,
    gap: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.gray_50,
  },
});
SettingMenu.displayName = "SettingMenu";
export default SettingMenu;
