import React, { useCallback } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useShallow } from "zustand/shallow";

// Components
import { Text } from "@/components/common";
import { LoginForm } from "@/components/ui/login";

// Themes
import { background } from "@/themes";

// Hooks
import { useLogin } from "@/hooks";

// Stores
import { useUserStore } from "@/store";
import { LoginFormData } from "@/interfaces";

const Login = () => {
  const { mutateAsync: login } = useLogin();

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
        <Text size={6} textVariant="white" style={styles.text}>
          Welcome to tradly
        </Text>

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
