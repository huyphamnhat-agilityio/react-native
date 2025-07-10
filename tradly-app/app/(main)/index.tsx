import { ScrollView, StyleSheet } from "react-native";

// Components
import {
  BannerList,
  CategoryList,
  NewProductList,
  PopularProductList,
  StoreList,
} from "@/components/ui/home";

// Themes
import { background } from "@/themes";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <BannerList style={styles.banner} />

      <CategoryList style={styles.category} />

      <NewProductList style={styles.productList} />

      <PopularProductList style={styles.productList} />

      <StoreList style={styles.storeList} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.secondary,
  },
  banner: {
    marginTop: 12,
  },
  category: {
    marginTop: 16,
  },
  productList: {
    marginTop: 16,
  },
  storeList: {
    marginTop: 30,
  },
});

export default Home;
