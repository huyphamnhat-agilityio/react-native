import { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { useCallback, useRef, useState } from "react";

// Themes
import { background } from "@/themes";

// Components
import { Button } from "@/components/common";
import { OnboardingCarousel } from "@/components/ui/onboarding";

// Constants
import { ONBOARDING_SLIDES } from "@/constants";

const Onboarding = () => {
  const ref = useRef<ICarouselInstance | null>(null);
  const progress = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onPressPagination = useCallback(
    (index: number) => {
      const current = progress.get();
      ref.current?.scrollTo({
        count: index - current,
        animated: true,
      });
    },
    [progress],
  );

  const handleScrollToNext = useCallback(() => {
    const current = progress.get();
    if (current === ONBOARDING_SLIDES.length - 1) {
      return;
    }

    ref.current?.scrollTo({
      count: 1,
      animated: true,
    });
  }, [progress]);

  const renderBoardingButton = useCallback(() => {
    if (currentIndex === ONBOARDING_SLIDES.length - 1) {
      return (
        <Button
          variant="primary"
          titleFont="Montserrat_600SemiBold"
          rounded={6}
          title="Finish"
          style={styles.button}
          onPress={() => {}}
        />
      );
    }
    return (
      <Button
        variant="primary"
        titleFont="Montserrat_600SemiBold"
        rounded={6}
        title="Next"
        style={styles.button}
        onPress={handleScrollToNext}
      />
    );
  }, [currentIndex, handleScrollToNext]);

  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <OnboardingCarousel
        ref={ref}
        data={ONBOARDING_SLIDES}
        progress={progress}
        onPressPagination={onPressPagination}
        setCurrentIndex={setCurrentIndex}
      />

      <View style={styles.buttonWrapper}>{renderBoardingButton()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: background.white,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  background: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "45%",
    backgroundColor: background.primary,
  },
  buttonWrapper: {
    width: "100%",
    paddingHorizontal: 30,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    marginTop: 30,
  },
});
export default Onboarding;
