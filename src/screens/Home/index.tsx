import {useState} from 'react';
import {StyleSheet, View} from 'react-native';

// Components
import {ProductCard, Text} from 'src/components/common';
import {CategoryList} from 'src/components';
import {CartIcon, SearchIcon} from 'src/components/icons';

// Themes
import {colors} from 'src/themes';

const HomeScreen = () => {
  const [category, setCategory] = useState('Popular');

  // const {data} = useGetProducts();

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

      <ProductCard
        image="https://i.ibb.co/7QXpRPv/chill-guy-memes-have-flooded-social-media-241142207-16x9-0.jpg"
        name="Chill guy"
        price={12.22}
      />
      {/* {data?.map(value => (
        <Text key={value.name}>{value.name}</Text>
      ))} */}
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
});

export default HomeScreen;
