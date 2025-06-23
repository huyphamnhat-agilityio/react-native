import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  BottomSheet,
  Button,
  QuantityControl,
  Text,
} from 'src/components/common';
import { Product } from 'src/interfaces';
import { borderRadius, colors } from 'src/themes';

interface FavoriteBottomSheetProps {
  selectedProduct: Product | null;
  selectedVariant: { color: string; image: string } | null;
  setSelectedVariant: (variant: { color: string; image: string }) => void;
  quantity: number;
  setQuantity: (q: number) => void;
  isOpen: any;
  isDisabled: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const FavoriteBottomSheet = memo(
  ({
    selectedProduct,
    selectedVariant,
    setSelectedVariant,
    quantity,
    setQuantity,
    isOpen,
    isDisabled,
    onClose,
    onAddToCart,
  }: FavoriteBottomSheetProps) => {
    return (
      <BottomSheet
        isDisabled={isDisabled}
        isOpen={isOpen}
        onClose={onClose}
        style={styles.actionSheet}
      >
        <Text style={styles.actionTitle}>Choose color and quantity</Text>
        <View style={styles.actionWrapper}>
          <View style={styles.colorWrapper}>
            {selectedProduct?.variants.map(variant => (
              <TouchableOpacity
                key={variant.color}
                style={[
                  styles.colorOptionsWrapper,
                  {
                    backgroundColor:
                      selectedVariant?.color === variant.color
                        ? colors.underlay
                        : colors.white,
                  },
                ]}
                onPress={() => setSelectedVariant(variant)}
              >
                <View
                  style={[
                    styles.colorOptions,
                    { backgroundColor: variant.color },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <QuantityControl
            style={styles.quantityControl}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <Button
            width="100%"
            rounded="md"
            title="Add to cart"
            titleFont="NunitoSansSemiBold"
            titleSize="md"
            onPress={onAddToCart}
            disabled={!selectedVariant || isDisabled}
            style={styles.button}
          />
        </View>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  actionSheet: {
    gap: 8,
    padding: 12,
  },
  actionTitle: {
    textAlign: 'center',
  },
  actionWrapper: {
    flexDirection: 'column',
    width: '100%',
    gap: 16,
  },
  colorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
  colorOptionsWrapper: {
    borderColor: colors.border.alternative,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: 8,
  },
  colorOptions: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
  },
  quantityControl: {
    alignSelf: 'center',
  },
  button: {
    padding: 8,
  },
});

FavoriteBottomSheet.displayName = 'FavoriteBottomSheet';

export default FavoriteBottomSheet;
