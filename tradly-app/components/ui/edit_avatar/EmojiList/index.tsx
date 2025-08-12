import { EMOJI_LIST } from "@/constants";
import { Image } from "expo-image";
import { memo } from "react";
import { FlatList, Platform, Pressable, StyleSheet } from "react-native";

export type EmojiListProps = {
  onSelect?: (image: string) => void;
  onCloseModal: () => void;
};

const EmojiList = memo(({ onSelect, onCloseModal }: EmojiListProps) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={EMOJI_LIST}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect?.(item);
            onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
});

EmojiList.displayName = "EmojiList";

export default EmojiList;

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
