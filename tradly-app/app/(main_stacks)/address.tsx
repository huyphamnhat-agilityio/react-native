import React, { useCallback } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useShallow } from "zustand/shallow";
import { useRouter } from "expo-router";

// Components
import { AddressForm } from "@/components/ui/address";

// Themes
import { background } from "@/themes";

// Hooks
import { useUpdateUser } from "@/hooks";

// Store
import { useUserStore } from "@/store";

// Types
import { UserAddress } from "@/interfaces";

// Constants
import { SUCCESS_MESSAGE } from "@/constants";

// Utils
import { isFulfilledObject } from "@/utils";

const Address = () => {
  const { back } = useRouter();
  const {
    userAddress,
    setUserAddress,
    userId = "",
  } = useUserStore(
    useShallow((state) => ({
      userAddress: state.user?.address,
      setUserAddress: state.setUserAddress,
      userId: state.user?.id,
    })),
  );

  const { mutateAsync: updateUserAddress } = useUpdateUser();

  const handleSubmit = useCallback(
    async (data: UserAddress) => {
      await updateUserAddress(
        { id: userId, address: data },
        {
          onSuccess: () => {
            ToastAndroid.showWithGravity(
              isFulfilledObject(userAddress)
                ? SUCCESS_MESSAGE.UPDATE_ADDRESS
                : SUCCESS_MESSAGE.ADD_ADDRESS,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            setUserAddress(data);
            back();
          },
          onError: (error) => {
            ToastAndroid.showWithGravity(
              error.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          },
        },
      );
    },
    [back, setUserAddress, updateUserAddress, userAddress, userId],
  );
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <AddressForm data={userAddress} onSubmit={handleSubmit} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: background.white,
  },
});

export default Address;
