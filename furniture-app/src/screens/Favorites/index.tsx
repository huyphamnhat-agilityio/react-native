import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSharedValue } from 'react-native-reanimated';
import { Alert, ToastAndroid, View, StyleSheet } from 'react-native';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';

// Store
import { useUserStore } from 'src/store';

// Hooks
import {
  useGetCart,
  useGetFavorites,
  useUpdateCart,
  useUpdateFavorites,
} from 'src/hooks';

// Constants
import { QUERY_KEY, SUCCESS_MESSAGE } from 'src/constants';

// Types & Interfaces
import { Cart, Product } from 'src/interfaces';

// Themes
import { colors } from 'src/themes';

//Components
import {
  FavoriteBottomSheet,
  FavoriteContent,
  FavoriteSeparator,
} from './components';

const FavoritesScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<{
    color: string;
    image: string;
  } | null>(null);
  const [quantity, setQuantity] = useState(1);

  const userId = useUserStore(state => state.user?.id) ?? '';

  const { data: currentCart, isLoading: isLoadingCart } = useGetCart({
    id: userId,
  });
  const { items: currentCartItems = [] } = currentCart || {};

  const {
    data,
    isLoading: isLoadingFavorites,
    error: favoritesError,
  } = useGetFavorites({ id: userId });
  const { items = [] } = data || {};

  const { mutateAsync: updateCart, isPending: isAddingToCart } =
    useUpdateCart();
  const { mutateAsync: updateFavorites, isPending } = useUpdateFavorites();

  const queryClient = useQueryClient();
  const isOpen = useSharedValue(false);

  const clearVariants = () => {
    setSelectedVariant(null);
    setQuantity(1);
    setSelectedProduct(null);
  };

  const handleOpenSheet = useCallback(() => {
    isOpen.value = true;
  }, [isOpen]);
  const handleCloseSheet = useCallback(() => {
    isOpen.value = false;
    clearVariants();
  }, [isOpen]);

  const handleCartPress = useCallback(
    (product: Product) => {
      handleOpenSheet();
      setSelectedProduct(product);
    },
    [handleOpenSheet],
  );

  const handleRemove = useCallback(
    async (id: string) => {
      const updatedItems = items.filter(item => item.id !== id);
      await updateFavorites(
        { userId, items: updatedItems },
        {
          onSuccess: () => {
            clearVariants();
            queryClient.setQueryData(QUERY_KEY.FAVORITES({ id: userId }), {
              ...queryClient.getQueryData(QUERY_KEY.FAVORITES({ id: userId })),
              items: updatedItems,
            });
          },
          onError: error => {
            recordError(getCrashlytics(), error);
            Alert.alert(
              'Remove Item Failed',
              error.message,
              [
                {
                  text: 'Ok',
                },
              ],
              { cancelable: true },
            );
          },
        },
      );
    },
    [items, queryClient, updateFavorites, userId],
  );

  const { id: productId = '', name = '', price = 0 } = selectedProduct ?? {};

  const handleAddToCart = useCallback(async () => {
    const itemId = `${productId}-${selectedVariant?.color}`;
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
            image: selectedVariant?.image ?? '',
            selectedColor: selectedVariant?.color ?? '',
          },
        ];
    const cartPayload: Omit<Cart, 'id'> = { userId, items: updatedItems };
    await updateCart(cartPayload, {
      onSuccess: () => {
        handleCloseSheet();
        queryClient.setQueryData(QUERY_KEY.FAVORITES({ id: userId }), {
          ...queryClient.getQueryData(QUERY_KEY.FAVORITES({ id: userId })),
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
          'Add Item To Cart Failed',
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
    handleCloseSheet,
    name,
    price,
    productId,
    quantity,
    queryClient,
    selectedVariant,
    updateCart,
    userId,
  ]);

  return (
    <>
      <View style={styles.container}>
        <FavoriteContent
          items={items}
          isLoading={isLoadingFavorites}
          isLoadingCart={isLoadingCart}
          error={favoritesError}
          onRemove={handleRemove}
          onCartPress={handleCartPress}
          SeparatorComponent={FavoriteSeparator}
          isPending={isPending}
        />
      </View>
      <FavoriteBottomSheet
        selectedProduct={selectedProduct}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        quantity={quantity}
        setQuantity={setQuantity}
        isOpen={isOpen}
        isDisabled={isAddingToCart}
        onClose={handleCloseSheet}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },
});

export default FavoritesScreen;
