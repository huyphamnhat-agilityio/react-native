import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ImageBackground } from "expo-image";

// Components
import { Text } from "@/components/common";

// Constants
import { SCREEN_WIDTH } from "@/constants";

export type CategoryItemProps = {
  id: string;
  imageUrl: string;
  title: string;
};

const CategoryItem = memo(({ id, imageUrl, title }: CategoryItemProps) => {
  return (
    <TouchableOpacity key={id} activeOpacity={0.8}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.container}>
        <Text textVariant="white" font="Montserrat_600SemiBold" size={2.75}>
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 4 - 1,
    height: SCREEN_WIDTH / 4 - 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

CategoryItem.displayName = "CategoryItem";
export default CategoryItem;
