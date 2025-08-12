import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { memo, PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

// Themes
import { background, colors, text } from "@/themes";

// Components
import { Text } from "@/components/common";

export type EmojiPickerProps = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

const EmojiPicker = memo(
  ({ isVisible, children, onClose }: EmojiPickerProps) => {
    return (
      <View>
        <Modal animationType="slide" transparent={true} visible={isVisible}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text>Choose a sticker</Text>
              <Pressable onPress={onClose}>
                <MaterialIcons
                  name="close"
                  color={colors.green_200}
                  size={22}
                />
              </Pressable>
            </View>
            {children}
          </View>
        </Modal>
      </View>
    );
  },
);

EmojiPicker.displayName = "EmojiPicker";

export default EmojiPicker;

const styles = StyleSheet.create({
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: background.white,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: background.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: text.white,
    fontSize: 16,
  },
});
