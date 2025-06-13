import {memo, useCallback} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert, StyleSheet, View} from 'react-native';
import {useShallow} from 'zustand/shallow';
import {
  getCrashlytics,
  recordError,
  crash,
} from '@react-native-firebase/crashlytics';

// Icons
import {LogoIcon} from 'src/components/icons';

// Components
import {Button, Text} from 'src/components/common';
import {LoginForm} from 'src/components';

// Themes
import {borderRadius, colors} from 'src/themes';

// Hooks
import {useLogin} from 'src/hooks';

// Types & Interfaces
import {AppStackScreenProps, LoginFormData} from 'src/interfaces';

// Store
import {useUserStore} from 'src/store';

const LoginScreen = memo(({navigation}: AppStackScreenProps<'Login'>) => {
  const {mutateAsync: login} = useLogin();

  const {setUser, setAccessToken} = useUserStore(
    useShallow(state => ({
      setUser: state.setUser,
      setAccessToken: state.setAccessToken,
    })),
  );

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      await login(data, {
        onSuccess: response => {
          const {
            user: {id, email, name, shippingAddress, avatar},
            accessToken,
          } = response;

          setUser({
            id,
            email,
            name,
            shippingAddress,
            avatar,
          });

          setAccessToken(accessToken);
        },
        onError: error => {
          recordError(getCrashlytics(), error);
          Alert.alert(
            'Login Failed',
            error.message,
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: true},
          );
        },
      });
    },
    [login, setAccessToken, setUser],
  );
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
          <Button title="Test crash" onPress={() => crash(getCrashlytics())} />
        </Text>
        <LoginForm navigation={navigation} onSubmit={handleSubmit} />
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
    borderRadius: borderRadius.tiny,
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
