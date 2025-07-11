import { useState } from "react";
import { StyleSheet, View } from "react-native";

// Themes
import { background } from "@/themes";

// Components
import { ProductList } from "@/components/ui/browse";
import { Button, CategorySelectionModal } from "@/components/common";

const Browse = () => {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <ProductList />

      <Button
        title="test modal"
        onPress={() => setCategoryModalVisible(true)}
      />

      <CategorySelectionModal
        visible={categoryModalVisible}
        onToggle={() => setCategoryModalVisible((prev) => !prev)}
        onClose={() => setCategoryModalVisible(false)}
        style={{
          width: "80%",
          height: 200,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.secondary,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});
export default Browse;
