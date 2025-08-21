import { useRouter } from "expo-router";
import { memo, useCallback, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";

// Themes
import { background } from "@/themes";

// Components
import Text from "../Text";
import Button from "../Button";

// Store
import { useScreenDimensions, useUserStore } from "@/store";

// Utils
import { generateDeliveryInfo, isFulfilledObject } from "@/utils";

// Constants
import {
  fadeInLeft400,
  fadeInRight400,
  TABLET_DEVICE_WIDTH,
} from "@/constants";

export type AddressInfoSectionProps = {
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};
const AddressInfoSection = memo(
  ({ style, disabled }: AddressInfoSectionProps) => {
    const userAddress = useUserStore((state) => state.user?.address);

    const { screenWidth } = useScreenDimensions();

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
        <Animated.View
          entering={fadeInLeft400}
          style={styles.deliveryTextWrapper}
        >
          <Text
            size={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}
            numberOfLines={2}
            textVariant="quaternary"
          >
            {buttonText}
          </Text>
        </Animated.View>
        <Animated.View entering={fadeInRight400} style={styles.buttonWrapper}>
          <Button
            title="Change"
            titleSize={screenWidth >= TABLET_DEVICE_WIDTH ? 4 : 3}
            rounded="full"
            style={styles.button}
            onPress={handleNavigateToAddress}
            disabled={disabled}
          />
        </Animated.View>
      </View>
    ) : (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addNewAddressWrapper}
        onPress={handleNavigateToAddress}
        disabled={disabled}
      >
        <Text
          size={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}
          textVariant="quaternary"
          style={styles.textCentered}
        >
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
  },
  deliveryTextWrapper: {
    flex: 3 / 4,
  },
  buttonWrapper: {
    flex: 1 / 4,
    justifyContent: "center",
  },
  button: {
    marginLeft: "auto",
    paddingHorizontal: 20,
  },
  textCentered: {
    textAlign: "center",
  },
});

AddressInfoSection.displayName = "AddressInfoSection";
export default AddressInfoSection;
