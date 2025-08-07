import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// Icons
import { TradlyBigIcon } from "@/components/icons";

// Components
import { Button, Text } from "@/components/common";

// Themes
import { background } from "@/themes";

const ProductDetailStore = memo(() => {
  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.storeWrapper}>
      <View style={styles.storeInfo}>
        <TradlyBigIcon />
        <Text textVariant="quaternary" size={3.5}>
          Tradly Store
        </Text>
      </View>
      <Button
        title="Follow"
        titleSize={3}
        rounded={6}
        style={styles.followButton}
      />
    </Animated.View>
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
