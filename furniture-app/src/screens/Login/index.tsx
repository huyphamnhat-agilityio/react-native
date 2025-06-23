import { memo, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useShallow } from 'zustand/shallow';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Components
import { AuthHeader, LoginForm } from 'src/components';

// Themes
import { colors } from 'src/themes';

// Hooks
import { useLogin } from 'src/hooks';

// Types & Interfaces
import { AuthStacksScreenProps, LoginFormData } from 'src/interfaces';

// Store
import { useUserStore } from 'src/store';
import { Text } from 'src/components/common';

const LoginScreen = memo(({ navigation }: AuthStacksScreenProps<'Login'>) => {
  const { mutateAsync: login } = useLogin();

  const { setUser, setAccessToken } = useUserStore(
    useShallow(state => ({
      setUser: state.setUser,
      setAccessToken: state.setAccessToken,
    })),
  );

  // ✅ Keep your side effects exactly as-is
  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      await login(data, {
        onSuccess: response => {
          const {
            user: { id, email, name, shippingAddress, avatar },
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
            { cancelable: true },
          );
        },
      });
    },
    [login, setAccessToken, setUser],
  );

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader>
        <Text
          font="MerriweatherNormal"
          size="xl"
          textVariant="alternative"
          style={styles.title}
        >
          Hello ! {'\n'}
          <Text font="MerriweatherBold" size="lg" textVariant="secondary">
            WELCOME BACK
          </Text>
        </Text>
      </AuthHeader>

      <View style={styles.wrapper}>
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
