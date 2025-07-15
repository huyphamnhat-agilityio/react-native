import { useCallback, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

// Themes
import { background, colors } from "@/themes";

// Components
import { Button, Text } from "@/components/common";
import ProductImageCarousel from "@/components/ui/product/ProductImageCarousel";
import { TradlyBigIcon } from "@/components/icons";

// Hooks
import { useGetProductDetail, useHandleExpiredToken } from "@/hooks";

// Utils & Constants
import { formatNumberWithThousandSeparator, getSalePercentage } from "@/utils";
import { SCREEN_HEIGHT } from "@/constants";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const { back, canGoBack, navigate } = useRouter();

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      back();
    } else {
      navigate("/(main_tabs)");
    }
  }, [back, canGoBack, navigate]);

  const { data, isLoading, error } = useGetProductDetail(id as string);
  useHandleExpiredToken(JSON.parse(error?.message ?? "{}"));

  const {
    name = "",
    price = 0,
    originalPrice = 0,
    imageUrl = "",
    condition = "",
    priceType,
    category,
    location,
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
            IconRight={
              <Feather name="more-vertical" size={24} color={colors.white} />
            }
          />
        </View>
      </View>

      {/* Scrollable Content */}
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

        <View style={styles.titleWrapper}>
          <Text font="Montserrat_700Bold" textVariant="quaternary" size={4.5}>
            {name}
          </Text>
          <View style={styles.priceWrapper}>
            <Text font="Montserrat_700Bold" textVariant="primary" size={4.5}>
              {formatNumberWithThousandSeparator(price)}
            </Text>
            <Text font="Montserrat_500Medium" textVariant="quaternary">
              <Text
                font="Montserrat_500Medium"
                textVariant="quaternary"
                size={3.5}
                style={styles.originalPrice}
              >
                {formatNumberWithThousandSeparator(originalPrice)}
              </Text>{" "}
              {Math.round(getSalePercentage(originalPrice, price))}% off
            </Text>
          </View>
        </View>

        <View style={styles.storeWrapper}>
          <View style={styles.storeInfo}>
            <TradlyBigIcon />
            <Text
              font="Montserrat_500Medium"
              textVariant="quaternary"
              size={3.5}
            >
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

        <View style={styles.contentWrapper}>
          <ScrollView style={styles.descriptionWrapper} nestedScrollEnabled>
            <Text
              font="Montserrat_400Regular"
              textVariant="quaternary"
              size={3.5}
            >
              {description}
            </Text>
          </ScrollView>

          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Text textVariant="tertiary">Condition</Text>
              <Text textVariant="tertiary">Price Type</Text>
              <Text textVariant="tertiary">Category</Text>
              <Text textVariant="tertiary">Location</Text>
            </View>
            <View style={styles.detailValue}>
              <Text textVariant="quaternary">{condition}</Text>
              <Text textVariant="quaternary">{priceType}</Text>
              <Text textVariant="quaternary">{category}</Text>
              <Text textVariant="quaternary">{location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.deliveryWrapper}>
          <Text font="Montserrat_600SemiBold" size={4.5} textVariant="black">
            Additional Details
          </Text>

          <View style={styles.detailRow}>
            <Text
              style={styles.detailLabel}
              font="Montserrat_400Regular"
              textVariant="tertiary"
              size={3.5}
            >
              Delivery Details
            </Text>
            <Text
              style={styles.detailValue}
              textVariant="quaternary"
              size={3.5}
            >
              Home Delivery Available, Cash On Delivery
            </Text>
          </View>
        </View>
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
    paddingBottom: 120, // space for the bottom button
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  titleWrapper: {
    flexDirection: "column",
    gap: 10,
    padding: 16,
    backgroundColor: background.white,
  },
  priceWrapper: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  originalPrice: {
    textDecorationLine: "line-through",
  },
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
  contentWrapper: {
    marginTop: 6,
    padding: 30,
    backgroundColor: background.white,
    gap: 40,
  },
  descriptionWrapper: {
    height: SCREEN_HEIGHT * 0.15,
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
  deliveryWrapper: {
    marginTop: 6,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: background.white,
  },
  detailRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 12,
    alignItems: "flex-start",
  },

  detailLabel: {
    flex: 1,
    gap: 12,
  },

  detailValue: {
    flex: 2,
    gap: 12,
    flexWrap: "wrap",
  },
  buttonWrapper: {
    paddingHorizontal: 32,
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingVertical: 12,
    zIndex: 20,
  },
  addToCartButton: {
    width: "100%",
    paddingVertical: 16,
  },
});

export default ProductDetail;
