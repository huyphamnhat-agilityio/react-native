import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ImageBackground } from "expo-image";
import { Link } from "expo-router";

// Components
import { Text } from "@/components/common";

// Store
import { useScreenDimensions } from "@/store";

// Constants
import { TABLET_DEVICE_WIDTH } from "@/constants";

export type CategoryItemProps = {
  id: string;
  imageUrl: string;
  title: string;
};

const CategoryItem = memo(({ id, imageUrl, title }: CategoryItemProps) => {
  const { screenWidth } = useScreenDimensions();
  return (
    <Link
      href={{
        pathname: "/(main_stacks)/category/[category]",
        params: { category: title },
      }}
      asChild
    >
      <TouchableOpacity key={id} activeOpacity={0.8}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={[
            styles.container,
            {
              width: screenWidth / 4,
              height: screenWidth / 4 - 1,
            },
          ]}
          cachePolicy="memory-disk"
        >
          <Text
            textVariant="white"
            font="Montserrat_600SemiBold"
            size={screenWidth >= TABLET_DEVICE_WIDTH ? 5 : 2.5}
          >
            {title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

CategoryItem.displayName = "CategoryItem";
export default CategoryItem;
