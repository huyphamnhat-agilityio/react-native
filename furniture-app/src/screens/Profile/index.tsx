import {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';

// Components
import {Text} from 'src/components/common';
import {SettingMenu} from 'src/components';

// Themes
import {colors} from 'src/themes';
import {useUserStore} from 'src/store';
import {useShallow} from 'zustand/shallow';

const ProfileScreen = memo(() => {
  const {name = '', email = ''} = useUserStore(
    useShallow(state => ({
      name: state.user?.name,
      email: state.user?.email,
    })),
  );
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require('assets/images/user-avatar.png')}
          width={80}
          height={80}
          borderRadius={9999}
        />
        <View style={styles.content}>
          <Text font="NunitoSansBold" size="md" textVariant="secondary">
            {name}
          </Text>
          <Text font="NunitoSansNormal" size="xs" textVariant="quaternary">
            {email}
          </Text>
        </View>
      </View>

      <SettingMenu style={styles.menu} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
  },
  wrapper: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    gap: 5,
  },
  menu: {
    backgroundColor: colors.white,
    marginTop: 30,
  },
});

ProfileScreen.displayName = 'ProfileScreen';

export default ProfileScreen;
