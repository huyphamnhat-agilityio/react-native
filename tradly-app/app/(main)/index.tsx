import { ScrollView, StyleSheet } from "react-native";

// Components
import {
  BannerList,
  CategoryList,
  ProductPreview,
  StoreList,
} from "@/components/ui/home";

// Themes
import { background } from "@/themes";

// Hooks
import { useGetProducts, useHandleExpiredToken } from "@/hooks";

const Home = () => {
  const { data, error, isLoading } = useGetProducts();

  useHandleExpiredToken(JSON.parse(error?.message ?? "{}"));

  return (
    <ScrollView style={styles.container}>
      <BannerList style={styles.banner} />

      <CategoryList style={styles.category} />

      <ProductPreview
        style={styles.productList}
        title="New Product"
        data={data}
        errorMessage={error?.message}
        isLoading={isLoading}
      />

      <ProductPreview
        style={styles.productList}
        title="Popular Product"
        data={data}
        errorMessage={error?.message}
        isLoading={isLoading}
      />

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
