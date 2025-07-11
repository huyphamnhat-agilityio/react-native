import { ActivityIndicator, StyleSheet, View } from "react-native";

// Themes
import { background, colors } from "@/themes";

// Components
import { ProductList } from "@/components/common";

// Hooks
import { useGetProducts } from "@/hooks";

// Store
import { useFilterStore } from "@/store";

const Browse = () => {
  const currentCategory = useFilterStore((state) => state.category);

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
  });
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" color={colors.green_200} />
        </View>
      ) : (
        <ProductList
          products={data}
          fetchNextPage={isError ? undefined : fetchNextPage}
          hasNextPage={hasNextPage}
          isRefreshing={isLoading}
          isFetching={isFetching}
          resetData={resetData}
          errorMessage={error?.message}
        />
      )}
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
