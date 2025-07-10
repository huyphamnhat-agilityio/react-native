import { Button, Text } from "@/components/common";
import { SCREEN_WIDTH } from "@/constants";
import { Store } from "@/interfaces";
import { background, border, borderRadius } from "@/themes";
import { Image, ImageBackground } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

const StoreCard = ({ id, name, avatar, background }: Store) => {
  return (
    <ImageBackground
      style={styles.container}
      key={id}
      source={{ uri: background }}
      imageStyle={styles.image}
    >
      <View style={styles.wrapper}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text textVariant="quaternary" font="Montserrat_500Medium" size={3.5}>
          {name}
        </Text>
      </View>
      <Button
        title="Follow"
        titleFont="Montserrat_500Medium"
        titleSize={3}
        style={styles.button}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 2 - 25,
    height: SCREEN_WIDTH / 2 + 15,
    backgroundColor: background.white,
    borderRadius: borderRadius["2.5"],
    borderColor: border.black_opacity_10,
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  wrapper: {
    gap: 8,
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH / 2 - 25,
    height: SCREEN_WIDTH / 4 + 5,
    borderTopStartRadius: borderRadius["2.5"],
    borderTopEndRadius: borderRadius["2.5"],
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    borderColor: border.white,
    borderWidth: 1,
  },
  content: {
    padding: 12,
    flexDirection: "column",
    gap: 16,
  },
  button: {
    alignSelf: "center",
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: borderRadius[6],
  },
});
export default StoreCard;
