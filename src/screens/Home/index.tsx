import {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

// Components
import {Text} from 'src/components/common';
import {CategoryList, ProductList} from 'src/components';

// Icons
import {CartIcon, SearchIcon} from 'src/components/icons';

// Themes
import {colors} from 'src/themes';

// Hooks
import {useGetProducts} from 'src/hooks';

const HomeScreen = () => {
  const [category, setCategory] = useState('Popular');

  const {data = [], isFetching} = useGetProducts();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchIcon />
        <View style={styles.headerTitle}>
          <Text font="GelasioNormal" size="base" textVariant="alternative">
            Make home
          </Text>
          <Text font="GelasioBold" size="base">
            BEAUTIFUL
          </Text>
        </View>
        <CartIcon />
      </View>

      <CategoryList category={category} setCategory={setCategory} />

      {isFetching ? (
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ProductList products={data} />
      )}
    </View>
  );
};

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
});

export default HomeScreen;
