import { Image } from "expo-image";
import { memo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

// Components
import { Text } from "@/components/common";

// Themes
import { border, borderRadius } from "@/themes";

// Store
import { useUserStore } from "@/store";

export type ProfileInfoProps = {
  style?: StyleProp<ViewStyle>;
};

const ProfileInfo = memo(({ style }: ProfileInfoProps) => {
  const user = useUserStore((state) => state.user);

  return (
    <View style={[styles.wrapper, style]}>
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
  );
});

const styles = StyleSheet.create({
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
});

ProfileInfo.displayName = "ProfileInfo";
export default ProfileInfo;
