import { StyleSheet, View } from "react-native";

// Themes
import { background } from "@/themes";

// Components
import { ProfileInfo, SettingMenu } from "@/components/ui/profile";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <ProfileInfo />

      <SettingMenu style={styles.settingsWrapper} />
    </View>
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
