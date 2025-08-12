import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// Themes
import { background } from "@/themes";

// Components
import { ProfileInfo, SettingMenu } from "@/components/ui/profile";

// Stores
import { useUserStore } from "@/store";

const Profile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <View style={styles.background} />

      <ProfileInfo data={user} />

      <SettingMenu style={styles.settingsWrapper} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.secondary,
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "40%",
    backgroundColor: background.primary,
  },

  settingsWrapper: {
    paddingHorizontal: 20,
  },
});
export default Profile;
