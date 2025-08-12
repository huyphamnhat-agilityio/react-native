import { memo, PropsWithChildren } from "react";
import {
  Modal as ModalBase,
  ModalProps as ModalBaseProps,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Components
import Button from "../Button";

// Themes
import { background, borderRadius } from "@/themes";

export type ModalProps = {
  onToggle?: () => void;
  onConfirm?: () => void;
  isDisabled?: boolean;
  includeActionButtons?: boolean;
} & ModalBaseProps;

const Modal = memo(
  ({
    visible,
    onToggle,
    onConfirm,
    includeActionButtons,
    isDisabled = false,
    style,
    children,
    animationType = "fade",
    ...rest
  }: PropsWithChildren<ModalProps>) => {
    return (
      <ModalBase
        animationType={animationType}
        visible={visible}
        transparent={true}
        {...rest}
      >
        <TouchableOpacity
          disabled={isDisabled}
          style={styles.overlay}
          onPress={onToggle}
        />
        <View style={[styles.container, style]}>
          <View style={styles.modalContent}>
            {children}
            {includeActionButtons && (
              <View style={styles.buttonContainer}>
                <Button
                  variant="primary"
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
            )}
          </View>
        </View>
      </ModalBase>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginVertical: "auto",
    marginHorizontal: "auto",
    minWidth: 200,
    minHeight: 100,
  },
  overlay: {
    backgroundColor: background.backdrop,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: background.white,
    padding: 12,
    borderRadius: 10,
    gap: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: borderRadius[6],
  },
});

Modal.displayName = "Modal";
export default Modal;
