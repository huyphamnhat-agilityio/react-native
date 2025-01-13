import {memo} from 'react';
import {Image, StyleSheet, View, ViewProps} from 'react-native';

// Components
import {Button, Text} from 'src/components/common';

// Icons
import {ShoppingBagIcon} from 'src/components/icons';

// Themes
import {borderRadius} from 'src/themes';

export interface ProductCardProps extends ViewProps {
  image: string;
  name: string;
  price: number;
  onPress?: () => void;
}
const ProductCard = memo(({image, name, price, onPress}: ProductCardProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        width={157}
        height={256}
        style={styles.image}
        resizeMode="cover"
      />
      <Button
        IconLeft={<ShoppingBagIcon />}
        bgVariant="alternative"
        rounded="sm"
        testID="add-to-cart"
        style={styles.button}
        onPress={onPress}
      />
      <View style={styles.content}>
        <Text numberOfLines={1} size="sm" textVariant="tertiary">
          {name}
        </Text>
        <Text font="NunitoSansBold" size="sm" textVariant="secondary">
          $ {price}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 157,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    position: 'absolute',
    padding: 5,
    right: 10,
    bottom: 68,
    zIndex: 99,
  },
  image: {
    borderRadius: borderRadius.base,
  },
  content: {
    gap: 5,
  },
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
