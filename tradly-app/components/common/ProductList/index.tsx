import { memo, useCallback } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";

// Types & Interfaces
import { Product } from "@/interfaces";

// Components
import ProductCard from "../ProductCard";
import Text from "../Text";

// Constants
import { ERROR_MESSAGE } from "@/constants";

// Themes
import { colors } from "@/themes";

export type ProductPreviewListProps = {
  style?: ViewStyle;
  products: Product[];
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
    style,
    products,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isRefreshing = false,
    resetData,
    errorMessage = ERROR_MESSAGE.PRODUCT_LIST[404],
  }: ProductPreviewListProps) => {
    const handleFetchNextPage = useCallback(() => {
      if (!isFetching && hasNextPage) {
        fetchNextPage?.();
      }
    }, [fetchNextPage, hasNextPage, isFetching]);

    const handleRefresh = useCallback(() => resetData?.(), [resetData]);

    const handleRenderItem = useCallback(
      ({ item }: { item: Product }) => <ProductCard {...item} />,
      [],
    );

    const ItemSeparatorComponent = useCallback(
      () => <View style={styles.wrapper} />,
      [],
    );

    return (
      <FlashList
        data={products}
        numColumns={2}
        style={style}
        keyExtractor={(item) => item.id}
        renderItem={handleRenderItem}
        onEndReached={handleFetchNextPage}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={
          hasNextPage ? (
            <ActivityIndicator size="large" color={colors.green_200} />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <Text
            font="Montserrat_600SemiBold"
            textVariant="secondary"
            size={4}
            style={styles.message}
          >
            {errorMessage}
          </Text>
        }
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  wrapper: {
    height: 6,
  },
  message: {
    textAlign: "center",
  },
});

ProductList.displayName = "ProductList";
export default ProductList;
