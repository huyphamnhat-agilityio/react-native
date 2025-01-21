/* eslint-disable @typescript-eslint/no-shadow */
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {
  Extrapolation,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';

// Components
import {Button, QuantityControl, Text} from 'src/components/common';

// Icons
import {BackArrowIcon, MarkIcon, StarIcon} from 'src/components/icons';

// Constantsn n
import {SUCCESS_MESSAGE} from 'src/constants';

// Hooks
import {useProductDetail} from 'src/hooks';

// Types & Interfaces
import {AppStackScreenProps, CartItemData} from 'src/interfaces';

// Stores
import {useCartStore} from 'src/store';

// Themes
import {borderRadius, colors} from 'src/themes';

const width = Dimensions.get('window').width * 0.86;

const ProductDetailScreen = ({
  route: {
    params: {id},
  },
  navigation: {goBack},
}: AppStackScreenProps<'ProductDetail'>) => {
  const [quantity, setQuantity] = useState(1);
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height * 0.53,
  );

  const addToCart = useCartStore(state => state.addToCart);

  const progress = useSharedValue<number>(0);

  const ref = useRef<ICarouselInstance>(null);

  const {data, isLoading} = useProductDetail(id);

  const {
    id: productId = '',
    variants = [],
    name = '',
    description = '',
    reviewCount = 0,
    rating = 0,
    price = 0,
  } = data || {};

  const onPressPagination = useCallback(
    (index: number) => {
      ref.current?.scrollTo({
        count: index - progress.get(),
        animated: true,
      });
    },
    [progress],
  );

  const handleBack = useCallback(() => goBack(), [goBack]);

  const handleAddToCart = () => {
    const cartItem: CartItemData = {
      id: `${productId}-${variants[progress.get()].color}`,
      productId,
      productName: name,
      quantity,
      price,
      image: variants[progress.get()].image,
      selectedColor: variants[progress.get()].color,
    };

    addToCart(cartItem);

    Keyboard.dismiss();

    ToastAndroid.showWithGravity(
      SUCCESS_MESSAGE.ADD_TO_CART,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setScreenHeight(
          (e.endCoordinates.screenY - e.endCoordinates.height) * 0.94,
        );
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setScreenHeight(Dimensions.get('screen').height * 0.53);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator color="black" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <Button
        rounded="sm"
        bgVariant="white"
        IconLeft={<BackArrowIcon />}
        style={styles.buttonBack}
        onPress={handleBack}
      />

      <View style={styles.carouselWrapper}>
        {/* Color Carousel Pagination */}
        <Pagination.Custom<{color: string}>
          progress={progress}
          data={variants.map(({color}) => ({color}))}
          size={34}
          dotStyle={styles.colorDot}
          activeDotStyle={styles.colorActiveDot}
          containerStyle={styles.colorPagination}
          horizontal
          onPress={onPressPagination}
          renderItem={item => (
            <View
              style={[
                styles.colorCarouselItem,
                {
                  backgroundColor: item.color,
                },
              ]}
            />
          )}
        />

        <Carousel
          ref={ref}
          width={width}
          height={screenHeight}
          style={styles.carousel}
          data={variants}
          renderItem={({item}) => (
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.image}
              resizeMode="stretch"
            />
          )}
          onProgressChange={progress}
        />

        {/* Image Carousel Pagination */}
        <Pagination.Custom
          size={15}
          progress={progress}
          data={variants}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.pagination}
          horizontal
          onPress={onPressPagination}
          customReanimatedStyle={(progress, index, length) => {
            let val = Math.abs(progress - index);
            if (index === 0 && progress > length - 1) {
              val = Math.abs(progress - length);
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

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          font="GelasioMedium"
          size="lg"
          textVariant="secondary">
          {name}
        </Text>

        <View style={styles.wrapper}>
          <Text
            style={styles.price}
            font="NunitoSansBold"
            size="xxl"
            textVariant="secondary">
            $ {price}
          </Text>

          <QuantityControl quantity={quantity} setQuantity={setQuantity} />
        </View>

        <View style={styles.stat}>
          <View style={styles.rate}>
            <StarIcon width={20} height={20} color={colors.yellow} />
            <Text font="NunitoSansBold" size="base" textVariant="secondary">
              {rating}
            </Text>
          </View>

          <Text font="NunitoSansSemiBold" size="sm" textVariant="quaternary">
            (${reviewCount} reviews)
          </Text>
        </View>

        <Text
          numberOfLines={5}
          font="NunitoSansLight"
          size="sm"
          textVariant="quaternary">
          {description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.buttonWrapper}>
            <Button
              bgVariant="secondary"
              rounded="md"
              style={styles.buttonMark}
              IconLeft={<MarkIcon />}
            />

            <Button
              rounded="md"
              title="Add to cart"
              titleFont="NunitoSansSemiBold"
              titleSize="md"
              style={styles.buttonAddToCart}
              onPress={handleAddToCart}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
  buttonBack: {
    position: 'absolute',
    top: 53,
    left: 32,
    zIndex: 99,
    padding: 10,
    shadowColor: colors.shadow.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    boxShadow: '',
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 40,
  },
  carouselWrapper: {
    height: '56%',
    position: 'relative',
    overflow: 'hidden',
  },
  carousel: {
    alignSelf: 'flex-end',
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
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: borderRadius.xxl,
  },
  content: {
    flex: 1,
    marginTop: 25,
    gap: 10,
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  rate: {
    flexDirection: 'row',
    gap: 10,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 15,
  },
  buttonMark: {
    padding: 18,
  },
  buttonAddToCart: {
    flex: 1,
    paddingVertical: 16,
  },
  price: {
    width: '66%',
  },
  colorPagination: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: 15,
    gap: 30,
    alignItems: 'center',
    zIndex: 99,
    top: 130,
    left: 24,
    flexDirection: 'column',
    position: 'absolute',
    shadowColor: colors.shadow.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    boxShadow: '',
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 40,
  },
  colorDot: {
    borderRadius: borderRadius.full,
    borderWidth: 4,
    borderColor: colors.border.tertiary,
  },
  colorActiveDot: {
    borderColor: colors.border.quaternary,
  },
  colorCarouselItem: {
    flex: 1,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailScreen;
