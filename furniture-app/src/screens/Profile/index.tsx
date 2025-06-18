import { memo, useCallback, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  ToastAndroid,
  TouchableHighlight,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSharedValue } from 'react-native-reanimated';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';

// Components
import { BottomSheet, Modal, Text } from 'src/components/common';
import { SettingMenu } from 'src/components';

// Icons
import { CameraIcon, GalleryIcon } from 'src/components/icons';

// Themes
import { borderRadius, colors } from 'src/themes';

// Store
import { useUserStore } from 'src/store';

// Hooks
import { useUpdateUser, useUploadImage } from 'src/hooks';
import { PLACEHOLDER_AVATAR_URL, SUCCESS_MESSAGE } from 'src/constants';
import FastImage from '@d11/react-native-fast-image';
import { requestAndroidPermission } from 'src/utils';

const ProfileScreen = memo(() => {
  const {
    id = '',
    name = '',
    email = '',
    avatar,
    setUserAvatar,
  } = useUserStore(
    useShallow(state => ({
      id: state.user?.id,
      name: state.user?.name,
      email: state.user?.email,
      avatar: state.user?.avatar,
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

  const openCamera = async () => {
    if (Platform.OS === 'android') {
      const hasCamera = await requestAndroidPermission(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        'Camera',
      );
      if (!hasCamera) {
        return;
      }
    }

    handleCloseSheet();
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
      cameraType: 'back',
      includeBase64: true,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri ?? '');
      toggleModal();
      result.assets[0].base64 && setImageBase64(result.assets[0].base64);
    }
  };

  const openGallery = async () => {
    if (Platform.OS === 'android') {
      const hasStorage = await requestAndroidPermission(
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        'Storage',
      );

      if (!hasStorage) {
        return;
      }
    }

    handleCloseSheet();
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri ?? '');
      toggleModal();
      result.assets[0].base64 && setImageBase64(result.assets[0].base64);
    }
  };
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
        <View style={styles.wrapper}>
          <View>
            <Pressable onPress={handleOpenSheet}>
              <FastImage
                source={{
                  uri: avatar ?? PLACEHOLDER_AVATAR_URL,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text font="NunitoSansBold" size="md" textVariant="secondary">
              {name}
            </Text>
            <Text font="NunitoSansNormal" size="xs" textVariant="quaternary">
              {email}
            </Text>
          </View>
        </View>

        <SettingMenu style={styles.menu} />

        <Modal
          isDisabled={isPending}
          isVisible={isVisible}
          onToggle={toggleModal}
          onConfirm={handleConfirm}
        >
          <Text style={styles.modalTitle}>
            Do you want to use this photo as your profile picture?
          </Text>
          <FastImage
            source={{
              uri: imageUri,
            }}
            resizeMode="cover"
            style={styles.previewImage}
          />
        </Modal>
      </View>
      <BottomSheet
        isOpen={isOpen}
        onClose={handleCloseSheet}
        style={styles.actionSheet}
      >
        <Text style={styles.actionTitle}>Take photo from</Text>
        <View style={styles.actionWrapper}>
          <TouchableHighlight
            style={styles.underlay}
            underlayColor={colors.underlay}
            onPress={openCamera}
          >
            <View style={styles.actionItem}>
              <CameraIcon width={40} height={40} />
              <Text>Camera</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.underlay}
            underlayColor={colors.underlay}
            onPress={openGallery}
          >
            <View style={styles.actionItem}>
              <GalleryIcon width={40} height={40} />
              <Text>Gallery</Text>
            </View>
          </TouchableHighlight>
        </View>
      </BottomSheet>
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

  content: {
    gap: 5,
  },
  menu: {
    backgroundColor: colors.white,
    marginTop: 30,
  },
  actionSheet: {
    gap: 20,
    padding: 12,
  },
  actionTitle: {
    textAlign: 'center',
  },
  actionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  actionItem: {
    display: 'flex',
    gap: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  underlay: {
    padding: 4,
    borderRadius: borderRadius.md,
  },
  modalTitle: {
    textAlign: 'center',
  },
  previewImage: {
    width: 160,
    height: 160,
    borderRadius: borderRadius.full,
    marginHorizontal: 'auto',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
  },
});

ProfileScreen.displayName = 'ProfileScreen';

export default ProfileScreen;
