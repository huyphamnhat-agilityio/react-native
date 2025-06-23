import { memo, useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

// Components
import { Text } from 'src/components/common';
import { SuccessActions, SuccessIllustration } from './components';

// Constants
import { MEDIUM_DEVICE_HEIGHT, SCREENS } from 'src/constants';

// Types & Interfaces
import { MainStacksScreenProps } from 'src/interfaces';

// Themes
import { colors } from 'src/themes';

const height = Dimensions.get('window').height;

const SuccessScreen = memo(
  ({ navigation: { reset } }: MainStacksScreenProps<'Success'>) => {
    const handleGoBackPress = useCallback(
      () =>
        reset({
          index: 0,
          routes: [{ name: SCREENS.MAIN.HOME_TABS }],
        }),
      [reset],
    );

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.headerSection}>
            <Text
              style={styles.title}
              font="MerriweatherBold"
              size="xxl"
              textVariant="secondary"
            >
              SUCCESS!
            </Text>
          </View>

          <SuccessIllustration />

          <View style={styles.messageSection}>
            <Text
              style={styles.message}
              font="NunitoSansNormal"
              size="base"
              textVariant="tertiary"
            >
              Your order will be delivered soon. Thank you for choosing our app!
            </Text>
          </View>

          <SuccessActions onGoBack={handleGoBackPress} />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: height >= MEDIUM_DEVICE_HEIGHT ? 30 : 0,
  },
  title: {
    textAlign: 'center',
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: height >= MEDIUM_DEVICE_HEIGHT ? 40 : 20,
    paddingHorizontal: 17,
  },
  message: {
    textAlign: 'center',
  },
});

SuccessScreen.displayName = 'SuccessScreen';
export default SuccessScreen;
