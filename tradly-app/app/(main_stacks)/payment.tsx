import {
  AddressInfoSection,
  Button,
  Checkbox,
  Text,
} from "@/components/common";
import { CheckIcon, PlusIcon } from "@/components/icons";
import {
  EMPTY_CARD,
  MEDIUM_DEVICE_HEIGHT,
  PAYMENT_OPTIONS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/constants";
import { UserCard } from "@/interfaces";
import { useUserStore } from "@/store";
import { background, border, borderRadius, colors } from "@/themes";
import { formatNumberWithThousandSeparator, isFulfilledObject } from "@/utils";
import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";

const carouselHeight = SCREEN_HEIGHT * 0.25;
const Payment = () => {
  const { totalPrice = "{}", totalQuantity = "{}" } = useLocalSearchParams();

  const formattedTotalPrice: number = JSON.parse(totalPrice as string) ?? 0;
  const formattedTotalQuantity: number =
    JSON.parse(totalQuantity as string) ?? 0;

  const [selectedPayment, setSelectedPayment] =
    useState<keyof typeof PAYMENT_OPTIONS>("CARD");

  const userAddress = useUserStore((state) => state.user?.address);

  const userCards = useUserStore((state) => state.user?.cards ?? []);

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const selectedCard = userCards[selectedCardIndex];

  const ref = useRef<ICarouselInstance | null>(null);

  const progress = useSharedValue<number>(0);

  const hasValidPaymentMethod =
    selectedPayment === "CARD" && selectedCard && selectedCard.id !== "";

  const canCheckout = useMemo(
    () =>
      isFulfilledObject(userAddress) &&
      (selectedPayment === "CASH" || hasValidPaymentMethod),
    [hasValidPaymentMethod, selectedPayment, userAddress],
  );

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

  const handleRenderItem = useCallback(
    ({
      item: { id, cardNumber, cvc, expiresDates, holderName },
    }: CarouselRenderItemInfo<UserCard>) =>
      id ? (
        <ImageBackground
          source="visa"
          contentFit="cover"
          style={styles.cardWrapper}
          imageStyle={styles.image}
        >
          <View>
            <Text font="Montserrat_400Regular" textVariant="secondary" size={3}>
              Holder name
            </Text>
            <Text font="Montserrat_400Regular" textVariant="white" size={4}>
              {holderName}
            </Text>
          </View>

          <View>
            <Text font="Montserrat_400Regular" textVariant="secondary" size={3}>
              Card number
            </Text>
            <Text font="Montserrat_400Regular" textVariant="white" size={4}>
              {cardNumber}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                font="Montserrat_400Regular"
                textVariant="secondary"
                size={3}
              >
                Exp. Date
              </Text>
              <Text font="Montserrat_400Regular" textVariant="white" size={3}>
                {expiresDates}
              </Text>
            </View>
            <View>
              <Text
                font="Montserrat_400Regular"
                textVariant="secondary"
                size={3}
              >
                CVC
              </Text>
              <Text
                font="Montserrat_400Regular"
                textVariant="white"
                size={3}
                style={styles.textCenter}
              >
                {cvc}
              </Text>
            </View>
          </View>

          <CheckIcon style={styles.checkIcon} />
        </ImageBackground>
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={selectedPayment === "CASH"}
          style={styles.emptyCardWrapper}
        >
          <PlusIcon width={22} height={22} color={colors.gray_100} />
          <Text
            font="Montserrat_400Regular"
            textVariant="secondary"
            style={styles.textCenter}
          >
            Add Payment Method
          </Text>
        </TouchableOpacity>
      ),
    [selectedPayment],
  );
  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <Carousel
          ref={ref}
          width={SCREEN_WIDTH - 100}
          height={carouselHeight}
          data={[...userCards, EMPTY_CARD]}
          renderItem={handleRenderItem}
          onProgressChange={(_offsetProgress, absoluteProgress) => {
            const newIndex = Math.round(absoluteProgress);
            progress.value = newIndex;
            setSelectedCardIndex(newIndex);
          }}
          containerStyle={[
            styles.cardCarouselContainer,
            selectedPayment === "CASH" && { opacity: 0.5 },
          ]}
          enabled={selectedPayment === "CARD"}
          loop={false}
        />

        <Pagination.Basic
          progress={progress}
          data={[...userCards, EMPTY_CARD]}
          size={8}
          dotStyle={{
            borderRadius: 100,
            backgroundColor: colors.gray_50,
          }}
          activeDotStyle={{
            borderRadius: 100,
            overflow: "hidden",
            backgroundColor: colors.green_100,
          }}
          containerStyle={styles.pagination}
          horizontal
          onPress={onPressPagination}
        />
      </View>

      <View style={styles.optionsContainer}>
        {Object.entries(PAYMENT_OPTIONS).map(([key, label], index) => {
          const isSelected = selectedPayment === key;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.optionItem, index === 0 && styles.firstOption]}
              onPress={() =>
                setSelectedPayment(key as keyof typeof PAYMENT_OPTIONS)
              }
              activeOpacity={0.8}
            >
              <Checkbox active={isSelected} />
              <Text textVariant="quaternary" font="Montserrat_600SemiBold">
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <AddressInfoSection style={styles.address} />

      <View style={styles.cartBillWrapper}>
        <View style={styles.cartBillDetail}>
          <Text font="Montserrat_600SemiBold" size={4.5} textVariant="black">
            Price Details
          </Text>

          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Text textVariant="black">
                Price ({formattedTotalQuantity} item
                {formattedTotalQuantity > 1 && "s"})
              </Text>
            </View>
            <View style={styles.detailValue}>
              <Text textVariant="black">
                {formatNumberWithThousandSeparator(formattedTotalPrice)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Checkout"
            rounded="full"
            titleFont="Montserrat_600SemiBold"
            titleSize={4.5}
            style={styles.button}
            disabled={!canCheckout}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.secondary,
  },
  paymentContainer: {
    backgroundColor: background.white,
    paddingVertical: 24,
    position: "relative",
  },
  cardCarouselContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    padding: 16,
    width: SCREEN_WIDTH - 120,
    height: SCREEN_WIDTH - 220,
    justifyContent: "space-around",
    position: "relative",
  },
  image: {
    borderRadius: borderRadius[2.5],
  },
  pagination: {
    gap: 16,
    position: "absolute",
    bottom: "12%",
  },
  textCenter: {
    textAlign: "center",
  },
  emptyCardWrapper: {
    padding: 36,
    width: SCREEN_WIDTH - 120,
    height: SCREEN_WIDTH - 220,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius["2.5"],
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: border.secondary,
    gap: 20,
  },
  checkIcon: {
    position: "absolute",
    right: "-2%",
    bottom: "-4%",
  },
  optionsContainer: {
    backgroundColor: background.white,
    marginTop: 6,
  },
  optionItem: {
    flexDirection: "row",
    gap: 8,
    borderTopWidth: 0.5,
    borderTopColor: border.alternative,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  firstOption: {
    borderTopWidth: 0,
  },
  address: {
    marginTop: 16,
  },
  cartBillWrapper: {
    marginTop: "auto",
    paddingTop: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 16 : 8,
    backgroundColor: background.white,
    shadowColor: background.backdrop,
    elevation: 40,
    paddingBottom: "4%",
  },
  cartBillDetail: {
    paddingHorizontal: 16,
    gap: SCREEN_HEIGHT >= MEDIUM_DEVICE_HEIGHT ? 8 : 0,
  },
  detailRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 12,
  },
  detailLabel: {
    flex: 1,
    gap: 12,
  },
  detailValue: {
    flex: 0,
    gap: 12,
    flexWrap: "wrap",
  },
  buttonWrapper: {
    paddingHorizontal: 32,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    marginTop: 24,
  },
});

export default Payment;
