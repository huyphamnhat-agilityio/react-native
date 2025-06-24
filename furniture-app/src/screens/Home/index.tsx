import { memo, useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native';

// Components
import { CategoryList, ProductList } from 'src/components';
import { HomeHeader, HomeSearchBar } from './components';

// Hooks
import { useDebounce, useGetInfinitiveProducts } from 'src/hooks';

// Constants
import { CATEGORIES, SCREENS } from 'src/constants';

// Types & Interfaces
import { HomeTabsScreenProps } from 'src/interfaces/navigation';

// Themes
import { colors } from 'src/themes';

const HomeScreen = memo(
  ({ navigation: { navigate } }: HomeTabsScreenProps<'Home'>) => {
    const [category, setCategory] = useState<string>(CATEGORIES[0].title);
    const {
      value: searchQuery,
      debouncedValue: debouncedSearchQuery,
      setValue: setSearchQuery,
    } = useDebounce('', 500);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const searchAnimation = useRef(new Animated.Value(0)).current;

    const {
      data = [],
      isLoading,
      isFetching,
      fetchNextPage,
      hasNextPage,
      resetData,
      isError,
      error,
    } = useGetInfinitiveProducts({
      ...(category !== CATEGORIES[0].title && {
        category: {
          _like: category,
        },
      }),
      name: {
        _like: debouncedSearchQuery,
      },
    });

    const toggleSearch = useCallback(() => {
      const toValue = isSearchVisible ? 0 : 1;

      Animated.timing(searchAnimation, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }).start();

      setIsSearchVisible(!isSearchVisible);

      if (isSearchVisible) {
        setSearchQuery('');
      }
    }, [isSearchVisible, searchAnimation, setSearchQuery]);

    const handleNavigateToCart = useCallback(
      () => navigate(SCREENS.MAIN.CART),
      [navigate],
    );

    const handleSetCategory = useCallback(
      (categoryTitle: string) => {
        categoryTitle !== category && setCategory(categoryTitle);
      },
      [category],
    );

    const handleProductCardPress = useCallback(
      (id: string) => () => {
        navigate(SCREENS.MAIN.PRODUCT_DETAIL, { id });
      },
      [navigate],
    );

    const searchHeight = searchAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 40],
    });

    const searchOpacity = searchAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View style={styles.container}>
        <HomeHeader
          onToggleSearch={toggleSearch}
          onNavigateToCart={handleNavigateToCart}
        />

        <HomeSearchBar
          searchHeight={searchHeight}
          searchOpacity={searchOpacity}
          searchQuery={searchQuery}
          onChangeQuery={setSearchQuery}
        />

        <CategoryList category={category} setCategory={handleSetCategory} />

        {isLoading ? (
          <View style={styles.wrapper}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <ProductList
            fetchNextPage={isError ? undefined : fetchNextPage}
            hasNextPage={hasNextPage}
            products={data}
            isRefreshing={isLoading}
            isFetching={isFetching}
            resetData={resetData}
            handlePress={handleProductCardPress}
            errorMessage={error?.message}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

HomeScreen.displayName = 'HomeScreen';

export default HomeScreen;
