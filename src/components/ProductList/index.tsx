import {memo, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Types & Interfaces
import {Product, StackNavigation} from 'src/interfaces';

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
}
const ProductList = memo(
  ({
    products,
    fetchNextPage,
    hasNextPage = false,
    resetData,
    isRefreshing = false,
    ...props
  }: ProductListProps) => {
    const {navigate} = useNavigation<StackNavigation>();

    const handlePress = useCallback(
      (id: string) => () => {
        navigate('ProductDetail', {
          id,
        });
      },
      [navigate],
    );

    const handleRenderItem = useCallback(
      ({item: {variants, name, price, id}}: ListRenderItemInfo<Product>) => (
        <ProductCard
          onPress={handlePress(id)}
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
        style={styles.container}
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
            <Text>{ERROR_MESSAGE.PRODUCT_LIST[404]}</Text>
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
});

export default ProductList;
