import {memo, useCallback} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';

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
import {MEDIUM_DEVICE_HEIGHT} from 'src/constants';

// Hooks
import {useGetCart} from 'src/hooks';

export type CartScreenProps = {
  navigation: StackNavigation;
};

const height = Dimensions.get('window').height;

const CartScreen = memo(({navigation: {navigate}}: CartScreenProps) => {
  const userId = useUserStore(state => state.user?.id);

  const {data, isLoading, error} = useGetCart({
    id: userId,
  });

  const {items = []} = data || {};

  const handleCheckoutPress = useCallback(
    () => navigate('Checkout'),
    [navigate],
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
      <CartItem key={item.id} data={item} />
    ),
    [],
  );
  // const totalMoney = getTotalMoney();
  return (
    <View style={styles.container}>
      {(() => {
        if (error?.message) {
          return <Text style={styles.message}>{error.message}</Text>;
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
            {/* $ {totalMoney.toFixed(2)} */}
          </Text>
        </View>

        <Button
          style={styles.button}
          onPress={handleCheckoutPress}
          // disabled={totalMoney === 0}
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
