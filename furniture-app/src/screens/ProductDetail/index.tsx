import { useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';

import {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';

import notifee, { AndroidImportance } from '@notifee/react-native';

// Components
import { Button } from 'src/components/common';
import { ProductDetailCarousel, ProductDetailContent } from './components';

// Icons
import { BackArrowIcon } from 'src/components/icons';

// Constants
import { QUERY_KEY, SCREENS, SUCCESS_MESSAGE } from 'src/constants';

// Hooks
import {
  useGetCart,
  useGetFavorites,
  useProductDetail,
  useUpdateCart,
  useUpdateFavorites,
} from 'src/hooks';

// Stores
import { useUserStore } from 'src/store';

// Themes
import { borderRadius, colors } from 'src/themes';

// Types & Interfaces
import { MainStacksScreenProps } from 'src/interfaces';

const ProductDetailScreen = memo(
  ({
    route: {
      params: { id },
    },
    navigation: { goBack, canGoBack, navigate },
  }: MainStacksScreenProps<'ProductDetail'>) => {
    const [quantity, setQuantity] = useState(1);

    const userId = useUserStore(state => state.user?.id) ?? '';

    const { data: currentCart, isLoading: isLoadingCart } = useGetCart({
      id: userId,
    });

    const { items: currentCartItems = [] } = currentCart || {};

    const { data: currentFavorites, isLoading: isLoadingFavorites } =
      useGetFavorites({ id: userId });

    const { items: currentFavoritesItems = [] } = currentFavorites || {};

    const { mutateAsync: updateCart, isPending: isAddingToCart } =
      useUpdateCart();

    const { mutateAsync: updateFavorites, isPending: isAddingToFavorites } =
      useUpdateFavorites();

    const progress = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance | null>(null);

    const { data, isLoading, error: productDetailError } = useProductDetail(id);

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
        const current = progress.get();
        ref.current?.scrollTo({
          count: index - current,
          animated: true,
        });
      },
      [progress],
    );

    const handleBack = useCallback(() => {
      if (canGoBack()) {
        goBack();
      } else {
        navigate(SCREENS.MAIN.HOME_TABS, {
          screen: SCREENS.TABS.HOME,
        });
      }
    }, [canGoBack, goBack, navigate]);

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

      const cartPayload = {
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
            [{ text: 'Ok' }],
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
        body: 'A new product has been added to your favorites.',
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
        : [...currentFavoritesItems, ...(data ? [data] : [])];

      const favoritesPayload = {
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
            [{ text: 'Ok' }],
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

    if (productDetailError) {
      Alert.alert(
        'Get Product Detail Failed',
        productDetailError.message,
        [{ text: 'Return Home', onPress: goBack }],
        { cancelable: true },
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.carouselWrapper}>
            <ProductDetailCarousel
              ref={ref}
              data={variants}
              progress={progress}
              onPressPagination={onPressPagination}
            />
          </View>

          <ProductDetailContent
            name={name}
            price={price}
            rating={rating}
            reviewCount={reviewCount}
            description={description}
            quantity={quantity}
            setQuantity={setQuantity}
            isMarkAsFavorite={isMarkAsFavorite}
            isAddingToFavorites={isAddingToFavorites}
            isLoadingFavorites={isLoadingFavorites}
            isAddingToCart={isAddingToCart}
            isLoadingCart={isLoadingCart}
            handleAddToFavorites={handleAddToFavorites}
            handleAddToCart={handleAddToCart}
          />
        </ScrollView>

        {/* Color Carousel restored */}
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

        <Button
          rounded="sm"
          bgVariant="white"
          IconLeft={<BackArrowIcon />}
          style={styles.buttonBack}
          onPress={handleBack}
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
  carouselWrapper: {
    position: 'relative',
    overflow: 'visible',
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
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 40,
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
