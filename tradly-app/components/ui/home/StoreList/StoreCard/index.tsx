import React from "react";
import { StyleSheet, View } from "react-native";
import { Image, ImageBackground } from "expo-image";

// Components
import { Button, Text } from "@/components/common";

// Types
import { Store } from "@/interfaces";

// Themes
import { background, border, borderRadius } from "@/themes";

// Hooks
import { useScreenDimensions } from "@/store";
import { TABLET_DEVICE_WIDTH } from "@/constants";

const StoreCard = ({ id, name, avatar, background }: Store) => {
  const { screenWidth } = useScreenDimensions();
  return (
    <ImageBackground
      style={[
        styles.container,
        {
          width: screenWidth / 2 - 25,
          height: screenWidth / 2 + 15,
        },
      ]}
      key={id}
      source={{ uri: background }}
      imageStyle={[
        styles.image,
        {
          width: screenWidth / 2 - 27,
          height: screenWidth / 4 + 5,
        },
      ]}
    >
      <View style={styles.wrapper}>
        <Image
          source={{ uri: avatar }}
          style={[
            styles.avatar,
            {
              width: screenWidth / 8 + 32,
              height: screenWidth / 8 + 32,
            },
          ]}
        />
        <Text
          textVariant="quaternary"
          size={screenWidth >= TABLET_DEVICE_WIDTH ? 7.5 : 3.5}
        >
          {name}
        </Text>
      </View>
      <Button
        title="Follow"
        width={screenWidth >= TABLET_DEVICE_WIDTH ? "60%" : "auto"}
        titleSize={screenWidth >= TABLET_DEVICE_WIDTH ? 7.5 : 3}
        style={styles.button}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background.white,
    borderRadius: borderRadius["2.5"],
    borderColor: border.black_opacity_10,
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 20,
    paddingBottom: 20,
  },
  wrapper: {
    gap: 8,
    alignItems: "center",
  },
  image: {
    borderTopLeftRadius: borderRadius["2.5"],
    borderTopRightRadius: borderRadius["2.5"],
  },
  avatar: {
    borderRadius: borderRadius.full,
    borderColor: border.white,
    borderWidth: 1,
  },
  content: {
    padding: 12,
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
