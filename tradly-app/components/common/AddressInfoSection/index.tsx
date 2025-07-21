import { useRouter } from "expo-router";
import { memo, useCallback, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Themes
import { background } from "@/themes";

// Components
import Text from "../Text";
import Button from "../Button";

// Store
import { useUserStore } from "@/store";

// Utils
import { generateDeliveryInfo, isFulfilledObject } from "@/utils";

export type AddressInfoSectionProps = {
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};
const AddressInfoSection = memo(
  ({ style, disabled }: AddressInfoSectionProps) => {
    const userAddress = useUserStore((state) => state.user?.address);

    const { navigate } = useRouter();

    const handleNavigateToAddress = useCallback(() => {
      navigate("/(main_stacks)/address");
    }, [navigate]);

    const buttonText = useMemo(() => {
      return isFulfilledObject(userAddress)
        ? generateDeliveryInfo(userAddress!)
        : "+ Add New Address";
    }, [userAddress]);

    return isFulfilledObject(userAddress) ? (
      <View style={[styles.editAddressWrapper, style]}>
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
          onPress={handleNavigateToAddress}
          disabled={disabled}
        />
      </View>
    ) : (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addNewAddressWrapper}
        onPress={handleNavigateToAddress}
        disabled={disabled}
      >
        <Text textVariant="quaternary" style={styles.textCentered}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  },
);

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

AddressInfoSection.displayName = "AddressInfoSection";
export default AddressInfoSection;
