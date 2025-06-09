import {memo, PropsWithChildren} from 'react';
import {
  Modal as ModalBase,
  ModalProps as ModalBaseProps,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Themes
import {borderRadius, colors} from 'src/themes';

// Components
import Button from '../Button';

export type ModalProps = {
  isVisible?: boolean;
  onToggle?: () => void;
  onConfirm?: () => void;
  isDisabled?: boolean;
} & ModalBaseProps;

const Modal = memo(
  ({
    isVisible,
    onToggle,
    onConfirm,
    isDisabled = false,
    children,
  }: PropsWithChildren<ModalProps>) => {
    return (
      <ModalBase animationType="fade" visible={isVisible} transparent={true}>
        <TouchableOpacity
          disabled={isDisabled}
          style={styles.overlay}
          onPress={onToggle}>
          <View style={styles.modalContent}>
            {children}
            <View style={styles.buttonContainer}>
              <Button
                bgVariant="outline"
                textVariant="outline"
                title="No"
                disabled={isDisabled}
                style={styles.button}
                onPress={onToggle}
              />
              <Button
                style={styles.button}
                title="Yes"
                onPress={onConfirm}
                disabled={isDisabled}
              />
            </View>
          </View>
        </TouchableOpacity>
      </ModalBase>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.background.backdrop,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    minWidth: 200,
    minHeight: 100,
    gap: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: borderRadius.xs,
  },
});

export default Modal;
