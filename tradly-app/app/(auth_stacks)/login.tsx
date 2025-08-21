import React, { useCallback } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useShallow } from "zustand/shallow";
import Animated from "react-native-reanimated";

// Components
import { Text } from "@/components/common";
import { LoginForm } from "@/components/ui/login";

// Themes
import { background } from "@/themes";

// Hooks
import { useLogin } from "@/hooks";

// Stores
import { useScreenDimensions, useUserStore } from "@/store";

// Types
import { LoginFormData } from "@/interfaces";

// Constants
import { fadeIn500, TABLET_DEVICE_WIDTH } from "@/constants";

const Login = () => {
  const { mutateAsync: login } = useLogin();

  const { screenWidth } = useScreenDimensions();

  const { setUser, setAccessToken } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setAccessToken: state.setAccessToken,
    })),
  );

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      await login(data, {
        onSuccess: (response) => {
          const {
            user: { id, email, name, avatar, address, cards, phone },
            accessToken,
          } = response;

          setUser({
            id,
            email,
            name,
            avatar,
            address,
            cards,
            phone,
          });

          setAccessToken(accessToken);
        },
        onError: (error) => {
          Alert.alert(
            "Login Failed",
            error.message,
            [
              {
                text: "Ok",
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
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contentWrapper}>
        <Animated.View entering={fadeIn500}>
          <Text
            size={screenWidth >= TABLET_DEVICE_WIDTH ? 7 : 6}
            textVariant="white"
            style={styles.text}
          >
            Welcome to tradly
          </Text>
        </Animated.View>

        <LoginForm onSubmit={handleSubmit} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: background.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  contentWrapper: {
    display: "flex",
    gap: 60,
  },
});

export default Login;
