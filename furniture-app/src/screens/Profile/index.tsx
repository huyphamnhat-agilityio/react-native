import {memo, useCallback, useState} from 'react';
import {useShallow} from 'zustand/shallow';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSharedValue} from 'react-native-reanimated';

// Components
import {BottomSheet, Button, Text} from 'src/components/common';
import {SettingMenu} from 'src/components';

// Themes
import {borderRadius, colors} from 'src/themes';

// Store
import {useUserStore} from 'src/store';
import {CameraIcon, GalleryIcon} from 'src/components/icons';
// import {useUploadImage} from 'src/hooks';

const ProfileScreen = memo(() => {
  const {name = '', email = ''} = useUserStore(
    useShallow(state => ({
      name: state.user?.name,
      email: state.user?.email,
    })),
  );

  const [imageUri, setImageUri] = useState('');

  // const {mutateAsync: uploadImage} = useUploadImage();
  // const handleUploadImage = useCallback(
  //   async (base64: string) => {
  //     console.log('Uploading image with base64:', base64);
  //     const imageFormData = new FormData();

  //     imageFormData.append('image', base64);
  //     await uploadImage(imageFormData, {
  //       onSuccess: response => {
  //         setImageUri(response);
  //       },
  //       onError: error => {
  //         Alert.alert(
  //           'Upload Photo Failed',
  //           error.message,
  //           [
  //             {
  //               text: 'Ok',
  //             },
  //           ],
  //           {cancelable: true},
  //         );
  //       },
  //     });
  //   },
  //   [uploadImage],
  // );

  const openCamera = async () => {
    toggleSheet();
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
      cameraType: 'back',
      includeBase64: true,
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri ?? '');
      // result.assets[0].base64 && handleUploadImage(result.assets[0].base64);
    }
  };

  const openGallery = async () => {
    toggleSheet();
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri ?? '');
      // result.assets[0].base64 && handleUploadImage(result.assets[0].base64);
    }
  };

  const isOpen = useSharedValue(false);

  const toggleSheet = useCallback(() => {
    isOpen.value = !isOpen.value;
  }, [isOpen]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.wrapper}>
          <View>
            <Pressable onPress={toggleSheet}>
              <Image
                source={{
                  uri: imageUri
                    ? imageUri
                    : 'https://static1.squarespace.com/static/547cae8ee4b07ec2526c1cc5/t/63c7f6ae0ccaba131852cc4b/1651711797375/profile-placeholder.png?format=1500w',
                }}
                width={80}
                height={80}
                borderRadius={9999}
                resizeMode="cover"
              />
            </Pressable>

            <Button title="Use this photo" />
          </View>
          <View style={styles.content}>
            <Text font="NunitoSansBold" size="md" textVariant="secondary">
              {name}
            </Text>
            <Text font="NunitoSansNormal" size="xs" textVariant="quaternary">
              {email}
            </Text>

            <Text>Image URI: {imageUri}</Text>
          </View>
        </View>

        <SettingMenu style={styles.menu} />
      </View>
      <BottomSheet
        isOpen={isOpen}
        toggleSheet={toggleSheet}
        style={styles.actionSheet}>
        <Text style={styles.actionTitle}>Take photo from</Text>
        <View style={styles.actionWrapper}>
          <TouchableHighlight
            style={styles.underlay}
            underlayColor={colors.underlay}
            onPress={openCamera}>
            <View style={styles.actionItem}>
              <CameraIcon width={40} height={40} />
              <Text>Camera</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.underlay}
            underlayColor={colors.underlay}
            onPress={openGallery}>
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
});

ProfileScreen.displayName = 'ProfileScreen';

export default ProfileScreen;
