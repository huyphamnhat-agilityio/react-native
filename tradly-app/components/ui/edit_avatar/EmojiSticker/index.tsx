import { memo } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type EmojiStickerProps = {
  imageSize: number;
  stickerSource: string;
  imageWidth: number;
  imageHeight: number;
};

const EmojiSticker = memo(
  ({
    imageSize,
    stickerSource,
    imageWidth,
    imageHeight,
  }: EmojiStickerProps) => {
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const clampPosition = () => {
      "worklet";
      const half = scaleImage.value / 2;
      const maxX = imageWidth / 2 - half;
      const maxY = imageHeight / 2 - half;

      translateX.value = Math.max(-maxX, Math.min(translateX.value, maxX));
      translateY.value = Math.max(-maxY, Math.min(translateY.value, maxY));
    };

    // Drag gesture
    const drag = Gesture.Pan().onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
      clampPosition();
    });

    // Pinch gesture
    const pinch = Gesture.Pinch().onUpdate((event) => {
      const newSize = imageSize * event.scale;
      // Clamp scale between 1x and 3x
      scaleImage.value = Math.max(imageSize, Math.min(newSize, imageSize * 3));
      clampPosition();
    });

    const combinedGesture = Gesture.Simultaneous(drag, pinch);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: withTiming(scaleImage.value / imageSize) },
      ],
    }));

    return (
      <GestureDetector gesture={combinedGesture}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            position: "absolute",
            top: imageHeight / 2,
            left: imageWidth / 2,
            transform: [
              { translateX: -imageSize / 2 },
              { translateY: -imageSize / 2 },
            ],
          }}
        >
          <Animated.Image
            source={{ uri: stickerSource }}
            resizeMode="contain"
            style={[{ width: imageSize, height: imageSize }, animatedStyle]}
          />
        </Animated.View>
      </GestureDetector>
    );
  },
);

EmojiSticker.displayName = "EmojiSticker";
export default EmojiSticker;
