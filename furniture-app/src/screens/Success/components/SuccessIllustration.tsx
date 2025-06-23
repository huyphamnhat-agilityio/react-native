import { StyleSheet, View } from 'react-native';
import {
  CheckMarkIcon,
  SuccessBackground,
  SuccessImage,
} from 'src/components/icons';
import { MEDIUM_DEVICE_HEIGHT } from 'src/constants';

const SuccessIllustration = () => {
  return (
    <View style={styles.illustrationSection}>
      <View style={styles.logoWrapper}>
        <SuccessBackground />
        <SuccessImage style={styles.logo} />
        <CheckMarkIcon style={styles.checkMark} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  illustrationSection: {
    alignItems: 'center',
    marginBottom: MEDIUM_DEVICE_HEIGHT ? 50 : 25,
  },
  logoWrapper: {
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    top: 24,
    left: 35,
  },
  checkMark: {
    position: 'absolute',
    bottom: -25,
    left: 111,
  },
});

export default SuccessIllustration;
