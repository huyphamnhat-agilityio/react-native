import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

// Components
import Text from "../Text";

// Themes
import { background, borderRadius } from "@/themes";

// Constants
import { SCREEN_WIDTH } from "@/constants";

const ProductCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.ibb.co/d4SRdGNM/images-q-tbn-ANd9-Gc-Sr-HRLzy-N58z-G4nfch3oq-A3ohg-6-V1-D0mmg-s.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text textVariant="quaternary" font="Montserrat_500Medium" size={3.5}>
          Product Title
        </Text>
        <View style={styles.description}>
          <Text textVariant="secondary" font="Montserrat_500Medium" size={3.5}>
            Tradly
          </Text>
          <Text textVariant="primary" font="Montserrat_600SemiBold" size={3.5}>
            $99.99
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 2 - 25,
    backgroundColor: background.white,
    borderRadius: borderRadius["2.5"],
    flexDirection: "column",
    marginTop: 12,
    marginRight: 16,
    marginLeft: 16,
  },
  image: {
    width: SCREEN_WIDTH / 2 - 25,
    height: SCREEN_WIDTH / 2 - 15,
    borderTopStartRadius: borderRadius["2.5"],
    borderTopEndRadius: borderRadius["2.5"],
  },
  content: {
    padding: 12,
    flexDirection: "column",
    gap: 16,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default ProductCard;
