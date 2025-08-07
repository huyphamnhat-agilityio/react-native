import { useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useShallow } from "zustand/shallow";

// Themes
import { background, colors } from "@/themes";

// Components
import { ProductList } from "@/components/common";

// Hooks
import { useGetProducts, useHandleExpiredToken } from "@/hooks";

// Store
import { useFilterStore } from "@/store";

const Browse = () => {
  const {
    currentCategory,
    currentOrder,
    currentSortField,
    currentSearchQuery,
  } = useFilterStore(
    useShallow((state) => ({
      currentCategory: state.category,
      currentSortField: state.sortField,
      currentOrder: state.order,
      currentSearchQuery: state.searchQuery,
    })),
  );

  const {
    data = [],
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    resetData,
    isError,
    error,
  } = useGetProducts({
    category: {
      _like: currentCategory,
    },
    name: {
      _like: currentSearchQuery,
    },
    _sort: currentSortField,
    _order: currentOrder,
  });

  const parsedErrorMessage = useMemo(() => {
    try {
      return JSON.parse(error?.message ?? "{}");
    } catch {
      return {};
    }
  }, [error]);

  useHandleExpiredToken(parsedErrorMessage);

  if (isLoading)
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color={colors.green_200} />
      </View>
    );

  return (
    <View style={styles.container}>
      <ProductList
        products={data}
        fetchNextPage={isError ? undefined : fetchNextPage}
        hasNextPage={hasNextPage}
        isRefreshing={isLoading}
        isFetching={isFetching}
        resetData={resetData}
        errorMessage={error?.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.secondary,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Browse;
