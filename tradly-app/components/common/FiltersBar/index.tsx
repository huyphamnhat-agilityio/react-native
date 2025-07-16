import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { memo, useCallback, useState } from "react";

// Components
import Button from "../Button";
import CategorySelectionModal from "../CategorySelectionModal";
import SortModal from "../SortModal";

// Icons
import { CategoryIcon, LocationIcon, SortIcon } from "@/components/icons";

export type FiltersBarProps = {
  style?: StyleProp<ViewStyle>;
  includeCategorySelection?: boolean;
};

const FiltersBar = memo(
  ({ style, includeCategorySelection = true }: FiltersBarProps) => {
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);

    const handleToggleCategoryModal = useCallback(() => {
      setCategoryModalVisible((prev) => !prev);
    }, []);

    const handleCloseCategoryModal = useCallback(() => {
      setCategoryModalVisible(false);
    }, []);

    const handleOpenCategoryModal = useCallback(() => {
      setCategoryModalVisible(true);
    }, []);

    const handleToggleSortModal = useCallback(() => {
      setSortModalVisible((prev) => !prev);
    }, []);

    const handleCloseSortModal = useCallback(() => {
      setSortModalVisible(false);
    }, []);

    const handleOpenSortModal = useCallback(() => {
      setSortModalVisible(true);
    }, []);
    return (
      <View style={[styles.container, style]}>
        <Button
          variant="transparent"
          title="Sort by"
          titleSize={3.5}
          rounded={6}
          IconLeft={<SortIcon />}
          style={styles.button}
          onPress={handleOpenSortModal}
        />

        <Button
          variant="transparent"
          title="Location"
          titleSize={3.5}
          rounded={6}
          IconLeft={<LocationIcon />}
          style={styles.button}
        />

        {includeCategorySelection && (
          <Button
            variant="transparent"
            title="Category"
            titleSize={3.5}
            rounded={6}
            IconLeft={<CategoryIcon />}
            style={styles.button}
            onPress={handleOpenCategoryModal}
          />
        )}

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

        {sortModalVisible && (
          <SortModal
            visible={sortModalVisible}
            onToggle={handleToggleSortModal}
            onClose={handleCloseSortModal}
            style={{
              width: "80%",
              height: 200,
            }}
          />
        )}
      </View>
    );
  },
);

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
