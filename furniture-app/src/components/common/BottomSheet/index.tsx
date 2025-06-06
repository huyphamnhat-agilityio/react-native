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
  toggleSheet: () => void;
  duration?: number;
  children: React.ReactNode;
} & ViewProps;

const BottomSheet = ({
  isOpen,
  toggleSheet,
  duration = 500,
  children,
  style,
}: BottomSheetProps) => {
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, {duration}),
  );

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: progress.value * 2 * height.value}],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, {duration: 0})),
  }));

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={styles.flex} onPress={toggleSheet} />
      </Animated.View>
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
    height: 'auto',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    zIndex: 9999,
    backgroundColor: colors.white,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.backdrop,
  },
});

export default BottomSheet;
