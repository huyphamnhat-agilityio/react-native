import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

// Icons
import { TradlyBigIcon } from "@/components/icons";

// Components
import { Button, Text } from "@/components/common";

// Themes
import { background } from "@/themes";

// Constants
import { fadeInLeft400, fadeInRight400 } from "@/constants";

const ProductDetailStore = memo(() => {
  return (
    <View style={styles.storeWrapper}>
      <Animated.View entering={fadeInLeft400} style={styles.storeInfo}>
        <TradlyBigIcon />
        <Text textVariant="quaternary" size={3.5}>
          Tradly Store
        </Text>
      </Animated.View>
      <Animated.View entering={fadeInRight400}>
        <Button
          title="Follow"
          titleSize={3}
          rounded={6}
          style={styles.followButton}
        />
      </Animated.View>
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
