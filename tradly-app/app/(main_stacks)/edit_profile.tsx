import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSharedValue } from "react-native-reanimated";
import { useShallow } from "zustand/shallow";

// Components
import {
  EditProfileForm,
  EditUserFormData,
} from "@/components/ui/edit_profile";

// Constants
import { SUCCESS_MESSAGE } from "@/constants";

// Hooks
import { useUpdateUser } from "@/hooks";

// Store
import { useUserStore } from "@/store";

// Themes
import { background } from "@/themes";

const EditProfile = memo(() => {
  const { user, setUser } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
    })),
  );

  const { back } = useRouter();

  const { mutateAsync: updateUser } = useUpdateUser();

  const isOpen = useSharedValue(false);

  const handleOpenSheet = useCallback(() => {
    isOpen.value = true;
  }, [isOpen]);

  const handleUpdateUser = useCallback(
    async ({ email, name, phone }: EditUserFormData) => {
      await updateUser(
        {
          id: user?.id ?? "",
          name,
          email,
          phone,
        },
        {
          onSuccess: () => {
            ToastAndroid.showWithGravity(
              SUCCESS_MESSAGE.UPDATE_USER,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );

            setUser({ ...user!, email, name, phone });

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
    [back, setUser, updateUser, user],
  );
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <EditProfileForm
        data={user}
        onSubmit={handleUpdateUser}
        onOpenSheet={handleOpenSheet}
      />
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: background.secondary,
  },
});

EditProfile.displayName = "EditProfile";
export default EditProfile;
