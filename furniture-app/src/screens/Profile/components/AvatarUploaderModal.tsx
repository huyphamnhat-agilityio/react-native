import FastImage from '@d11/react-native-fast-image';
import { StyleSheet } from 'react-native';

// Components
import { Modal, ModalProps, Text } from 'src/components/common';

// Themes
import { borderRadius } from 'src/themes';

export type AvatarUploaderModalProps = { imageUri?: string } & ModalProps;
const AvatarUploaderModal = ({
  imageUri,
  isVisible,
  isDisabled,
  onToggle,
  onConfirm,
}: AvatarUploaderModalProps) => {
  return (
    <Modal
      isDisabled={isDisabled}
      isVisible={isVisible}
      onToggle={onToggle}
      onConfirm={onConfirm}
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
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    textAlign: 'center',
  },
  previewImage: {
    width: 160,
    height: 160,
    borderRadius: borderRadius.full,
    marginHorizontal: 'auto',
  },
});

export default AvatarUploaderModal;
