import { memo } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';

// Components
import { Button, QuantityControl, Text } from 'src/components/common';
import { MarkIcon, StarIcon } from 'src/components/icons';

// Constants
import { MEDIUM_DEVICE_HEIGHT } from 'src/constants';

// Themes
import { colors } from 'src/themes';

const height = Dimensions.get('window').height;

export type ProductDetailContentProps = {
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  quantity: number;
  setQuantity: (q: number) => void;
  isMarkAsFavorite: boolean;
  isAddingToFavorites: boolean;
  isLoadingFavorites: boolean;
  isAddingToCart: boolean;
  isLoadingCart: boolean;
  handleAddToFavorites: () => void;
  handleAddToCart: () => void;
};

const ProductDetailContent = memo(
  ({
    name,
    price,
    rating,
    reviewCount,
    description,
    quantity,
    setQuantity,
    isMarkAsFavorite,
    isAddingToFavorites,
    isLoadingFavorites,
    isAddingToCart,
    isLoadingCart,
    handleAddToFavorites,
    handleAddToCart,
  }: ProductDetailContentProps) => {
    return (
      <View style={styles.content}>
        <Text
          numberOfLines={1}
          font="GelasioMedium"
          size="lg"
          textVariant="secondary"
        >
          {name}
        </Text>

        <View style={styles.wrapper}>
          <Text
            style={styles.price}
            font="NunitoSansBold"
            size="xxl"
            textVariant="secondary"
          >
            $ {price}
          </Text>

          <QuantityControl quantity={quantity} setQuantity={setQuantity} />
        </View>

        <View style={styles.stat}>
          <View style={styles.rate}>
            <StarIcon width={20} height={20} color={colors.yellow} />
            <Text font="NunitoSansBold" size="base" textVariant="secondary">
              {rating}
            </Text>
          </View>

          <Text font="NunitoSansSemiBold" size="sm" textVariant="quaternary">
            (${reviewCount} reviews)
          </Text>
        </View>

        <ScrollView style={styles.descriptionWrapper}>
          <Text font="NunitoSansLight" size="sm" textVariant="quaternary">
            {description}
          </Text>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.buttonWrapper}>
            <Button
              bgVariant="secondary"
              rounded="md"
              style={styles.buttonMark}
              disabled={isAddingToFavorites || isLoadingFavorites}
              IconLeft={
                <MarkIcon
                  fill={isMarkAsFavorite ? colors.primary : 'none'}
                  color={colors.primary}
                />
              }
              onPress={handleAddToFavorites}
            />

            <Button
              rounded="md"
              title="Add to cart"
              titleFont="NunitoSansSemiBold"
              titleSize="md"
              disabled={isAddingToCart || isLoadingCart}
              style={styles.buttonAddToCart}
              onPress={handleAddToCart}
            />
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: height >= MEDIUM_DEVICE_HEIGHT ? 10 : 4,
    marginTop: 12,
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  rate: {
    flexDirection: 'row',
    gap: 10,
  },
  descriptionWrapper: {
    height: height * (height >= MEDIUM_DEVICE_HEIGHT ? 0.185 : 0.1),
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 15,
  },
  buttonMark: {
    padding: 18,
    width: 60,
  },
  buttonAddToCart: {
    flex: 1,
    paddingVertical: 16,
  },
  price: {
    width: '66%',
  },
});

ProductDetailContent.displayName = 'ProductDetailContent';

export default ProductDetailContent;
