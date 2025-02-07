import {memo} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StyleSheet, View} from 'react-native';

// Icons
import {LogoIcon} from 'src/components/icons';

// Components
import {Text} from 'src/components/common';
import {LoginForm} from 'src/components';

// Themes
import {colors} from 'src/themes';

const LoginScreen = memo(() => {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.logo}>
        <View style={styles.stroke} />
        <LogoIcon />
        <View style={styles.stroke} />
      </View>
      <View style={styles.wrapper}>
        <Text
          font="MerriweatherNormal"
          size="xl"
          textVariant="alternative"
          style={styles.title}>
          Hello ! {'\n'}
          <Text font="MerriweatherBold" size="lg" textVariant="secondary">
            WELCOME BACK
          </Text>
        </Text>
        <LoginForm />
      </View>
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    gap: 20,
  },
  logo: {
    marginTop: 20,
    paddingHorizontal: 30,
    height: 64,
    gap: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stroke: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
    borderRadius: 2,
  },
  wrapper: {
    gap: 20,
  },
  title: {
    lineHeight: 45,
    paddingLeft: 30,
  },
});

LoginScreen.displayName = 'LoginScreen';

export default LoginScreen;
