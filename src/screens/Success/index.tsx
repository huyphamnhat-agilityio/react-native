import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

// Components
import {Button, Text} from 'src/components/common';

// Icons
import {
  CheckMarkIcon,
  SuccessBackground,
  SuccessImage,
} from 'src/components/icons';
import {StackNavigation} from 'src/interfaces';

// Themes
import {colors} from 'src/themes';

export interface SuccessScreenProps {
  navigation: StackNavigation;
}
const SuccessScreen = ({navigation: {goBack}}: SuccessScreenProps) => {
  const handleGoBackPress = useCallback(() => goBack(), [goBack]);

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        font="MerriweatherBold"
        size="xxl"
        textVariant="secondary">
        SUCCESS!
      </Text>

      <View style={styles.logoWrapper}>
        <SuccessBackground />
        <SuccessImage style={styles.logo} />
        <CheckMarkIcon style={styles.checkMark} />
      </View>

      <Text
        style={styles.message}
        font="NuniToSansNormal"
        size="base"
        textVariant="tertiary">
        Your order will be delivered soon. Thank you for choosing our app!
      </Text>

      <View style={styles.buttonWrapper}>
        <Button
          style={[styles.button, styles.shadow]}
          width="100%"
          title="Track your orders"
          titleFont="NunitoSansSemiBold"
          titleSize="base"
          rounded="md"
        />
        <Button
          style={styles.button}
          onPress={handleGoBackPress}
          width="100%"
          title="BACK TO HOME"
          titleFont="NunitoSansSemiBold"
          titleSize="base"
          bgVariant="outline"
          textVariant="outline"
          rounded="md"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  logoWrapper: {
    marginTop: 30,
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
  message: {
    textAlign: 'center',
    marginTop: 50,
    marginHorizontal: 47,
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 40,
    gap: 25,
  },
  button: {
    paddingVertical: 18,
  },
  shadow: {
    elevation: 10,
    shadowColor: colors.shadow.primary,
    zIndex: 99,
  },
});

export default SuccessScreen;
