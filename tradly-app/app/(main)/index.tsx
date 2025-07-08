import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/common";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
