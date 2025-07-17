import React, { useCallback } from "react";
import { Alert, StyleSheet, ToastAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

// Components
import { AddressForm } from "@/components/ui/address";

// Themes
import { background } from "@/themes";

// Hooks
import { useUpdateUser } from "@/hooks";
import { useUserStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { UserAddress } from "@/interfaces";
import { SUCCESS_MESSAGE } from "@/constants";
import { useRouter } from "expo-router";

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
              userAddress
                ? SUCCESS_MESSAGE.UPDATE_ADDRESS
                : SUCCESS_MESSAGE.ADD_ADDRESS,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            setUserAddress(data);
            back();
          },
          onError: (error) => {
            Alert.alert(
              "Error",
              error.message,
              [
                {
                  text: "Ok",
                },
              ],
              { cancelable: true },
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
