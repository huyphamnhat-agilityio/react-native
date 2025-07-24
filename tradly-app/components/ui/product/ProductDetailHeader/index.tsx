import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";

// Components
import { Button } from "@/components/common";

// Themes
import { background, colors } from "@/themes";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CartIcon } from "@/components/icons";

const ProductDetailHeader = memo(() => {
  const { back, canGoBack, navigate } = useRouter();

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      back();
    } else {
      navigate("/(main_tabs)");
    }
  }, [back, canGoBack, navigate]);

  const handleNavigateToCart = useCallback(
    () => navigate("/(main_stacks)/cart"),
    [navigate],
  );

  return (
    <>
      {/* Sticky Top Bar */}
      <View style={styles.statusOffset} />

      <View style={styles.headerWrapper}>
        <Button
          rounded="full"
          variant="alternative"
          onPress={handleGoBack}
          IconLeft={
            <AntDesign name="arrowleft" color={colors.white} size={24} />
          }
        />
        <View style={styles.actionWrapper}>
          <Button
            rounded="full"
            variant="alternative"
            IconRight={<Entypo name="share" color={colors.white} size={24} />}
          />
          <Button
            rounded="full"
            variant="alternative"
            IconRight={
              <FontAwesome name="heart-o" size={24} color={colors.white} />
            }
          />
          <Button
            rounded="full"
            variant="alternative"
            onPress={handleNavigateToCart}
            IconRight={<CartIcon width={24} height={24} />}
          />
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  statusOffset: {
    height: "4%",
    backgroundColor: background.primary,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerWrapper: {
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    top: "6%",
    left: "2%",
    flexDirection: "row",
    paddingRight: 16,
    zIndex: 10,
  },
  actionWrapper: {
    flexDirection: "row",
    gap: 20,
  },
});

ProductDetailHeader.displayName = "ProductDetailHeader";
export default ProductDetailHeader;
