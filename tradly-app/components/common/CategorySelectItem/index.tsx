import { StyleSheet, TouchableOpacity } from "react-native";
import { memo, useCallback } from "react";

// Themes
import { borderRadius } from "@/themes";

// Components
import Text from "../Text";
import Checkbox from "../Checkbox";

export type CategorySelectItemProps = {
  title: string;
  selected?: boolean;
  onSelect?: (category: string) => void;
  onClose?: () => void;
};

const CategorySelectItem = memo(
  ({ title, onSelect, onClose, selected = false }: CategorySelectItemProps) => {
    const handleSelect = useCallback(() => {
      if (selected) {
        return;
      }
      onSelect?.(title);
      onClose?.();
    }, [onClose, onSelect, selected, title]);

    return (
      <TouchableOpacity style={styles.container} onPress={handleSelect}>
        <Checkbox active={selected} />
        <Text textVariant="quaternary" size={3.5}>
          {title === "" ? "All" : title}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: 30,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    borderRadius: borderRadius.full,
  },
});

CategorySelectItem.displayName = "CategorySelectItem";
export default CategorySelectItem;
