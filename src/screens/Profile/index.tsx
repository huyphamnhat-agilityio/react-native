import {Image, StyleSheet, View} from 'react-native';

// Components
import {Text} from 'src/components/common';

// Themes
import {colors} from 'src/themes';

const ProfileScreen = () => {
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
            Bruno Pham
          </Text>
          <Text font="NuniToSansNormal" size="xs" textVariant="quaternary">
            bruno203@gmail.com
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  content: {
    gap: 5,
  },
});

export default ProfileScreen;
