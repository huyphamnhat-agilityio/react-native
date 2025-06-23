import { memo, useCallback, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { Alert, StyleSheet, ToastAndroid, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';

// Components
import { SettingMenu } from 'src/components';
import {
  AvatarUploaderModal,
  ProfileBottomSheet,
  ProfileInformation,
} from './components';

// Themes
import { colors } from 'src/themes';

// Store
import { useUserStore } from 'src/store';

// Hooks
import { useUpdateUser, useUploadImage } from 'src/hooks';

// Constants
import { SUCCESS_MESSAGE } from 'src/constants';

const ProfileScreen = memo(() => {
  const { id = '', setUserAvatar } = useUserStore(
    useShallow(state => ({
      id: state.user?.id,
      setUserAvatar: state.setUserAvatar,
    })),
  );

  const [isVisible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const { mutateAsync: uploadImage, isPending: isUploadImagePending } =
    useUploadImage();

  const { mutateAsync: updateUser, isPending: isUpdateUserAvatarPending } =
    useUpdateUser();

  const isPending = isUploadImagePending || isUpdateUserAvatarPending;

  const isOpen = useSharedValue(false);

  const handleOpenSheet = useCallback(() => {
    isOpen.value = true;
  }, [isOpen]);

  const handleCloseSheet = useCallback(() => {
    isOpen.value = false;
  }, [isOpen]);

  const toggleModal = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const handleUploadImage = useCallback(
    async (base64: string) => {
      const imageFormData = new FormData();

      imageFormData.append('image', base64);

      const result = await uploadImage(imageFormData, {
        onSuccess: response => {
          setUserAvatar(response);
        },
        onError: error => {
          recordError(getCrashlytics(), error);
          Alert.alert(
            'Upload Photo Failed',
            error.message,
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: true },
          );
        },
      });

      await updateUser(
        { id, avatar: result },
        {
          onSuccess: () => {
            setUserAvatar(result);
            toggleModal();
            ToastAndroid.showWithGravity(
              SUCCESS_MESSAGE.UPLOAD_IMAGE,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          },
          onError: error => {
            recordError(getCrashlytics(), error);
            Alert.alert(
              'Upload Photo Failed',
              error.message,
              [
                {
                  text: 'Ok',
                },
              ],
              { cancelable: true },
            );
          },
        },
      );
    },
    [id, setUserAvatar, toggleModal, updateUser, uploadImage],
  );

  const handleConfirm = useCallback(() => {
    handleUploadImage(imageBase64);
  }, [handleUploadImage, imageBase64]);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ProfileInformation onPress={handleOpenSheet} />

        <SettingMenu style={styles.menu} />
      </View>

      <AvatarUploaderModal
        isDisabled={isPending}
        isVisible={isVisible}
        imageUri={imageUri}
        onConfirm={handleConfirm}
        onToggle={toggleModal}
      />

      <ProfileBottomSheet
        isOpen={isOpen}
        onClose={handleCloseSheet}
        toggleAvatarUploaderModal={toggleModal}
        setImageUri={setImageUri}
        setImageBase64={setImageBase64}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
  },
  wrapper: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  menu: {
    backgroundColor: colors.white,
    marginTop: 30,
  },
});

ProfileScreen.displayName = 'ProfileScreen';

export default ProfileScreen;
