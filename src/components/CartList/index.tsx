import {FlatList, FlatListProps, StyleSheet} from 'react-native';

// Types & Interfaces
import {CartItemData} from 'src/interfaces';

// Components
import {Text} from 'src/components/common';

export interface CartListProps extends FlatListProps<CartItemData> {}
const CartList = ({contentContainerStyle, ...props}: CartListProps) => {
  return (
    <FlatList
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      ListEmptyComponent={
        <Text style={styles.text}>No product was added in cart.</Text>
      }
      {...props}
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
