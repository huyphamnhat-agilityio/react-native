import { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Themes
import { background } from "@/themes";

// Components
import { Button, Text } from "@/components/common";

// Store
import { useUserStore } from "@/store";

// Utils
import { generateDeliveryInfo, isFulfilledObject } from "@/utils";

export type NewAddressButtonProps = {
  onPress?: () => void;
};
const NewAddressButton = memo(({ onPress }: NewAddressButtonProps) => {
  const userAddress = useUserStore((state) => state.user?.address);

  const buttonText = useMemo(() => {
    return isFulfilledObject(userAddress)
      ? generateDeliveryInfo(userAddress!)
      : "+ Add New Address";
  }, [userAddress]);

  return isFulfilledObject(userAddress) ? (
    <View style={styles.editAddressWrapper}>
      <Text
        numberOfLines={2}
        textVariant="quaternary"
        style={styles.deliveryText}
      >
        {buttonText}
      </Text>

      <Button
        title="Change"
        titleSize={3}
        rounded="full"
        style={styles.button}
        onPress={onPress}
      />
    </View>
  ) : (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.addNewAddressWrapper}
      onPress={onPress}
    >
      <Text textVariant="quaternary" style={styles.textCentered}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  addNewAddressWrapper: {
    backgroundColor: background.white,
    paddingVertical: 16,
  },
  editAddressWrapper: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: background.white,
    flexDirection: "row",
    gap: 20,
  },
  deliveryText: {
    flex: 3 / 4,
  },
  button: {
    flex: 1 / 4,
  },
  textCentered: {
    textAlign: "center",
  },
});

NewAddressButton.displayName = "NewAddressButton";
export default NewAddressButton;
