import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// Themes
import { background } from "@/themes";

// Components
import { Text } from "@/components/common";

export type NewAddressButtonProps = {
  onPress?: () => void;
};
const NewAddressButton = memo(({ onPress }: NewAddressButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.addNewAddressWrapper}
      onPress={onPress}
    >
      <Text size={3.5} textVariant="quaternary" style={styles.textCentered}>
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
