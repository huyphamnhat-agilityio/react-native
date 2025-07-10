import { ScrollView, StyleSheet } from "react-native";

// Components
import { BannerList, CategoryList } from "@/components/ui/home";
import { ProductCard } from "@/components/common";

// Themes
import { background } from "@/themes";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <BannerList style={styles.banner} />
      <CategoryList style={styles.category} />
      <ProductCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.primary,
  },
  banner: {
    marginTop: 12,
  },
  category: {
    marginTop: 16,
  },
});

export default Home;
