import { memo, useCallback } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';

// Store
import { useUserStore } from 'src/store';

// Constants
import { MEDIUM_DEVICE_HEIGHT, QUERY_KEY, SCREENS } from 'src/constants';

// Themes
import { colors } from 'src/themes';

// Hooks
import { useGetCart, useUpdateCart } from 'src/hooks';

// Utils
import { getTotalMoney } from 'src/utils';

// Types & Interfaces
import { MainNavigation } from 'src/interfaces';

// Components
import { CartContent, CartFooter, CartSeparator } from './components';

export type CartScreenProps = {
  navigation: MainNavigation;
};

const height = Dimensions.get('window').height;

const CartScreen = memo(({ navigation: { navigate } }: CartScreenProps) => {
  const userId = useUserStore(state => state.user?.id) ?? '';

  const { data, isLoading, error: cartError } = useGetCart({ id: userId });
  const { items = [] } = data || {};

  const { mutateAsync: updateCart, isPending } = useUpdateCart();
  const queryClient = useQueryClient();
  const totalMoney = getTotalMoney(items);

  const handleCheckout = useCallback(
    () => navigate(SCREENS.MAIN.CHECKOUT, { totalMoney }),
    [navigate, totalMoney],
  );

  const handleRemove = useCallback(
    async (color: string) => {
      const updatedItems = items.filter(item => item.selectedColor !== color);
      await updateCart(
        { userId, items: updatedItems },
        {
          onSuccess: () => {
            queryClient.setQueryData(QUERY_KEY.CARTS({ id: userId }), {
              ...queryClient.getQueryData(QUERY_KEY.CARTS({ id: userId })),
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
    [items, queryClient, updateCart, userId],
  );

  const handleUpdateQuantity = useCallback(
    async (id: string, color: string, quantity: number) => {
      const updatedItems = items.map(item =>
        item.id === id && item.selectedColor === color
          ? { ...item, quantity }
          : item,
      );
      await updateCart(
        { userId, items: updatedItems },
        {
          onSuccess: () => {
            queryClient.setQueryData(QUERY_KEY.CARTS({ id: userId }), {
              ...queryClient.getQueryData(QUERY_KEY.CARTS({ id: userId })),
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
              { cancelable: true },
            );
          },
        },
      );
    },
    [items, queryClient, updateCart, userId],
  );

  return (
    <View style={styles.container}>
      <CartContent
        items={items}
        isLoading={isLoading}
        error={cartError}
        isPending={isPending}
        onRemove={handleRemove}
        onUpdateQuantity={handleUpdateQuantity}
        SeparatorComponent={CartSeparator}
      />
      <CartFooter totalMoney={totalMoney} onCheckout={handleCheckout} />
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
});

CartScreen.displayName = 'CartScreen';

export default CartScreen;
