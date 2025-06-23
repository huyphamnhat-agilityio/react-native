import { Pressable, StyleSheet, View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';

// Components
import { Text } from 'src/components/common';
import { useUserStore } from 'src/store';
import { useShallow } from 'zustand/react/shallow';
import { PLACEHOLDER_AVATAR_URL } from 'src/constants';
import { borderRadius } from 'src/themes';

export type ProfileInformationProps = {
  onPress?: () => void;
};
const ProfileInformation = ({ onPress }: ProfileInformationProps) => {
  const { avatar, name, email } = useUserStore(
    useShallow(state => ({
      avatar: state.user?.avatar ?? PLACEHOLDER_AVATAR_URL,
      name: state.user?.name ?? '',
      email: state.user?.email ?? '',
    })),
  );
  return (
    <View style={styles.wrapper}>
      <View>
        <Pressable onPress={onPress}>
          <FastImage
            source={{
              uri: avatar,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text font="NunitoSansBold" size="md" textVariant="secondary">
          {name}
        </Text>
        <Text font="NunitoSansNormal" size="xs" textVariant="quaternary">
          {email}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  content: {
    gap: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
  },
});
export default ProfileInformation;
