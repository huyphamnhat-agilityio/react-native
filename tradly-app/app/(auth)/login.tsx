import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

// Components
import { Text } from "@/components/common";
import { LoginForm } from "@/components/ui/login";

// Themes
import { background } from "@/themes";

const Login = () => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contentWrapper}>
        <Text
          font="Montserrat_500Medium"
          size={6}
          textVariant="white"
          style={styles.text}
        >
          Welcome to tradly
        </Text>

        <LoginForm onSubmit={() => {}} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
