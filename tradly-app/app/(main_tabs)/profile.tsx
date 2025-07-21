import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

// Themes
import { background, border, borderRadius } from "@/themes";

// Components
import { Text } from "@/components/common";
import { SettingMenu } from "@/components/ui/profile";

// Store
import { useUserStore } from "@/store";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <View style={styles.wrapper}>
        <View style={styles.profileWrapper}>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />

          <View style={styles.profileInfoWrapper}>
            <Text textVariant="white" font="Montserrat_700Bold">
              {user?.name}
            </Text>
            <Text textVariant="white" size={3}>
              {user?.phone}
            </Text>
            <Text textVariant="white" size={3}>
              {user?.email}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsWrapper}>
        <SettingMenu />
      </View>
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
  wrapper: {
    padding: 20,
    gap: 28,
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: border.white,
    width: 64,
    height: 64,
  },
  profileInfoWrapper: {
    gap: 6,
  },
  settingsWrapper: {
    paddingHorizontal: 20,
  },
});
export default Profile;
