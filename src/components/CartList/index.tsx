import {FlatList, StyleSheet} from 'react-native';

// Types & Interfaces
import {CartItemData} from 'src/interfaces';

// Components
import {CartItem, Text} from 'src/components/common';

export interface CartListProps extends Partial<FlatList> {
  cartItems: Array<CartItemData>;
}
const CartList = ({cartItems}: CartListProps) => {
  return (
    <FlatList
      data={cartItems}
      contentContainerStyle={styles.contentContainer}
      renderItem={({item, index}) => (
        <CartItem
          key={item.id}
          data={item}
          hasDividerStroke={index < cartItems.length - 1}
        />
      )}
      ListEmptyComponent={<Text style={styles.text}>No product in cart.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  contentContainer: {
    gap: 12,
  },
});

export default CartList;
