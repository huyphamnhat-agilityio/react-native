import { StyleSheet, View } from "react-native";

// Themes
import { background } from "@/themes";

// Components
import {
  CartBill,
  CartFooter,
  CartItemList,
  NewAddressButton,
} from "@/components/ui/cart";

const Cart = () => {
  return (
    <View style={styles.container}>
      <NewAddressButton />

      <CartItemList />

      <CartBill />

      <CartFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.secondary,
  },
});

export default Cart;
