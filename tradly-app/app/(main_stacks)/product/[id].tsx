import { useCallback, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

// Themes
import { background, colors } from "@/themes";

// Components
import { Button, Text } from "@/components/common";
import {
  ProductDetailAdditional,
  ProductDetailDescription,
  ProductDetailHeader,
  ProductDetailStore,
  ProductDetailTitle,
  ProductImageCarousel,
} from "@/components/ui/product";

// Hooks
import { useGetProductDetail, useHandleExpiredToken } from "@/hooks";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useGetProductDetail(id as string);
  useHandleExpiredToken(JSON.parse(error?.message ?? "{}"));

  const {
    name = "",
    price = 0,
    originalPrice = 0,
    imageUrl = "",
    condition = "",
    priceType = "",
    category = "",
    location = "",
    description = "",
  } = data || {};

  const ref = useRef<ICarouselInstance | null>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = useCallback(
    (index: number) => {
      const current = progress.get();
      ref.current?.scrollTo({
        count: index - current,
        animated: true,
      });
    },
    [progress],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.green_200} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text font="Montserrat_600SemiBold" textVariant="secondary" size={4}>
          {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ProductDetailHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
      >
        <ProductImageCarousel
          ref={ref}
          data={Array(4)
            .fill(null)
            .map(() => ({ image: imageUrl }))}
          onPressPagination={onPressPagination}
          progress={progress}
        />

        <ProductDetailTitle
          name={name}
          price={price}
          originalPrice={originalPrice}
        />

        <ProductDetailStore />

        <ProductDetailDescription
          description={description}
          condition={condition}
          priceType={priceType}
          category={category}
          location={location}
        />

        <ProductDetailAdditional />
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View style={styles.buttonWrapper}>
        <Button
          title="Add to Cart"
          titleFont="Montserrat_600SemiBold"
          titleSize={4.5}
          rounded="full"
          style={styles.addToCartButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: background.secondary,
    position: "relative",
  },
  scrollContent: {
    paddingBottom: 80,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  statWrapper: {
    flexDirection: "row",
    gap: 40,
  },
  statTitleWrapper: {
    flex: 1 / 4,
    gap: 12,
    flexWrap: "wrap",
  },
  statDetailWrapper: {
    flex: 3 / 4,
    gap: 12,
    flexWrap: "wrap",
  },

  buttonWrapper: {
    paddingHorizontal: 32,
    position: "absolute",
    width: "100%",
    bottom: 8,
    paddingVertical: 12,
    zIndex: 20,
  },
  addToCartButton: {
    width: "100%",
    paddingVertical: 16,
  },
});

export default ProductDetail;
