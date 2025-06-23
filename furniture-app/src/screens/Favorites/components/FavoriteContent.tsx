import { ComponentType, memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Components
import { Text } from 'src/components/common';
import { FavoriteList, FavoriteItem } from 'src/components';

// Types & Interfaces
import { Product } from 'src/interfaces';

interface FavoriteContentProps {
  items: Product[];
  isLoading: boolean;
  isLoadingCart: boolean;
  error: Error | null;
  onRemove: (id: string) => void;
  onCartPress: (product: Product) => void;
  SeparatorComponent: ComponentType<any> | null | undefined;
  isPending: boolean;
}

const FavoriteContent = memo(
  ({
    items,
    isLoading,
    isLoadingCart,
    error,
    onRemove,
    onCartPress,
    SeparatorComponent,
    isPending,
  }: FavoriteContentProps) => {
    if (error?.message) {
      return <Text style={styles.message}>{error.message}</Text>;
    }

    if (isLoading || isLoadingCart) {
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
        renderItem={({ item }) => (
          <FavoriteItem
            key={item.id}
            data={item}
            onRemove={onRemove}
            onPress={onCartPress}
            isDisabled={isPending}
          />
        )}
        ItemSeparatorComponent={SeparatorComponent}
      />
    );
  },
);

const styles = StyleSheet.create({
  message: {
    flex: 1,
    textAlign: 'center',
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

FavoriteContent.displayName = 'FavoriteContent';

export default FavoriteContent;
