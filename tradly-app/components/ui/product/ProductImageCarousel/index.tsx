import { Image } from "expo-image";
import { forwardRef, memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import Animated, { FadeIn, SharedValue } from "react-native-reanimated";

// Themes
import { colors } from "@/themes";

// Constants
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants";

export type OnboardingCarouselProps = {
  data: { image: string }[];
  progress: SharedValue<number>;
  onPressPagination: (index: number) => void;
};

const carouselHeight = SCREEN_HEIGHT * 0.3;

const ProductImageCarousel = memo(
  forwardRef<ICarouselInstance, OnboardingCarouselProps>(
    ({ data, progress, onPressPagination }, ref) => {
      const handleRenderItem = useCallback(
        ({ item }: { item: { image: string } }) => (
          <Image
            source={{ uri: item.image }}
            contentFit="cover"
            style={styles.image}
          />
        ),
        [],
      );

      return (
        <Animated.View entering={FadeIn} style={styles.content}>
          <Carousel
            ref={ref}
            width={SCREEN_WIDTH}
            height={carouselHeight}
            data={data}
            renderItem={handleRenderItem}
            onProgressChange={(_offsetProgress, absoluteProgress) => {
              const newIndex = Math.round(absoluteProgress);
              progress.value = newIndex;
              return progress;
            }}
            loop={false}
          />

          <Pagination.Basic
            progress={progress}
            data={data}
            size={8}
            dotStyle={{
              borderRadius: 100,
              backgroundColor: colors.white_opacity_30,
            }}
            activeDotStyle={{
              borderRadius: 100,
              overflow: "hidden",
              backgroundColor: colors.green_200,
            }}
            containerStyle={styles.pagination}
            horizontal
            onPress={onPressPagination}
          />
        </Animated.View>
      );
    },
  ),
);

const styles = StyleSheet.create({
  content: {
    position: "relative",
  },

  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
  },

  pagination: {
    gap: 4,
    position: "absolute",
    bottom: "8%",
  },
});

ProductImageCarousel.displayName = "ProductImageCarousel";

export default ProductImageCarousel;
