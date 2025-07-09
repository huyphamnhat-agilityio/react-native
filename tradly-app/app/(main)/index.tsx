import { ScrollView, StyleSheet } from "react-native";

// Components
import { BannerList, CategoryList } from "@/components/ui/home";

// Themes
import { colors } from "@/themes";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <BannerList style={styles.banner} />
      <CategoryList style={styles.category} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  banner: {
    marginTop: 12,
  },
  category: {
    marginTop: 16,
  },
});

export default Home;
