import { Image } from "expo-image";
import { memo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

// Components
import { Text } from "@/components/common";

// Themes
import { border, borderRadius } from "@/themes";

// Types
import { User } from "@/interfaces";

// Constants
import {
  fadeIn400,
  fadeInLeft400,
  fadeInRight400,
  fadeInUp400,
} from "@/constants";

export type ProfileInfoProps = {
  style?: StyleProp<ViewStyle>;
  data?: Partial<User>;
};

const ProfileInfo = memo(({ style, data }: ProfileInfoProps) => {
  const { avatar = "", email = "", name = "", phone = "" } = data || {};
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.profileWrapper}>
        <Animated.View entering={fadeIn400}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </Animated.View>

        <View style={styles.profileInfoWrapper}>
          <Animated.View entering={fadeInUp400}>
            <Text textVariant="white" font="Montserrat_700Bold">
              {name}
            </Text>
          </Animated.View>
          <Animated.View entering={fadeInLeft400}>
            <Text textVariant="white" size={3}>
              {phone}
            </Text>
          </Animated.View>

          <Animated.View entering={fadeInRight400}>
            <Text textVariant="white" size={3}>
              {email}
            </Text>
          </Animated.View>
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
