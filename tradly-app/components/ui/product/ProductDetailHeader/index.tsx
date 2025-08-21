import { useRouter } from "expo-router";
import {
  memo,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Components
import { Button } from "@/components/common";

// Themes
import { background, colors } from "@/themes";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

// Store
import { useScreenDimensions } from "@/store";
import { TABLET_DEVICE_WIDTH } from "@/constants";

export type ProductDetailHeaderRef = {
  getCartPosition: () => Promise<{ x: number; y: number }>;
};

const ProductDetailHeader = memo(
  forwardRef<ProductDetailHeaderRef>((_props, ref) => {
    const { back, canGoBack, navigate } = useRouter();

    const insets = useSafeAreaInsets();

    const { screenWidth } = useScreenDimensions();

    const cartButtonRef = useRef<View>(null);

    useImperativeHandle(ref, () => ({
      getCartPosition: () => {
        return new Promise((resolve) => {
          cartButtonRef.current?.measure(
            (x, y, width, height, pageX, pageY) => {
              const centerX = pageX + width / 2;
              const centerY = pageY + height / 2;

              resolve({
                x: centerX,
                y: centerY,
              });
            },
          );
        });
      },
    }));

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
        <View style={[styles.statusOffset, { height: insets.top }]} />

        {/* Sticky Top Bar */}
        <View style={[styles.headerWrapper, { top: insets.top + 10 }]}>
          <Button
            rounded="full"
            variant="alternative"
            onPress={handleGoBack}
            IconLeft={
              <AntDesign
                name="arrowleft"
                color={colors.white}
                size={screenWidth >= TABLET_DEVICE_WIDTH ? 32 : 24}
              />
            }
          />
          <View style={styles.actionWrapper}>
            <Button
              rounded="full"
              variant="alternative"
              IconRight={
                <Entypo
                  name="share"
                  color={colors.white}
                  size={screenWidth >= TABLET_DEVICE_WIDTH ? 32 : 24}
                />
              }
            />
            <Button
              rounded="full"
              variant="alternative"
              IconRight={
                <FontAwesome
                  name="heart-o"
                  size={screenWidth >= TABLET_DEVICE_WIDTH ? 32 : 24}
                  color={colors.white}
                />
              }
            />
            <Button
              ref={cartButtonRef}
              rounded="full"
              variant="alternative"
              onPress={handleNavigateToCart}
              IconRight={
                <FontAwesome5
                  name="shopping-cart"
                  size={screenWidth >= TABLET_DEVICE_WIDTH ? 32 : 24}
                  color={colors.white}
                />
              }
            />
          </View>
        </View>
      </>
    );
  }),
);

const styles = StyleSheet.create({
  statusOffset: {
    backgroundColor: background.primary,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerWrapper: {
    width: "98%",
    justifyContent: "space-between",
    position: "absolute",
    top: "6%",
    right: "1%",
    flexDirection: "row",
    zIndex: 10,
  },
  actionWrapper: {
    flexDirection: "row",
    gap: 20,
  },
});

ProductDetailHeader.displayName = "ProductDetailHeader";
export default ProductDetailHeader;
