import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// Themes
import { background } from "@/themes";

// Components
import { Text } from "@/components/common";

const NewAddressButton = memo(() => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.addNewAddressWrapper}>
      <Text
        font="Montserrat_500Medium"
        size={3.5}
        textVariant="quaternary"
        style={styles.textCentered}
      >
        + Add New Address
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  addNewAddressWrapper: {
    backgroundColor: background.white,
    paddingVertical: 16,
  },
  textCentered: {
    textAlign: "center",
  },
});

NewAddressButton.displayName = "NewAddressButton";
export default NewAddressButton;
