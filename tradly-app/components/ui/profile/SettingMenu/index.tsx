import { RelativePathString, useRouter } from "expo-router";
import { Fragment, memo, useCallback } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Components
import { Text } from "@/components/common";

// Themes
import { background, borderRadius, colors } from "@/themes";

// Constants
import { SETTINGS_OPTIONS } from "@/constants";

// Store
import { useUserStore } from "@/store";

export type SettingMenuProps = {
  style?: StyleProp<ViewStyle>;
};

const SettingMenu = memo(({ style }: SettingMenuProps) => {
  const { navigate } = useRouter();

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
    <View style={style}>
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
    </View>
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
