import React, { memo, useCallback, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import Animated, { useSharedValue } from "react-native-reanimated";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import { useRouter } from "expo-router";
import { ImageBackground } from "expo-image";

// Constants
import {
  EMPTY_CARD,
  fadeInUp400,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/constants";

// Types
import { PaymentOption, UserCard } from "@/interfaces";

// Themes
import { background, border, borderRadius, colors } from "@/themes";

// Components
import { Text } from "@/components/common";

// Icons
import { CheckIcon, PlusIcon } from "@/components/icons";

export type PaymentCardCarouselProps = {
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedPayment: PaymentOption;
  data: UserCard[];
  disabled?: boolean;
};

const carouselHeight = SCREEN_HEIGHT * 0.25;

const PaymentCardCarousel = memo(
  ({
    setSelectedCardIndex,
    selectedPayment,
    data,
    disabled = false,
  }: PaymentCardCarouselProps) => {
    const ref = useRef<ICarouselInstance | null>(null);

    const progress = useSharedValue<number>(0);

    const { navigate } = useRouter();

    const handleNavigateToAddCard = useCallback(
      () => navigate("/(main_stacks)/card"),
      [navigate],
    );

    const onPressPagination = useCallback(
      (index: number) => {
        if (disabled || selectedPayment === "CASH") {
          return;
        }
        const current = progress.get();
        ref.current?.scrollTo({
          count: index - current,
          animated: true,
        });
      },
      [disabled, progress, selectedPayment],
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
              <Text
                font="Montserrat_400Regular"
                textVariant="secondary"
                size={3}
              >
                Holder name
              </Text>
              <Text font="Montserrat_400Regular" textVariant="white" size={4}>
                {holderName}
              </Text>
            </View>

            <View>
              <Text
                font="Montserrat_400Regular"
                textVariant="secondary"
                size={3}
              >
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
            onPress={handleNavigateToAddCard}
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
      [handleNavigateToAddCard, selectedPayment],
    );
    return (
      <Animated.View entering={fadeInUp400} style={styles.paymentContainer}>
        <Carousel
          ref={ref}
          width={SCREEN_WIDTH - 110}
          height={carouselHeight}
          data={[...data, EMPTY_CARD]}
          renderItem={handleRenderItem}
          onProgressChange={(_offsetProgress, absoluteProgress) => {
            const newIndex = Math.round(absoluteProgress);
            progress.value = newIndex;
            setSelectedCardIndex(newIndex);
          }}
          containerStyle={[
            styles.cardCarouselContainer,
            (selectedPayment === "CASH" || disabled) && { opacity: 0.5 },
          ]}
          enabled={selectedPayment === "CARD" && !disabled}
          loop={false}
        />

        <Pagination.Basic
          progress={progress}
          data={[...data, EMPTY_CARD]}
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
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
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
});

PaymentCardCarousel.displayName = "PaymentCardCarousel";
export default PaymentCardCarousel;
