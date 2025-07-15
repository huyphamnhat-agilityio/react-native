import { memo } from "react";
import { StyleSheet, View } from "react-native";

// Icons
import { TradlyBigIcon } from "@/components/icons";

// Components
import { Button, Text } from "@/components/common";

// Themes
import { background } from "@/themes";

const ProductDetailStore = memo(() => {
  return (
    <View style={styles.storeWrapper}>
      <View style={styles.storeInfo}>
        <TradlyBigIcon />
        <Text font="Montserrat_500Medium" textVariant="quaternary" size={3.5}>
          Tradly Store
        </Text>
      </View>
      <Button
        title="Follow"
        titleFont="Montserrat_500Medium"
        titleSize={3}
        rounded={6}
        style={styles.followButton}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  storeWrapper: {
    marginTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: background.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  storeInfo: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  followButton: {
    paddingVertical: 4,
    paddingHorizontal: 24,
    marginVertical: "auto",
  },
});

ProductDetailStore.displayName = "ProductDetailStore";
export default ProductDetailStore;
