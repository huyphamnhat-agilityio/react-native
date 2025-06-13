import {getCrashlytics, recordError} from '@react-native-firebase/crashlytics';
import {useQueryClient} from '@tanstack/react-query';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ListRenderItemInfo,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

// Components
import {FavoriteItem, FavoriteList} from 'src/components';
import {
  BottomSheet,
  Button,
  QuantityControl,
  Text,
} from 'src/components/common';
import {QUERY_KEY, SUCCESS_MESSAGE} from 'src/constants';

// Hooks
import {
  useGetCart,
  useGetFavorites,
  useUpdateCart,
  useUpdateFavorites,
} from 'src/hooks';

// Types & Interfaces
import {Cart, Product} from 'src/interfaces';

// Store
import {useUserStore} from 'src/store';

// Themes
import {borderRadius, colors} from 'src/themes';

const FavoritesScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<{
    color: string;
    image: string;
  } | null>(null);
  const [quantity, setQuantity] = useState(1);

  const userId = useUserStore(state => state.user?.id) ?? '';

  const {data: currentCart, isLoading: isLoadingCart} = useGetCart({
    id: userId,
  });

  const {mutateAsync: updateCart, isPending: isAddingToCart} = useUpdateCart();

  const {items: currentCartItems = []} = currentCart || {};

  const {
    data,
    isLoading: isLoadingFavorites,
    error: getFavoritesError,
  } = useGetFavorites({
    id: userId,
  });

  const {items = []} = data || {};

  const {mutateAsync: updateFavorites, isPending} = useUpdateFavorites();

  const queryClient = useQueryClient();

  const isOpen = useSharedValue(false);

  const clearVariants = () => {
    setSelectedVariant(null);
    setQuantity(1);
    setSelectedProduct(null);
  };

  const toggleSheet = useCallback(() => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      clearVariants();
    }
  }, [isOpen]);

  const handleCartPress = useCallback(
    (product: Product) => {
      toggleSheet();
      setSelectedProduct(product);
    },
    [toggleSheet],
  );

  const handleRemove = useCallback(
    async (id: string) => {
      const updatedItems = [...items].filter(item => item.id !== id);

      await updateFavorites(
        {
          userId,
          items: updatedItems,
        },
        {
          onSuccess: () => {
            clearVariants();
            queryClient.setQueryData(QUERY_KEY.FAVORITES({id: userId}), {
              ...queryClient.getQueryData(QUERY_KEY.FAVORITES({id: userId})),
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
              {cancelable: true},
            );
          },
        },
      );
    },
    [items, queryClient, updateFavorites, userId],
  );

  const {id: productId = '', name = '', price = 0} = selectedProduct ?? {};

  const handleAddToCart = useCallback(async () => {
    const itemId = `${productId}-${selectedVariant?.color}`;

    const updatedItems = currentCartItems.some(item => item.id === itemId)
      ? currentCartItems.map(item =>
          item.id === itemId
            ? {...item, quantity: item.quantity + quantity}
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

    const cartPayload: Omit<Cart, 'id'> = {
      userId,
      items: updatedItems,
    };

    await updateCart(cartPayload, {
      onSuccess: () => {
        toggleSheet();
        queryClient.setQueryData(QUERY_KEY.CARTS({id: userId}), {
          ...queryClient.getQueryData(QUERY_KEY.CARTS({id: userId})),
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
          {cancelable: true},
        );
      },
    });
  }, [
    currentCartItems,
    name,
    price,
    productId,
    quantity,
    queryClient,
    selectedVariant?.color,
    selectedVariant?.image,
    toggleSheet,
    updateCart,
    userId,
  ]);

  const handleRenderItem = useCallback(
    ({item}: ListRenderItemInfo<Product>) => (
      <FavoriteItem
        key={item.id}
        data={item}
        onRemove={handleRemove}
        onPress={handleCartPress}
        isDisabled={isPending}
      />
    ),
    [handleCartPress, handleRemove, isPending],
  );

  const FavoriteSeparatorComponent = useCallback(
    () => (
      <View style={styles.separatorWrapper}>
        <View style={styles.separator} />
      </View>
    ),
    [],
  );

  return (
    <>
      <View style={styles.container}>
        {(() => {
          if (getFavoritesError?.message) {
            return (
              <Text style={styles.message}>{getFavoritesError.message}</Text>
            );
          }
          if (isLoadingCart || isLoadingFavorites) {
            return (
              <View style={styles.loadingWrapper}>
                <ActivityIndicator size="large" color="black" />
              </View>
            );
          }
          return (
            <FavoriteList
              removeClippedSubviews={false}
              data={items}
              renderItem={handleRenderItem}
              ItemSeparatorComponent={FavoriteSeparatorComponent}
            />
          );
        })()}
      </View>
      <BottomSheet
        isDisabled={isAddingToCart}
        isOpen={isOpen}
        toggleSheet={toggleSheet}
        style={styles.actionSheet}>
        <Text style={styles.actionTitle}>Choose color and quantity</Text>
        <View style={styles.actionWrapper}>
          <View style={styles.colorWrapper}>
            {selectedProduct?.variants.map(variant => (
              <TouchableOpacity
                key={variant.color}
                style={[
                  styles.colorOptionsWrapper,
                  {
                    backgroundColor:
                      selectedVariant?.color === variant.color
                        ? colors.underlay
                        : colors.white,
                  },
                ]}
                onPress={() => {
                  setSelectedVariant(variant);
                }}>
                <View
                  style={[
                    styles.colorOptions,
                    {backgroundColor: variant.color},
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <QuantityControl
            style={styles.quantityControl}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <Button
            width="100%"
            rounded="md"
            title="Add to cart"
            titleFont="NunitoSansSemiBold"
            titleSize="md"
            onPress={handleAddToCart}
            disabled={!selectedVariant || isAddingToCart}
            style={styles.button}
          />
        </View>
      </BottomSheet>
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
  separatorWrapper: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border.tertiary,
  },
  message: {
    flex: 1,
    textAlign: 'center',
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionSheet: {
    gap: 8,
    padding: 12,
  },
  actionTitle: {
    textAlign: 'center',
  },
  actionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 16,
  },
  colorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
  colorOptionsWrapper: {
    borderColor: colors.border.alternative,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: 8,
  },
  colorOptions: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
  },
  quantityControl: {
    alignSelf: 'center',
  },
  button: {
    padding: 8,
  },
});

export default FavoritesScreen;
