import { forwardRef, memo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import FastImage from '@d11/react-native-fast-image';
import { Extrapolation, interpolate } from 'react-native-reanimated';

// Themes
import { borderRadius, colors } from 'src/themes';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface ProductDetailCarouselProps {
  data: Array<{ image: string; color: string }>;
  progress: any;
  onPressPagination: (index: number) => void;
}

const ProductDetailCarousel = memo(
  forwardRef<ICarouselInstance, ProductDetailCarouselProps>(
    ({ data, progress, onPressPagination }, ref) => {
      return (
        <View style={styles.wrapper}>
          <Carousel
            ref={ref}
            width={width * 0.86}
            height={height * 0.5}
            style={styles.carousel}
            data={data}
            renderItem={({ item }) => (
              <FastImage
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="stretch"
              />
            )}
            onProgressChange={progress}
          />

          <Pagination.Custom
            size={15}
            progress={progress}
            data={data}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            containerStyle={styles.pagination}
            horizontal
            onPress={onPressPagination}
            customReanimatedStyle={(prog, index, length) => {
              let val = Math.abs(prog - index);
              if (index === 0 && prog > length - 1) {
                val = Math.abs(prog - length);
              }
              return {
                transform: [
                  {
                    translateY: interpolate(
                      val,
                      [0, 1],
                      [0, 0],
                      Extrapolation.CLAMP,
                    ),
                  },
                ],
              };
            }}
          />
        </View>
      );
    },
  ),
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'visible',
  },
  carousel: {
    alignSelf: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: borderRadius.xxl,
  },
  dot: {
    height: 4,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.xs,
  },
  activeDot: {
    width: 30,
    overflow: 'hidden',
    backgroundColor: colors.secondary,
  },
  pagination: {
    gap: 10,
    position: 'absolute',
    bottom: 30,
    right: 60,
  },
});

ProductDetailCarousel.displayName = 'ProductDetailCarousel';

export default ProductDetailCarousel;
