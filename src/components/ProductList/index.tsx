import {memo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Product} from 'src/interfaces';
import {ProductCard} from '../common';

export interface ProductListProps extends Partial<FlatList> {
  products: Array<Product>;
}
const ProductList = memo(({products, ...props}: ProductListProps) => {
  return (
    <FlatList
      style={styles.container}
      data={products}
      numColumns={2}
      horizontal={false}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({item: {variants, name, price}}) => (
        <ProductCard image={variants[0].image} name={name} price={price} />
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
