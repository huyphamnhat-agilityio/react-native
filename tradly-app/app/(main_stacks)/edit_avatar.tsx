import { StyleSheet, ToastAndroid, View } from "react-native";
import { memo, useCallback, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useShallow } from "zustand/shallow";
import { useRouter } from "expo-router";

// Themes
import { background, border, borderRadius, colors } from "@/themes";

// Components
import { Button, IconButton } from "@/components/common";
import {
  EmojiList,
  EmojiPicker,
  EmojiSticker,
} from "@/components/ui/edit_avatar";
import { ImagePickerBottomSheet } from "@/components/ui/edit_profile";

// Stores
import { useScreenDimensions, useUserStore } from "@/store";

// Hooks
import { useUpdateUser, useUploadImage } from "@/hooks";

// Constants
import {
  fadeIn400,
  fadeInLeft400,
  fadeInRight400,
  SUCCESS_MESSAGE,
  TABLET_DEVICE_WIDTH,
} from "@/constants";

const EditAvatar = memo(() => {
  const { user, setUserAvatar } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      setUserAvatar: state.setUserAvatar,
    })),
  );

  const { screenWidth } = useScreenDimensions();

  const { back } = useRouter();

  const imageRef = useRef<View>(null);

  const [selectedImage, setSelectedImage] = useState("");
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState("");

  const isOpen = useSharedValue(false);

  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();

  const { mutateAsync: uploadImage, isPending: isUploadingImage } =
    useUploadImage();

  const isPending = isUpdatingUser || isUploadingImage;

  const handleOpenSheet = useCallback(() => {
    isOpen.value = true;
  }, [isOpen]);

  const handleCloseSheet = useCallback(() => {
    isOpen.value = false;
  }, [isOpen]);

  const handleShowOption = useCallback(() => {
    setShowAppOptions(true);
  }, []);

  const onReset = useCallback(() => {
    setShowAppOptions(false);
    setPickedEmoji("");
  }, []);

  const onAddSticker = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const onModalClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleUploadImage = useCallback(
    async (base64: string) => {
      const imageFormData = new FormData();

      imageFormData.append("image", base64);

      const result = await uploadImage(imageFormData, {
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
    [uploadImage],
  );

  const handleUpdateUserAvatar = useCallback(
    async (avatar: string) => {
      await updateUser(
        {
          id: user?.id ?? "",
          avatar,
        },
        {
          onSuccess: () => {
            ToastAndroid.showWithGravity(
              SUCCESS_MESSAGE.UPLOAD_IMAGE,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );

            setUserAvatar(avatar);

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
    [back, setUserAvatar, updateUser, user?.id],
  );

  const onSaveImageAsync = useCallback(async () => {
    try {
      if (imageRef.current) {
        const uri = await captureRef(imageRef, {
          format: "png",
          quality: 1,
          result: "base64",
        });

        const newAvatarUrl = await handleUploadImage(uri);

        handleUpdateUserAvatar(newAvatarUrl);
      }
    } catch (e) {
      console.log("Error saving image:", e);
    }
  }, [handleUpdateUserAvatar, handleUploadImage]);
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <Image
              source={selectedImage || user?.avatar}
              style={styles.avatar}
              transition={{
                duration: 400,
                effect: "cross-dissolve",
                timing: "ease-in",
              }}
            />
            {!!pickedEmoji && (
              <EmojiSticker
                imageSize={40}
                stickerSource={pickedEmoji}
                imageWidth={320}
                imageHeight={440}
              />
            )}
          </View>
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <Animated.View entering={fadeIn400}>
                <IconButton
                  icon="refresh"
                  label="Reset"
                  iconSize={screenWidth >= TABLET_DEVICE_WIDTH ? 32 : 24}
                  labelSize={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}
                  disabled={isPending}
                  onPress={onReset}
                />
              </Animated.View>
              <Animated.View entering={fadeIn400}>
                <Button
                  IconLeft={
                    <MaterialIcons name="add" size={36} color={colors.white} />
                  }
                  style={styles.addIcon}
                  disabled={isPending}
                  onPress={onAddSticker}
                />
              </Animated.View>

              <Animated.View entering={fadeIn400}>
                <IconButton
                  icon="save-alt"
                  label="Save"
                  iconSize={screenWidth >= TABLET_DEVICE_WIDTH ? 32 : 24}
                  labelSize={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}
                  disabled={isPending || (!selectedImage && !pickedEmoji)}
                  onPress={onSaveImageAsync}
                />
              </Animated.View>
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Animated.View entering={fadeInLeft400}>
              <Button
                title="Choose a photo"
                variant="secondary"
                titleSize={4}
                rounded={6}
                onPress={handleOpenSheet}
                style={styles.button}
              />
            </Animated.View>

            <Animated.View entering={fadeInRight400}>
              <Button
                title="Use this photo"
                variant="transparent"
                titleSize={4}
                rounded={6}
                onPress={handleShowOption}
                style={styles.button}
              />
            </Animated.View>
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      </GestureHandlerRootView>
      <ImagePickerBottomSheet
        isOpen={isOpen}
        onClose={handleCloseSheet}
        setImageUri={setSelectedImage}
      />
    </>
  );
});

EditAvatar.displayName = "EditAvatar";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.primary,
    paddingHorizontal: 32,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  avatar: { width: 320, height: 440, borderRadius: 18 },
  footerContainer: {
    flex: 1 / 3,
    gap: 12,
  },
  optionsContainer: {
    flex: 1 / 2,
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: borderRadius[6],
  },
  optionsRow: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  addIcon: {
    padding: 8,
    borderRadius: borderRadius.full,
    borderColor: border.white,
    borderWidth: 1,
  },
});
export default EditAvatar;
