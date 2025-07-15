import { Image } from "expo-image";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { memo, useState } from "react";

// Components
import { QuantityControl, Text } from "@/components/common";

// Themes
import { background, borderRadius, colors } from "@/themes";

const CartItemList = memo(() => {
  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView
      style={styles.cartContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItemWrapper}>
          <Image
            source={{
              uri: "https://i.ibb.co/BbP5WTb/How-chickens-make-eggs-Focus-Fill-Wy-Iw-Lj-Aw-Iiwi-MC4w-MCIs-MTIw-MCw2-Mjhd.jpg",
            }}
            style={styles.cartItemImage}
          />

          <View style={styles.cartItemContent}>
            <Text font="Montserrat_500Medium" textVariant="quaternary">
              Coca Cola
            </Text>
            <View style={styles.cartItemPriceWrapper}>
              <Text font="Montserrat_700Bold" size={4.5}>
                $25
              </Text>
              <Text font="Montserrat_500Medium" textVariant="secondary">
                <Text
                  style={styles.cartItemOriginalPrice}
                  textVariant="secondary"
                >
                  $50
                </Text>{" "}
                50% off
              </Text>
            </View>
            <QuantityControl quantity={quantity} setQuantity={setQuantity} />
          </View>
        </View>
        <View style={styles.cartItemSeparator} />
        <TouchableOpacity activeOpacity={0.5} style={styles.cartItemFooter}>
          <Text
            font="Montserrat_500Medium"
            textVariant="secondary"
            style={styles.textCentered}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItemWrapper}>
          <Image
            source={{
              uri: "https://i.ibb.co/BbP5WTb/How-chickens-make-eggs-Focus-Fill-Wy-Iw-Lj-Aw-Iiwi-MC4w-MCIs-MTIw-MCw2-Mjhd.jpg",
            }}
            style={styles.cartItemImage}
          />

          <View style={styles.cartItemContent}>
            <Text font="Montserrat_500Medium" textVariant="quaternary">
              Coca Cola
            </Text>
            <View style={styles.cartItemPriceWrapper}>
              <Text font="Montserrat_700Bold" size={4.5}>
                $25
              </Text>
              <Text font="Montserrat_500Medium" textVariant="secondary">
                <Text
                  style={styles.cartItemOriginalPrice}
                  textVariant="secondary"
                >
                  $50
                </Text>{" "}
                50% off
              </Text>
            </View>
            <QuantityControl quantity={quantity} setQuantity={setQuantity} />
          </View>
        </View>
        <View style={styles.cartItemSeparator} />
        <TouchableOpacity activeOpacity={0.5} style={styles.cartItemFooter}>
          <Text
            font="Montserrat_500Medium"
            textVariant="secondary"
            style={styles.textCentered}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItemWrapper}>
          <Image
            source={{
              uri: "https://i.ibb.co/BbP5WTb/How-chickens-make-eggs-Focus-Fill-Wy-Iw-Lj-Aw-Iiwi-MC4w-MCIs-MTIw-MCw2-Mjhd.jpg",
            }}
            style={styles.cartItemImage}
          />

          <View style={styles.cartItemContent}>
            <Text font="Montserrat_500Medium" textVariant="quaternary">
              Coca Cola
            </Text>
            <View style={styles.cartItemPriceWrapper}>
              <Text font="Montserrat_700Bold" size={4.5}>
                $25
              </Text>
              <Text font="Montserrat_500Medium" textVariant="secondary">
                <Text
                  style={styles.cartItemOriginalPrice}
                  textVariant="secondary"
                >
                  $50
                </Text>{" "}
                50% off
              </Text>
            </View>
            <QuantityControl quantity={quantity} setQuantity={setQuantity} />
          </View>
        </View>
        <View style={styles.cartItemSeparator} />
        <TouchableOpacity activeOpacity={0.5} style={styles.cartItemFooter}>
          <Text
            font="Montserrat_500Medium"
            textVariant="secondary"
            style={styles.textCentered}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItemWrapper}>
          <Image
            source={{
              uri: "https://i.ibb.co/BbP5WTb/How-chickens-make-eggs-Focus-Fill-Wy-Iw-Lj-Aw-Iiwi-MC4w-MCIs-MTIw-MCw2-Mjhd.jpg",
            }}
            style={styles.cartItemImage}
          />

          <View style={styles.cartItemContent}>
            <Text font="Montserrat_500Medium" textVariant="quaternary">
              Coca Cola
            </Text>
            <View style={styles.cartItemPriceWrapper}>
              <Text font="Montserrat_700Bold" size={4.5}>
                $25
              </Text>
              <Text font="Montserrat_500Medium" textVariant="secondary">
                <Text
                  style={styles.cartItemOriginalPrice}
                  textVariant="secondary"
                >
                  $50
                </Text>{" "}
                50% off
              </Text>
            </View>
            <QuantityControl quantity={quantity} setQuantity={setQuantity} />
          </View>
        </View>
        <View style={styles.cartItemSeparator} />
        <TouchableOpacity activeOpacity={0.5} style={styles.cartItemFooter}>
          <Text
            font="Montserrat_500Medium"
            textVariant="secondary"
            style={styles.textCentered}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  textCentered: {
    textAlign: "center",
  },
  cartContainer: {
    marginTop: 8,
  },
  contentContainer: {
    gap: 8,
  },
  cartItemContainer: {
    paddingTop: 28,
    shadowColor: background.backdrop,
    elevation: 40,
    backgroundColor: background.white,
  },
  cartItemWrapper: {
    flexDirection: "row",
    gap: 16,
    paddingLeft: 16,
  },
  cartItemImage: {
    width: 102,
    height: 102,
    borderRadius: borderRadius["2.5"],
  },
  cartItemContent: {
    gap: 12,
  },
  cartItemPriceWrapper: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  cartItemOriginalPrice: {
    textDecorationLine: "line-through",
  },
  cartItemSeparator: {
    height: 0.5,
    backgroundColor: colors.gray_50,
    marginTop: 12,
  },
  cartItemFooter: {
    paddingVertical: 12,
  },
});

CartItemList.displayName = "CartItemList";
export default CartItemList;
