import { memo, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useShallow } from 'zustand/shallow';

// Components
import { Button } from 'src/components/common';
import {
  DeliveryMethodCard,
  PaymentCard,
  ShippingAddressCard,
  TotalCard,
} from 'src/components';

// Themes
import { colors } from 'src/themes';

// Store
import { useUserStore } from 'src/store';

// Types & Interfaces
import { MainStacksScreenProps } from 'src/interfaces';

// Hooks
import { useUpdateCart } from 'src/hooks';

// Constants
import { PLACEHOLDER_ADDRESS, QUERY_KEY } from 'src/constants';

const CheckoutScreen = memo(
  ({
    navigation,
    route: {
      params: { totalMoney },
    },
  }: MainStacksScreenProps<'Checkout'>) => {
    const [isLoading, setIsLoading] = useState(false);
    const { currentAddress, userId } = useUserStore(
      useShallow(state => ({
        currentAddress: state.currentAddress ?? PLACEHOLDER_ADDRESS,
        userId: state.user?.id ?? '',
      })),
    );

    const { mutateAsync: updateCart } = useUpdateCart();
    const queryClient = useQueryClient();

    const handleCheckoutPress = useCallback(async () => {
      setIsLoading(true);
      await updateCart(
        {
          userId,
          items: [],
        },
        {
          onSuccess: () => {
            queryClient.setQueryData(QUERY_KEY.CARTS({ id: userId }), {
              ...queryClient.getQueryData(QUERY_KEY.CARTS({ id: userId })),
              items: [],
            });
          },
        },
      );

      setIsLoading(false);
      navigation.reset({
        index: 1,
        routes: [{ name: 'HomeTabs' }, { name: 'Success' }],
      });
    }, [updateCart, userId, queryClient, navigation]);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <ShippingAddressCard
            name={currentAddress.name}
            address={currentAddress.address}
          />

          <PaymentCard number="**** **** **** 3947" />

          <DeliveryMethodCard />

          <TotalCard order={totalMoney} delivery={5} />

          <Button
            width="100%"
            title="SUBMIT ORDER"
            titleFont="NunitoSansSemiBold"
            titleSize="md"
            rounded="md"
            style={styles.button}
            disabled={isLoading || !currentAddress.id}
            onPress={handleCheckoutPress}
          />
        </View>
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 30,
  },
  button: {
    paddingVertical: 16,
    marginTop: 'auto',
  },
});

CheckoutScreen.displayName = 'CheckoutScreen';

export default CheckoutScreen;
