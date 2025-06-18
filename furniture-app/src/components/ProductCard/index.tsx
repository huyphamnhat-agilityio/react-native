import FastImage from '@d11/react-native-fast-image';
import { memo } from 'react';
import { StyleSheet, TouchableHighlight, View, ViewProps } from 'react-native';

// Components
import { Button, Text } from 'src/components/common';

// Icons
import { ShoppingBagIcon } from 'src/components/icons';

// Themes
import { borderRadius } from 'src/themes';

export type ProductCardProps = ViewProps & {
  image: string;
  name: string;
  price: number;
  onPress?: () => void;
};
const ProductCard = memo(
  ({ image, name, price, onPress, style, ...props }: ProductCardProps) => {
    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="#ffffff"
        style={[styles.container, style]}
        {...props}
      >
        <View>
          <FastImage
            source={{
              uri: image,
            }}
            style={styles.image}
            resizeMode="stretch"
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
      </TouchableHighlight>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '48%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    position: 'absolute',
    padding: 5,
    right: '5%',
    bottom: '23%',
    zIndex: 99,
  },
  image: {
    flex: 1,
    width: 'auto',
    height: 236,
    borderRadius: borderRadius.base,
  },
  content: {
    gap: 5,
  },
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
