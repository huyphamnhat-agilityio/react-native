import {memo} from 'react';
import {StyleSheet, View} from 'react-native';

// Icons
import {EditIcon} from 'src/components/icons';

// Components
import {Button, Text} from 'src/components/common';

// Themes
import {borderRadius, colors} from 'src/themes';

export type ShippingAddressCardProps = {
  name: string;
  address: string;
};

const ShippingAddressCard = memo(
  ({name, address}: ShippingAddressCardProps) => {
    return (
      <View style={styles.addressWrapper}>
        <View style={styles.addressLabel}>
          <Text font="NunitoSansSemiBold" size="base" textVariant="alternative">
            Shipping Address
          </Text>
          <Button
            style={styles.edit}
            bgVariant="none"
            IconLeft={<EditIcon />}
          />
        </View>
        <View style={styles.addressContent}>
          <Text
            style={styles.name}
            font="NunitoSansBold"
            size="base"
            textVariant="secondary">
            {name}
          </Text>

          <View style={styles.divider} />

          <Text
            font="NunitoSansNormal"
            size="xs"
            textVariant="quaternary"
            numberOfLines={2}
            style={styles.address}>
            {address}
          </Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  addressWrapper: {
    gap: 10,
  },
  addressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  edit: {
    padding: 0,
  },
  addressContent: {
    shadowColor: colors.shadow.primary,
    elevation: 40,
    borderRadius: borderRadius.md,
    zIndex: 99,
    backgroundColor: '#fff',
    gap: 10,
  },
  name: {paddingHorizontal: 20, paddingTop: 15},
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: colors.background.secondary,
  },
  address: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
});
ShippingAddressCard.displayName = 'ShippingAddressCard';
export default ShippingAddressCard;
