import {memo, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Types & Interfaces
import {Product, StackNavigation} from 'src/interfaces';

// Components
import {ProductCard, Text} from '../common';

// Constants
import {ERROR_MESSAGE} from 'src/constants';
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
          testID={`product-${id}`}
          price={price}
        />
      )}
      ListEmptyComponent={
        <View style={styles.wrapper}>
          <Text>{ERROR_MESSAGE.PRODUCT_LIST[404]}</Text>
        </View>
      }
      {...props}
    />
  );
});

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
