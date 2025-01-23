import {memo, useCallback, useRef, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';

// Components
import {Button, Text, TextInput} from 'src/components/common';
import {CategoryList, ProductList} from 'src/components';

// Icons
import {CartIcon, SearchIcon} from 'src/components/icons';

// Themes
import {colors} from 'src/themes';

// Hooks
import {useDebounce, useGetInfinitiveProducts} from 'src/hooks';

// Constants
import {CATEGORIES} from 'src/constants';

// Types & Interfaces
import {StackNavigation} from 'src/interfaces';
export interface HomeScreenProps {
  navigation: StackNavigation;
}
const HomeScreen = memo(({navigation: {navigate}}: HomeScreenProps) => {
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
    fetchNextPage,
    hasNextPage,
    resetData,
    isError,
  } = useGetInfinitiveProducts({
    category,
    name: debouncedSearchQuery,
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

  const handleCartPress = useCallback(() => navigate('Cart'), [navigate]);
  const handleSetCategory = useCallback(
    (categoryTitle: string) => {
      categoryTitle !== category && setCategory(categoryTitle);
    },
    [category, setCategory],
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
      <View style={styles.header}>
        <SearchIcon onPress={toggleSearch} />
        <View style={styles.headerTitle}>
          <Text font="GelasioNormal" size="base" textVariant="alternative">
            Make home
          </Text>
          <Text font="GelasioBold" size="base">
            BEAUTIFUL
          </Text>
        </View>
        <Button
          style={styles.button}
          bgVariant="none"
          IconLeft={<CartIcon />}
          onPress={handleCartPress}
        />
      </View>

      <Animated.View
        style={[
          styles.searchContainer,
          {
            height: searchHeight,
            opacity: searchOpacity,
          },
        ]}>
        <TextInput
          inputSize="sm"
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </Animated.View>

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
          resetData={resetData}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
  },
  headerTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 0,
  },
  searchContainer: {
    overflow: 'hidden',
  },
});

HomeScreen.displayName = 'HomeScreen';

export default HomeScreen;
