import {memo, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

// Types & Interfaces
import {Product} from 'src/interfaces';

// Components
import {ProductCard, Text} from '../common';

// Constants
import {ERROR_MESSAGE} from 'src/constants';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
export interface ProductListProps extends Partial<FlatList> {
  products: Array<Product>;
  fetchNextPage?: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        {
          data: Product[];
          pageParam: number;
        },
        unknown
      >,
      Error
    >
  >;
  hasNextPage?: boolean;
  resetData?: () => void;
  isRefreshing?: boolean;
  handlePress?: (id: string) => () => void;
  errorMessage?: string;
}
const ProductList = memo(
  ({
    products,
    fetchNextPage,
    hasNextPage = false,
    resetData,
    isRefreshing = false,
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

    const handleFetchNextPage = useCallback(
      () => fetchNextPage?.(),
      [fetchNextPage],
    );

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
