import {StyleSheet, View} from 'react-native';
import {Text} from 'src/components/common';

// Themes
import {colors} from 'src/themes';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default ProfileScreen;
