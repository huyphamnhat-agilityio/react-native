import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

// Components
import { Button, Input } from "@/components/common";

// Themes
import { background, colors } from "@/themes";

const Address = () => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>
        <Input
          label="Name"
          labelVariant="secondary"
          labelSize={3.5}
          labelFont="Montserrat_400Regular"
          labelDistance={8}
          inputSize={4}
          inputVariant="quaternary"
          style={styles.textInput}
        />

        <Input
          label="Phone"
          labelVariant="secondary"
          labelSize={3.5}
          labelFont="Montserrat_400Regular"
          labelDistance={8}
          inputSize={4}
          inputMode="tel"
          inputVariant="quaternary"
          style={styles.textInput}
        />

        <Input
          label="Street address"
          labelVariant="secondary"
          labelSize={3.5}
          labelFont="Montserrat_400Regular"
          labelDistance={8}
          inputSize={4}
          inputVariant="quaternary"
          style={styles.textInput}
        />

        <Input
          label="City"
          labelVariant="secondary"
          labelSize={3.5}
          labelFont="Montserrat_400Regular"
          labelDistance={8}
          inputSize={4}
          inputVariant="quaternary"
          style={styles.textInput}
        />

        <Input
          label="State"
          labelVariant="secondary"
          labelSize={3.5}
          labelFont="Montserrat_400Regular"
          labelDistance={8}
          inputSize={4}
          inputVariant="quaternary"
          style={styles.textInput}
        />

        <Input
          label="Zipcode"
          labelVariant="secondary"
          labelSize={3.5}
          labelFont="Montserrat_400Regular"
          labelDistance={8}
          inputSize={4}
          inputVariant="quaternary"
          inputMode="numeric"
          style={styles.textInput}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Save"
          titleFont="Montserrat_600SemiBold"
          titleSize={4.5}
          style={styles.button}
          rounded="full"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: background.white,
    justifyContent: "space-between",
    paddingBottom: "10%",
  },
  formWrapper: {
    padding: 20,
    gap: 16,
  },
  textInput: {
    width: "100%",
    borderBottomColor: colors.gray_50,
    borderBottomWidth: 0.5,
  },
  buttonWrapper: {
    paddingHorizontal: 32,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
  },
});

export default Address;
