import { ComponentType, memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from 'src/components/common';
import { CartList, CartItem } from 'src/components';
import { CartItemData } from 'src/interfaces';

interface CartContentProps {
  items: CartItemData[];
  isLoading: boolean;
  error: Error | null;
  isPending: boolean;
  onRemove: (color: string) => void;
  onUpdateQuantity: (id: string, color: string, quantity: number) => void;
  SeparatorComponent: ComponentType<any> | null | undefined;
}

const CartContent = memo(
  ({
    items,
    isLoading,
    error,
    isPending,
    onRemove,
    onUpdateQuantity,
    SeparatorComponent,
  }: CartContentProps) => {
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
        renderItem={({ item }) => (
          <CartItem
            key={item.id}
            data={item}
            onRemove={onRemove}
            onUpdate={onUpdateQuantity}
            isDisabled={isPending}
          />
        )}
        ItemSeparatorComponent={SeparatorComponent}
      />
    );
  },
);

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    textAlign: 'center',
  },
});

CartContent.displayName = 'CartContent';

export default CartContent;
