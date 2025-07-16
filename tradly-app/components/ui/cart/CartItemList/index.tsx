import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { memo } from "react";

// Components
import { Text } from "@/components/common";
import CartItem from "../CartItem";

// Themes
import { colors } from "@/themes";

// Types & Interfaces
import { CartItemData } from "@/interfaces";

export type CartItemListProps = {
  data: CartItemData[];
  isLoading?: boolean;
  errorMessage?: string;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => Promise<void>;
};

const CartItemList = memo(
  ({
    data = [],
    isLoading,
    errorMessage,
    onRemove,
    onUpdateQuantity,
  }: CartItemListProps) => {
    const handleRenderItem = ({ item }: { item: CartItemData }) => {
      return (
        <CartItem {...item} onUpdate={onUpdateQuantity} onRemove={onRemove} />
      );
    };

    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.green_200} />
        </View>
      );
    }

    if (errorMessage) {
      return (
        <View style={styles.centered}>
          <Text font="Montserrat_600SemiBold" textVariant="secondary" size={4}>
            {errorMessage}
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        style={styles.cartContainer}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={handleRenderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text
            font="Montserrat_600SemiBold"
            textVariant="secondary"
            size={4}
            style={styles.message}
          >
            No product was added in cart.
          </Text>
        }
      />
    );
  },
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cartContainer: {
    marginTop: 8,
  },
  contentContainer: {
    gap: 6,
  },

  message: {
    textAlign: "center",
    marginVertical: "auto",
  },
});

CartItemList.displayName = "CartItemList";
export default CartItemList;
