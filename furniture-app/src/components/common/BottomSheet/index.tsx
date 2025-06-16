import {StyleSheet, TouchableOpacity, ViewProps} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {colors} from 'src/themes';

export type BottomSheetProps = {
  isOpen: SharedValue<boolean>;
  onClose: () => void;
  duration?: number;
  isDisabled?: boolean;
  children: React.ReactNode;
} & ViewProps;

const BottomSheet = ({
  isOpen,
  onClose,
  duration = 500,
  isDisabled = false,
  children,
  style,
}: BottomSheetProps) => {
  const height = useSharedValue(0);

  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, {duration}),
  );

  const sheetStyle = useAnimatedStyle(() => {
    // Fallback: if height not measured, force very large offset to hide
    const translateY =
      height.value === 0 ? 10000 : progress.value * 2 * height.value;
    return {
      transform: [{translateY}],
    };
  });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: height.value === 0 ? 0 : 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, {duration: 0})),
  }));

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity
          style={styles.flex}
          disabled={isDisabled}
          onPress={onClose}
        />
      </Animated.View>

      {/* Render sheet only when ready */}
      <Animated.View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[styles.sheet, sheetStyle, style]}>
        {children}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.white,
    zIndex: 99,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.backdrop,
  },
});

export default BottomSheet;
