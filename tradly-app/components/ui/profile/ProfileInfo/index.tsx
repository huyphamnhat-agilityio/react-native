import { Image } from "expo-image";
import { memo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

// Components
import { Text } from "@/components/common";

// Themes
import { border, borderRadius } from "@/themes";

// Types
import { User } from "@/interfaces";

export type ProfileInfoProps = {
  style?: StyleProp<ViewStyle>;
  data?: Partial<User>;
};

const ProfileInfo = memo(({ style, data }: ProfileInfoProps) => {
  const { avatar = "", email = "", name = "", phone = "" } = data || {};
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.profileWrapper}>
        <Image source={{ uri: avatar }} style={styles.avatar} />

        <View style={styles.profileInfoWrapper}>
          <Text textVariant="white" font="Montserrat_700Bold">
            {name}
          </Text>
          <Text textVariant="white" size={3}>
            {phone}
          </Text>
          <Text textVariant="white" size={3}>
            {email}
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
