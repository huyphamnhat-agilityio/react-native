import { memo, useCallback } from 'react';
import { useShallow } from 'zustand/shallow';
import { Alert, StyleSheet } from 'react-native';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Components
import { Text } from 'src/components/common';
import { AuthHeader, RegisterForm } from 'src/components';

// Themes
import { borderRadius, colors } from 'src/themes';

// Types & Interfaces
import {
  AuthStacksScreenProps,
  RegisterFormData,
  UserPayload,
} from 'src/interfaces';

// Hooks
import { useCreateCart, useCreateFavorites, useRegister } from 'src/hooks';

// Store
import { useUserStore } from 'src/store';

// Constants
import { PLACEHOLDER_AVATAR_URL } from 'src/constants';

const RegisterScreen = memo(
  ({ navigation }: AuthStacksScreenProps<'Register'>) => {
    const { mutateAsync: registerUser } = useRegister();

    const { mutate: createCart } = useCreateCart();
    const { mutate: createFavorites } = useCreateFavorites();

    const { setUser, setAccessToken } = useUserStore(
      useShallow(state => ({
        setUser: state.setUser,
        setAccessToken: state.setAccessToken,
      })),
    );

    const handleSubmit = useCallback(
      async (data: RegisterFormData) => {
        const payload: UserPayload = {
          ...data,
          shippingAddress: [],
          avatar: PLACEHOLDER_AVATAR_URL,
        };
        await registerUser(payload, {
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

            createCart(id, {
              onError: error => {
                recordError(getCrashlytics(), error);
                Alert.alert(
                  'Create Cart Failed',
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

            createFavorites(id, {
              onError: error => {
                recordError(getCrashlytics(), error);
                Alert.alert(
                  'Create Favorites Failed',
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
          onError: error => {
            recordError(getCrashlytics(), error);
            Alert.alert(
              'Sign Up Failed',
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
      [createCart, createFavorites, registerUser, setAccessToken, setUser],
    );
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <AuthHeader>
          <Text
            font="MerriweatherBold"
            size="lg"
            textVariant="secondary"
            style={styles.title}
          >
            WELCOME
          </Text>
        </AuthHeader>

        <RegisterForm navigation={navigation} onSubmit={handleSubmit} />
      </KeyboardAwareScrollView>
    );
  },
);

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

RegisterScreen.displayName = 'RegisterScreen';

export default RegisterScreen;
