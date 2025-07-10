import { StyleSheet, View } from "react-native";

// Themes
import { background } from "@/themes";
import { ProductList } from "@/components/ui/browse";

const Browse = () => {
  return (
    <View style={styles.container}>
      <ProductList />
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
