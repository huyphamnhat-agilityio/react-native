import { memo, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useShallow } from 'zustand/shallow';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Components
import { LoginHeader } from './components';
import { LoginForm } from 'src/components';

// Themes
import { colors } from 'src/themes';

// Hooks
import { useLogin } from 'src/hooks';

// Types & Interfaces
import { AuthStacksScreenProps, LoginFormData } from 'src/interfaces';

// Store
import { useUserStore } from 'src/store';

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
      <LoginHeader />
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
});

LoginScreen.displayName = 'LoginScreen';

export default LoginScreen;
