import { StyleSheet, TouchableOpacity } from "react-native";
import { memo, useCallback } from "react";

// Themes
import { borderRadius } from "@/themes";

// Components
import Text from "../Text";
import Checkbox from "../Checkbox";

export type SortSelectItemProps = {
  title: string;
  label: string;
  value: string;
  selected?: boolean;
  onSelect?: (sort: string, order: string) => void;
  onClose?: () => void;
};

const SortSelectItem = memo(
  ({
    title,
    label,
    value,
    onSelect,
    onClose,
    selected = false,
  }: SortSelectItemProps) => {
    const handleSelect = useCallback(() => {
      if (selected) {
        return;
      }
      onSelect?.(label, value);
      onClose?.();
    }, [label, onClose, onSelect, selected, value]);

    return (
      <TouchableOpacity style={styles.container} onPress={handleSelect}>
        <Checkbox active={selected} onPress={handleSelect} />
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

SortSelectItem.displayName = "SortSelectItem";
export default SortSelectItem;
