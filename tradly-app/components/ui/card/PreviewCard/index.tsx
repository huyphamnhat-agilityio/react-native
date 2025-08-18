import { memo } from "react";
import { ImageBackground } from "expo-image";
import { StyleSheet, View } from "react-native";

// Components
import { Text } from "@/components/common";

// Utils
import { maskCardNumber } from "@/utils";

// Themes
import { background, borderRadius } from "@/themes";

// Constants
import { SCREEN_WIDTH } from "@/constants";

// Types
import { UserCard } from "@/interfaces";

export type PreviewCardProps = {
  data: Omit<UserCard, "id">;
};

const PreviewCard = memo(
  ({
    data: { holderName, cardNumber, cvc, expiresDates },
  }: PreviewCardProps) => {
    return (
      <View style={styles.imageWrapper}>
        <ImageBackground
          source="visa"
          contentFit="contain"
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
              {maskCardNumber(cardNumber)}
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
        </ImageBackground>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: background.secondary,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 360,
  },
  cardWrapper: {
    padding: 16,
    width: SCREEN_WIDTH - 64,
    height: SCREEN_WIDTH * 0.6,
    maxWidth: 480,
    maxHeight: 360,
    justifyContent: "space-around",
  },
  image: {
    borderRadius: borderRadius[2.5],
  },
  textCenter: {
    textAlign: "center",
  },
});

PreviewCard.displayName = "PreviewCard";
export default PreviewCard;
