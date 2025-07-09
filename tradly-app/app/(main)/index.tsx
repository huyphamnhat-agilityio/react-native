import { StyleSheet, View } from "react-native";

// Components
import { Button, Text } from "@/components/common";

// Icons
import { CartIcon } from "@/components/icons";

// Store
import { useUserStore } from "@/store";

const Home = () => {
  const logout = useUserStore((state) => state.clearUserSession);
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={logout} title="Logout" />
      <CartIcon fill="pink" />
      <Button title="Slow" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
