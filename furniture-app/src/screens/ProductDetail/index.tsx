/* eslint-disable @typescript-eslint/no-shadow */
import { useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
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
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';

// Components
import { Button, QuantityControl, Text } from 'src/components/common';

// Icons
import { BackArrowIcon, MarkIcon, StarIcon } from 'src/components/icons';

// Constants
import {
  MEDIUM_DEVICE_HEIGHT,
  QUERY_KEY,
  SUCCESS_MESSAGE,
} from 'src/constants';

// Hooks
import {
  useGetCart,
  useGetFavorites,
  useProductDetail,
  useUpdateCart,
  useUpdateFavorites,
} from 'src/hooks';

// Types & Interfaces
import { AppStackScreenProps, Cart, Favorites } from 'src/interfaces';

// Stores
import { useUserStore } from 'src/store';

// Themes
import { borderRadius, colors } from 'src/themes';

import notifee, { AndroidImportance } from '@notifee/react-native';
import FastImage from '@d11/react-native-fast-image';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProductDetailScreen = memo(
  ({
    route: {
      params: { id },
    },
    navigation: { goBack },
  }: AppStackScreenProps<'ProductDetail'>) => {
    const [quantity, setQuantity] = useState(1);

    const userId = useUserStore(state => state.user?.id) ?? '';

    const { data: currentCart, isLoading: isLoadingCart } = useGetCart({
      id: userId,
    });

    const { items: currentCartItems = [] } = currentCart || {};

    const { data: currentFavorites, isLoading: isLoadingFavorites } =
      useGetFavorites({
        id: userId,
      });

    const { items: currentFavoritesItems = [] } = currentFavorites || {};

    const { mutateAsync: updateCart, isPending: isAddingToCart } =
      useUpdateCart();

    const { mutateAsync: updateFavorites, isPending: isAddingToFavorites } =
      useUpdateFavorites();
    const progress = useSharedValue<number>(0);

    const ref = useRef<ICarouselInstance>(null);

    const { data, isLoading, error } = useProductDetail(id);

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

    const queryClient = useQueryClient();

    const handleAddToCart = useCallback(async () => {
      const itemId = `${productId}-${variants[progress.get()].color}`;

      const updatedItems = currentCartItems.some(item => item.id === itemId)
        ? currentCartItems.map(item =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [
            ...currentCartItems,
            {
              id: itemId,
              productId,
              productName: name,
              quantity,
              price,
              image: variants[progress.get()].image,
              selectedColor: variants[progress.get()].color,
            },
          ];

      const cartPayload: Omit<Cart, 'id'> = {
        userId,
        items: updatedItems,
      };

      await updateCart(cartPayload, {
        onSuccess: () => {
          queryClient.setQueryData(QUERY_KEY.CARTS({ id: userId }), {
            ...queryClient.getQueryData(QUERY_KEY.CARTS({ id: userId })),
            items: updatedItems,
          });
          ToastAndroid.showWithGravity(
            SUCCESS_MESSAGE.ADD_TO_CART,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
        },
        onError: error => {
          recordError(getCrashlytics(), error);
          Alert.alert(
            'Add item to cart failed',
            error.message,
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: true },
          );
        },
      });
    }, [
      currentCartItems,
      name,
      price,
      productId,
      progress,
      quantity,
      queryClient,
      updateCart,
      userId,
      variants,
    ]);

    const isMarkAsFavorite = currentFavoritesItems.some(
      item => item.id === productId,
    );

    const handleDisplayNotification = useCallback(async () => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: 'Furniture App',
        body: 'A new product detail has been added to your favorite.',
        android: {
          channelId,
          smallIcon: 'ic_notification',
          color: colors.black,
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
          importance: AndroidImportance.HIGH,
        },
        data: {
          type: 'ProductDetail',
          id: productId,
        },
      });
    }, [productId]);

    const handleAddToFavorites = useCallback(async () => {
      const updatedItems = currentFavoritesItems.some(
        item => item.id === productId,
      )
        ? currentFavoritesItems.filter(item => item.id !== productId)
        : [...currentFavoritesItems, ...(data !== undefined ? [data] : [])];

      const favoritesPayload: Omit<Favorites, 'id'> = {
        userId,
        items: updatedItems,
      };

      await updateFavorites(favoritesPayload, {
        onSuccess: () => {
          queryClient.setQueryData(QUERY_KEY.FAVORITES({ id: userId }), {
            ...queryClient.getQueryData(QUERY_KEY.FAVORITES({ id: userId })),
            items: updatedItems,
          });

          !isMarkAsFavorite && handleDisplayNotification();

          ToastAndroid.showWithGravity(
            isMarkAsFavorite
              ? SUCCESS_MESSAGE.REMOVE_FROM_FAVORITES
              : SUCCESS_MESSAGE.ADD_TO_FAVORITES,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
        },
        onError: error => {
          recordError(getCrashlytics(), error);
          Alert.alert(
            'Mark item as favorite failed',
            error.message,
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: true },
          );
        },
      });
    }, [
      currentFavoritesItems,
      data,
      handleDisplayNotification,
      isMarkAsFavorite,
      productId,
      queryClient,
      updateFavorites,
      userId,
    ]);

    if (isLoading) {
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator color="black" />
        </View>
      );
    }

    if (error) {
      Alert.alert(
        'Get Product Detail Failed',
        error.message,
        [
          {
            text: 'Return Home',
            onPress: goBack,
          },
        ],
        { cancelable: true },
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.carouselWrapper}>
            <Carousel
              ref={ref}
              width={width * 0.86}
              height={height * 0.5}
              style={styles.carousel}
              data={variants}
              renderItem={({ item }) => (
                <FastImage
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
              textVariant="secondary"
            >
              {name}
            </Text>

            <View style={styles.wrapper}>
              <Text
                style={styles.price}
                font="NunitoSansBold"
                size="xxl"
                textVariant="secondary"
              >
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

              <Text
                font="NunitoSansSemiBold"
                size="sm"
                textVariant="quaternary"
              >
                (${reviewCount} reviews)
              </Text>
            </View>

            <ScrollView style={styles.descriptionWrapper}>
              <Text font="NunitoSansLight" size="sm" textVariant="quaternary">
                {description}
              </Text>
            </ScrollView>
            <View style={styles.footer}>
              <View style={styles.buttonWrapper}>
                <Button
                  bgVariant="secondary"
                  rounded="md"
                  style={styles.buttonMark}
                  disabled={isAddingToFavorites || isLoadingFavorites}
                  IconLeft={
                    <MarkIcon
                      fill={isMarkAsFavorite ? colors.primary : 'none'}
                      color={colors.primary}
                    />
                  }
                  onPress={handleAddToFavorites}
                />

                <Button
                  rounded="md"
                  title="Add to cart"
                  titleFont="NunitoSansSemiBold"
                  titleSize="md"
                  disabled={isAddingToCart || isLoadingCart}
                  style={styles.buttonAddToCart}
                  onPress={handleAddToCart}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <Button
          rounded="sm"
          bgVariant="white"
          IconLeft={<BackArrowIcon />}
          style={styles.buttonBack}
          onPress={handleBack}
        />

        {/* Color Carousel Pagination */}
        <Pagination.Custom<{ color: string }>
          progress={progress}
          data={variants.map(({ color }) => ({ color }))}
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
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexGrow: 1,
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
    position: 'relative',
    overflow: 'visible',
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
    gap: height >= MEDIUM_DEVICE_HEIGHT ? 10 : 4,
    marginTop: 12,
    paddingHorizontal: 25,
    paddingBottom: 10,
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
  descriptionWrapper: {
    height: height * (height >= MEDIUM_DEVICE_HEIGHT ? 0.185 : 0.1),
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
    width: 60,
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

ProductDetailScreen.displayName = 'ProductDetailScreen';

export default ProductDetailScreen;
