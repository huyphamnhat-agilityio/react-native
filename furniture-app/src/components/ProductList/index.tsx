import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import {memo, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
// Constants
import {ERROR_MESSAGE} from 'src/constants';
// Types & Interfaces
import {Product} from 'src/interfaces';

// Components
import {Text} from '../common';
import ProductCard from '../ProductCard';

export type ProductListProps = Partial<FlatListProps<Product>> & {
  products: Array<Product>;
  fetchNextPage?: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<Product[], unknown>, Error>
  >;
  hasNextPage?: boolean;
  resetData?: () => void;
  isRefreshing?: boolean;
  isFetching?: boolean;
  handlePress?: (id: string) => () => void;
  errorMessage?: string;
};
const ProductList = memo(
  ({
    products,
    fetchNextPage,
    hasNextPage = false,
    resetData,
    isRefreshing = false,
    isFetching = false,
    handlePress,
    errorMessage = ERROR_MESSAGE.PRODUCT_LIST[404],
    ...props
  }: ProductListProps) => {
    const handleRenderItem = useCallback(
      ({item: {variants, name, price, id}}: ListRenderItemInfo<Product>) => (
        <ProductCard
          onPress={handlePress?.(id)}
          image={variants[0].image}
          name={name}
          testID={`product-${id}`}
          price={price}
        />
      ),
      [handlePress],
    );

    const handleFetchNextPage = useCallback(() => {
      if (!isFetching && hasNextPage) {
        fetchNextPage?.();
      }
    }, [fetchNextPage, hasNextPage, isFetching]);

    const handleRefresh = useCallback(() => resetData?.(), [resetData]);

    return (
      <FlatList
        testID="product-list"
        style={styles.container}
        keyExtractor={item => item.id}
        data={products}
        numColumns={2}
        horizontal={false}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={handleRenderItem}
        onEndReached={handleFetchNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasNextPage ? <ActivityIndicator size="large" color="black" /> : null
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.wrapper}>
            <Text style={styles.message}>{errorMessage}</Text>
          </View>
        }
        initialNumToRender={4}
        maxToRenderPerBatch={8}
        {...props}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  contentContainer: {
    gap: 20,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
  },
});

export default ProductList;
