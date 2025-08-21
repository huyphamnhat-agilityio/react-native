import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { memo, PropsWithChildren } from "react";
import { Modal, StyleSheet, View } from "react-native";

// Themes
import { background, colors, text } from "@/themes";

// Components
import { Button, Text } from "@/components/common";

// Store
import { useScreenDimensions } from "@/store";

// Constants
import { TABLET_DEVICE_WIDTH } from "@/constants";

export type EmojiPickerProps = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

const EmojiPicker = memo(
  ({ isVisible, children, onClose }: EmojiPickerProps) => {
    const { screenWidth } = useScreenDimensions();
    return (
      <View>
        <Modal animationType="slide" transparent={true} visible={isVisible}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text size={screenWidth >= TABLET_DEVICE_WIDTH ? 4.5 : 3.5}>
                Choose a sticker
              </Text>
              <Button
                variant="transparent"
                IconLeft={
                  <MaterialIcons
                    name="close"
                    color={colors.green_200}
                    size={screenWidth >= TABLET_DEVICE_WIDTH ? 30 : 22}
                  />
                }
                onPress={onClose}
              />
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
