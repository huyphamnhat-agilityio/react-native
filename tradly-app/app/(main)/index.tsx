import { StyleSheet, View } from "react-native";

// Components
import { BannerList } from "@/components/ui/home";

const Home = () => {
  return (
    <View style={styles.container}>
      <BannerList style={styles.list} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 12,
  },
});

export default Home;
