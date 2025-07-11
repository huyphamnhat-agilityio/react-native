import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { memo, useCallback, useState } from "react";

// Components
import Button from "../Button";
import CategorySelectionModal from "../CategorySelectionModal";

// Icons
import { CategoryIcon, LocationIcon, SortIcon } from "@/components/icons";

export type FiltersBarProps = {
  style?: StyleProp<ViewStyle>;
};

const FiltersBar = memo(({ style }: FiltersBarProps) => {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const handleToggleCategoryModal = useCallback(() => {
    setCategoryModalVisible((prev) => !prev);
  }, []);

  const handleCloseCategoryModal = useCallback(() => {
    setCategoryModalVisible(false);
  }, []);

  const handleOpenCategoryModal = useCallback(() => {
    setCategoryModalVisible(true);
  }, []);
  return (
    <View style={[styles.container, style]}>
      <Button
        variant="transparent"
        title="Sort by"
        titleFont="Montserrat_500Medium"
        titleSize={3.5}
        rounded={6}
        IconLeft={<SortIcon />}
        style={styles.button}
      />

      <Button
        variant="transparent"
        title="Location"
        titleFont="Montserrat_500Medium"
        titleSize={3.5}
        rounded={6}
        IconLeft={<LocationIcon />}
        style={styles.button}
      />
      <Button
        variant="transparent"
        title="Category"
        titleFont="Montserrat_500Medium"
        titleSize={3.5}
        rounded={6}
        IconLeft={<CategoryIcon />}
        style={styles.button}
        onPress={handleOpenCategoryModal}
      />

      {categoryModalVisible && (
        <CategorySelectionModal
          visible={categoryModalVisible}
          onToggle={handleToggleCategoryModal}
          onClose={handleCloseCategoryModal}
          style={{
            width: "80%",
            height: 200,
          }}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
  button: {
    flexGrow: 1,
    gap: 6,
    paddingVertical: 8,
  },
});

FiltersBar.displayName = "FiltersBar";
export default FiltersBar;
