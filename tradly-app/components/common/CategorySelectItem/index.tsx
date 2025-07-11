import { Checkbox } from "expo-checkbox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useCallback } from "react";

// Themes
import { borderRadius } from "@/themes";

// Components
import Text from "../Text";

export type CategorySelectItemProps = {
  title: string;
  selected?: boolean;
  onSelect?: (category: string) => void;
  onClose?: () => void;
};

const CategorySelectItem = ({
  title,
  onSelect,
  onClose,
  selected = false,
}: CategorySelectItemProps) => {
  const handleSelect = useCallback(() => {
    if (selected) {
      return;
    }
    onSelect?.(title);
    onClose?.();
  }, [onClose, onSelect, selected, title]);

  return (
    <TouchableOpacity style={styles.container} onPress={handleSelect}>
      <Checkbox style={styles.checkbox} value={selected} pointerEvents="none" />
      <Text textVariant="quaternary" font="Montserrat_500Medium" size={3.5}>
        {title === "" ? "All" : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    gap: 10,
    flexDirection: "row",
  },
  checkbox: {
    borderRadius: borderRadius.full,
  },
});
export default CategorySelectItem;
