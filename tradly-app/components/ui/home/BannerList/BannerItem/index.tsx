import { ImageBackground } from "expo-image";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// Themes
import { borderRadius, colors } from "@/themes";

// Components
import { Button, Text } from "@/components/common";

export type BannerItemProps = {
  id: string;
  imageUrl: string;
  title: string;
  buttonText: string;
};
const BannerItem = memo(
  ({ id, imageUrl = "", title = "", buttonText = "" }: BannerItemProps) => {
    const entering = FadeIn;

    return imageUrl ? (
      <Animated.View entering={entering} key={id}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.container}
          imageStyle={styles.image}
        >
          <Text textVariant="white" font="Montserrat_600SemiBold" size={3.5}>
            {title}
          </Text>
          <Button
            variant="transparent"
            titleFont="Montserrat_700Bold"
            titleSize={3}
            title={buttonText}
            rounded={3.5}
            style={styles.button}
          />
        </ImageBackground>
      </Animated.View>
    ) : (
      <Animated.View entering={entering} key={id}>
        <View style={[styles.container, { backgroundColor: colors.black }]}>
          <Text textVariant="white" font="Montserrat_600SemiBold" size={3.5}>
            {title}
          </Text>
          <Button
            variant="transparent"
            titleFont="Montserrat_700Bold"
            titleSize={3}
            title={buttonText}
            rounded={3.5}
            style={styles.button}
          />
        </View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 165,
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
    borderRadius: borderRadius[2],
    paddingHorizontal: 16,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  image: {
    borderRadius: borderRadius[2],
  },
});

BannerItem.displayName = "BannerItem";
export default BannerItem;
