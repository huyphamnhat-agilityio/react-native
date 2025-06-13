import {memo, useCallback} from 'react';
import {Image, StyleSheet, View, ViewProps} from 'react-native';

// Themes
import {borderRadius, colors} from 'src/themes';

// Components
import {Button, Text} from 'src/components/common';

// Icons
import {CrossIcon, ShoppingBagIcon} from 'src/components/icons';

// Types & Interfaces
import {Product} from 'src/interfaces';

export type FavoriteItemProps = ViewProps & {
  data: Product;
  onRemove?: (id: string) => void;
  onPress?: (data: Product) => void;
  isDisabled?: boolean;
};
const FavoriteItem = memo(
  ({
    data,
    onRemove,
    onPress,
    style,
    isDisabled = false,
    ...props
  }: FavoriteItemProps) => {
    const {id, price, name: productName, variants} = data;
    const handleRemovePress = useCallback(() => {
      onRemove?.(id);
    }, [onRemove, id]);

    const handlePress = useCallback(() => {
      onPress?.(data);
    }, [onPress, data]);
    return (
      <View style={[styles.container, style]} {...props}>
        <Image
          source={{uri: variants[0].image}}
          width={100}
          height={100}
          resizeMode="stretch"
          style={styles.image}
        />
        <View style={styles.wrapper}>
          <View style={styles.contentWrapper}>
            <View style={styles.content}>
              <Text
                numberOfLines={1}
                font="NunitoSansSemiBold"
                size="xs"
                textVariant="disabled">
                {productName}
              </Text>
              <Text font="NunitoSansBold" size="sm">
                $ {price.toFixed(2)}
              </Text>
            </View>
            <Button
              IconLeft={<CrossIcon />}
              bgVariant="none"
              rounded="full"
              disabled={isDisabled}
              style={styles.removeButton}
              onPress={handleRemovePress}
            />
          </View>

          <Button
            IconLeft={<ShoppingBagIcon color={colors.primary} />}
            bgVariant="gray"
            rounded="sm"
            disabled={isDisabled}
            style={styles.cartButton}
            onPress={handlePress}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
  },
  image: {
    borderRadius: borderRadius.base,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 22,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {gap: 6, maxWidth: '80%'},
  removeButton: {
    padding: 0,
  },
  cartButton: {
    marginLeft: 'auto',
    padding: 2,
  },
  quantity: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

FavoriteItem.displayName = 'FavoriteItem';
export default FavoriteItem;
