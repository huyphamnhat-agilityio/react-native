import { useRouter } from "expo-router";
import { memo, useCallback, useState } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSharedValue } from "react-native-reanimated";
import { useShallow } from "zustand/shallow";

// Components
import {
  EditProfileForm,
  EditUserFormData,
  ImagePickerBottomSheet,
} from "@/components/ui/edit_profile";

// Constants
import { SUCCESS_MESSAGE } from "@/constants";

// Hooks
import { useUpdateUser, useUploadImage } from "@/hooks";

// Store
import { useUserStore } from "@/store";

// Themes
import { background } from "@/themes";

const EditProfile = memo(() => {
  const { user, setUser, setUserAvatar } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
      setUserAvatar: state.setUserAvatar,
    })),
  );

  const { back } = useRouter();

  const { mutateAsync: updateUser } = useUpdateUser();

  const isOpen = useSharedValue(false);

  const [imageUri, setImageUri] = useState("");

  const [imageBase64, setImageBase64] = useState("");

  const handleOpenSheet = useCallback(() => {
    isOpen.value = true;
  }, [isOpen]);

  const handleCloseSheet = useCallback(() => {
    isOpen.value = false;
  }, [isOpen]);

  const { mutateAsync: uploadImage } = useUploadImage();

  const handleUploadImage = useCallback(
    async (base64: string) => {
      const imageFormData = new FormData();

      imageFormData.append("image", base64);

      const result = await uploadImage(imageFormData, {
        onSuccess: (response) => {
          setUserAvatar(response);
        },
        onError: (error) => {
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        },
      });

      return result;
    },
    [setUserAvatar, uploadImage],
  );

  const handleUpdateUser = useCallback(
    async ({ email, name, phone }: EditUserFormData) => {
      let avatar = "";

      imageBase64 && (avatar = await handleUploadImage(imageBase64));

      await updateUser(
        {
          id: user?.id ?? "",
          name,
          email,
          phone,
          ...(avatar && { avatar }),
        },
        {
          onSuccess: () => {
            ToastAndroid.showWithGravity(
              SUCCESS_MESSAGE.UPDATE_USER,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );

            setUser({ ...user!, email, name, phone, avatar });

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
    [back, handleUploadImage, imageBase64, setUser, updateUser, user],
  );
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <EditProfileForm
        data={user}
        imageUri={imageUri}
        isDirty={!!imageBase64}
        onSubmit={handleUpdateUser}
        onOpenSheet={handleOpenSheet}
      />

      <ImagePickerBottomSheet
        isOpen={isOpen}
        onClose={handleCloseSheet}
        setImageBase64={setImageBase64}
        setImageUri={setImageUri}
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
