import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

// Components
import Text from "../Text";

// Themes
import { background, border, borderRadius } from "@/themes";

// Constants
import { SCREEN_WIDTH } from "@/constants";

// Interfaces
import { Product } from "@/interfaces";
import { TradlyIcon } from "@/components/icons";

const ProductCard = ({ id, name, imageUrl, price }: Product) => {
  return (
    <View style={styles.container} key={id}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text textVariant="quaternary" font="Montserrat_500Medium" size={3.5}>
          {name}
        </Text>
        <View style={styles.description}>
          <View style={styles.wrapper}>
            <TradlyIcon />
            <Text
              textVariant="secondary"
              font="Montserrat_500Medium"
              size={3.5}
            >
              Tradly
            </Text>
          </View>
          <Text textVariant="primary" font="Montserrat_600SemiBold" size={3.5}>
            ${price}
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
    borderColor: border.black_opacity_10,
    borderWidth: 1,
    flexDirection: "column",
  },
  image: {
    width: SCREEN_WIDTH / 2 - 25,
    height: SCREEN_WIDTH / 2 - 65,
    borderTopStartRadius: borderRadius["2.5"],
    borderTopEndRadius: borderRadius["2.5"],
  },
  content: {
    padding: 12,
    flexDirection: "column",
    gap: 16,
  },
  wrapper: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default ProductCard;
