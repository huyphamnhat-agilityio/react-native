import { StyleSheet, TouchableHighlight, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Components
import { BottomSheet, BottomSheetProps, Text } from "@/components/common";

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Themes
import { borderRadius, colors } from "@/themes";

// Utils
import { handleNeverAskAgain } from "@/utils";
import { useCallback } from "react";

export type ProfileBottomSheetProps = {
  setImageBase64: React.Dispatch<React.SetStateAction<string>>;
  setImageUri: React.Dispatch<React.SetStateAction<string>>;
} & Omit<BottomSheetProps, "children">;

const ImagePickerBottomSheet = ({
  isOpen,
  onClose,
  setImageBase64,
  setImageUri,
  ...rest
}: ProfileBottomSheetProps) => {
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const openCamera = useCallback(async () => {
    if (!cameraPermission || cameraPermission.granted === false) {
      const hasCamera = await requestCameraPermission();

      if (!hasCamera.canAskAgain) {
        handleNeverAskAgain("Camera");
        return;
      }

      if (!hasCamera.granted) return;
    }

    onClose();

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      result.assets[0].base64 && setImageBase64(result.assets[0].base64);
    }
  }, [
    cameraPermission,
    onClose,
    requestCameraPermission,
    setImageBase64,
    setImageUri,
  ]);

  const openGallery = async () => {
    if (!mediaLibraryPermission || mediaLibraryPermission.granted === false) {
      const hasMedia = await requestMediaLibraryPermission();

      if (!hasMedia.canAskAgain) {
        handleNeverAskAgain("Media Library");
        return;
      }

      if (!hasMedia.granted) return;
    }

    onClose();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
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
      <Text style={styles.actionTitle} textVariant="quaternary">
        Take photo from
      </Text>
      <View style={styles.actionWrapper}>
        <TouchableHighlight
          style={styles.underlay}
          underlayColor={colors.gray_50}
          onPress={openCamera}
        >
          <View style={styles.actionItem}>
            <FontAwesome name="camera" size={40} color="black" />
            <Text textVariant="quaternary">Camera</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.underlay}
          underlayColor={colors.gray_50}
          onPress={openGallery}
        >
          <View style={styles.actionItem}>
            <FontAwesome name="photo" size={40} color="black" />
            <Text textVariant="quaternary">Gallery</Text>
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
    textAlign: "center",
  },
  actionWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  actionItem: {
    display: "flex",
    gap: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  underlay: {
    padding: 4,
    borderRadius: borderRadius[2],
  },
});

export default ImagePickerBottomSheet;
