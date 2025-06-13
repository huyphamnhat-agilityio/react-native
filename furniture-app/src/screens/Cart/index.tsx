import {memo, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {getCrashlytics, recordError} from '@react-native-firebase/crashlytics';

// Types & Interfaces
import {CartItemData, StackNavigation} from 'src/interfaces';

// Components
import {Button, Text} from 'src/components/common';
import {CartItem, CartList} from 'src/components';

// Store
import {useUserStore} from 'src/store';

// Themes
import {colors} from 'src/themes';

// Constants
import {MEDIUM_DEVICE_HEIGHT, QUERY_KEY} from 'src/constants';

// Hooks
import {useGetCart, useUpdateCart} from 'src/hooks';

// Utils
import {getTotalMoney} from 'src/utils';

export type CartScreenProps = {
  navigation: StackNavigation;
};

const height = Dimensions.get('window').height;

const CartScreen = memo(({navigation: {navigate}}: CartScreenProps) => {
  const userId = useUserStore(state => state.user?.id) ?? '';

  const {
    data,
    isLoading,
    error: getCartError,
  } = useGetCart({
    id: userId,
  });

  const {items = []} = data || {};

  const {mutateAsync: updateCart, isPending} = useUpdateCart();

  const totalMoney = getTotalMoney(items);

  const queryClient = useQueryClient();

  const handleCheckout = useCallback(
    () => navigate('Checkout', {totalMoney}),
    [navigate, totalMoney],
  );

  const handleRemove = useCallback(
    async (color: string) => {
      const updatedItems = [...items].filter(
        item => item.selectedColor !== color,
      );

      await updateCart(
        {
          userId,
          items: updatedItems,
        },
        {
          onSuccess: () => {
            queryClient.setQueryData(QUERY_KEY.CARTS({id: userId}), {
              ...queryClient.getQueryData(QUERY_KEY.CARTS({id: userId})),
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
    [items, queryClient, updateCart, userId],
  );

  const handleUpdateQuantity = useCallback(
    async (id: string, color: string, quantity: number) => {
      const updatedItems = [...items];

      const item = updatedItems.find(
        p => p.id === id && p.selectedColor === color,
      );

      if (item) {
        item.quantity = quantity;
      }

      await updateCart(
        {
          userId,
          items: updatedItems,
        },
        {
          onSuccess: () => {
            queryClient.setQueryData(QUERY_KEY.CARTS({id: userId}), {
              ...queryClient.getQueryData(QUERY_KEY.CARTS({id: userId})),
              items: updatedItems,
            });
          },
          onError: error => {
            Alert.alert(
              'Change Quantity Failed',
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
    [items, queryClient, updateCart, userId],
  );

  const CartSeparatorComponent = useCallback(
    () => (
      <View style={styles.separatorWrapper}>
        <View style={styles.separator} />
      </View>
    ),
    [],
  );

  const handleRenderItem = useCallback(
    ({item}: ListRenderItemInfo<CartItemData>) => (
      <CartItem
        key={item.id}
        data={item}
        onRemove={handleRemove}
        onUpdate={handleUpdateQuantity}
        isDisabled={isPending}
      />
    ),
    [handleRemove, handleUpdateQuantity, isPending],
  );

  return (
    <View style={styles.container}>
      {(() => {
        if (getCartError?.message) {
          return <Text style={styles.message}>{getCartError.message}</Text>;
        }
        if (isLoading) {
          return (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size="large" color="black" />
            </View>
          );
        }
        return (
          <CartList
            removeClippedSubviews={false}
            data={items}
            renderItem={handleRenderItem}
            ItemSeparatorComponent={CartSeparatorComponent}
          />
        );
      })()}
      <View style={styles.wrapper}>
        <View style={styles.stat}>
          <Text font="NunitoSansBold" size="lg" textVariant="quaternary">
            Total:
          </Text>
          <Text font="NunitoSansBold" size="lg" textVariant="secondary">
            $ {totalMoney.toFixed(2)}
          </Text>
        </View>

        <Button
          style={styles.button}
          onPress={handleCheckout}
          disabled={totalMoney === 0}
          width="100%"
          rounded="md"
          titleFont="NunitoSansSemiBold"
          titleSize="md"
          title="Check out"
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: height >= MEDIUM_DEVICE_HEIGHT ? 30 : 15,
    gap: 20,
  },
  wrapper: {
    gap: 20,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    textAlign: 'center',
  },
  stat: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 16,
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
});

CartScreen.displayName = 'CartScreen';

export default CartScreen;
