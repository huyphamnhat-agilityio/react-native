import { Image } from "expo-image";
import { forwardRef, memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import Animated, { SharedValue } from "react-native-reanimated";

// Themes
import { background, borderRadius, colors } from "@/themes";

// Components
import { Text } from "@/components/common";

// Constants
import {
  fadeInLeft400,
  MEDIUM_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/constants";

export type OnboardingCarouselProps = {
  data: { image: string; description: string }[];
  progress: SharedValue<number>;
  onPressPagination: (index: number) => void;
  setCurrentIndex: (index: number) => void;
};

const OnboardingCarousel = memo(
  forwardRef<ICarouselInstance, OnboardingCarouselProps>(
    ({ data, progress, onPressPagination, setCurrentIndex }, ref) => {
      const carouselHeight =
        SCREEN_HEIGHT * (SCREEN_HEIGHT > MEDIUM_DEVICE_HEIGHT ? 0.6 : 0.7);

      const handleRenderItem = useCallback(
        ({ item }: { item: { image: string; description: string } }) => (
          <View style={styles.contentWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.image }}
                contentFit="contain"
                style={styles.image}
                transition={{
                  duration: 400,
                  effect: "cross-dissolve",
                  timing: "ease-in",
                }}
              />
            </View>

            <Text style={styles.description} size={5}>
              {item.description}
            </Text>
          </View>
        ),
        [],
      );

      return (
        <Animated.View entering={fadeInLeft400} style={styles.content}>
          <Carousel
            ref={ref}
            width={SCREEN_WIDTH - 60}
            height={carouselHeight}
            data={data}
            renderItem={handleRenderItem}
            onProgressChange={(_offsetProgress, absoluteProgress) => {
              const newIndex = Math.round(absoluteProgress);
              setCurrentIndex(newIndex);
              progress.value = newIndex;
              return progress;
            }}
            onSnapToItem={setCurrentIndex}
            style={styles.carousel}
            loop={false}
          />

          <Pagination.Basic
            progress={progress}
            data={data}
            size={16}
            dotStyle={{
              borderRadius: 100,
              backgroundColor: colors.green_50,
            }}
            activeDotStyle={{
              borderRadius: 100,
              overflow: "hidden",
              backgroundColor: colors.green_200,
            }}
            containerStyle={[
              {
                gap: 10,
                marginBottom: 10,
              },
            ]}
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
    paddingHorizontal: 30,
    position: "absolute",
    top: SCREEN_HEIGHT > MEDIUM_DEVICE_HEIGHT ? "25%" : "10%",
  },
  contentWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 50,
  },
  carousel: {
    borderRadius: borderRadius[2],
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 30,
  },
  imageWrapper: {
    paddingTop: 50,
    backgroundColor: background.white,
    borderRadius: borderRadius[2],
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 240,
  },
});

OnboardingCarousel.displayName = "OnboardingCarousel";

export default OnboardingCarousel;
