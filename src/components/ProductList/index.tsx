import {memo, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Types & Interfaces
import {Product, StackNavigation} from 'src/interfaces';

// Components
import {ProductCard} from '../common';
export interface ProductListProps extends Partial<FlatList> {
  products: Array<Product>;
}
const ProductList = memo(({products, ...props}: ProductListProps) => {
  const {navigate} = useNavigation<StackNavigation>();

  const handlePress = useCallback(
    (id: string) => () => {
      navigate('ProductDetail', {
        id,
      });
    },
    [navigate],
  );
  return (
    <FlatList
      style={styles.container}
      data={products}
      numColumns={2}
      horizontal={false}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({item: {variants, name, price, id}}) => (
        <ProductCard
          onPress={handlePress(id)}
          image={variants[0].image}
          name={name}
          price={price}
        />
      )}
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  contentContainer: {
    gap: 20,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ProductList;
