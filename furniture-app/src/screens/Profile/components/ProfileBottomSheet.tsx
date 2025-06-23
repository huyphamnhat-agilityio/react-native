import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Components
import { BottomSheet, BottomSheetProps, Text } from 'src/components/common';

// Icons
import { CameraIcon, GalleryIcon } from 'src/components/icons';

// Themes
import { borderRadius, colors } from 'src/themes';
import { requestAndroidPermission } from 'src/utils';

export type ProfileBottomSheetProps = {
  setImageBase64: React.Dispatch<React.SetStateAction<string>>;
  setImageUri: React.Dispatch<React.SetStateAction<string>>;
  toggleAvatarUploaderModal?: () => void;
} & Omit<BottomSheetProps, 'children'>;

const ProfileBottomSheet = ({
  isOpen,
  onClose,
  setImageBase64,
  setImageUri,
  toggleAvatarUploaderModal,
  ...rest
}: ProfileBottomSheetProps) => {
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

    onClose();
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
      cameraType: 'back',
      includeBase64: true,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri ?? '');
      toggleAvatarUploaderModal?.();
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

    onClose();
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri ?? '');
      toggleAvatarUploaderModal?.();
      result.assets[0].base64 && setImageBase64(result.assets[0].base64);
    }
  };
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      style={styles.actionSheet}
      {...rest}
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
  );
};

const styles = StyleSheet.create({
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
});
export default ProfileBottomSheet;
