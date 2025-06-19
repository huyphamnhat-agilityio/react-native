import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// Themes
import { borderRadius, colors, fontSizes } from 'src/themes';

// Components
import { Button, Text } from '../common';
import { EditIcon } from '../icons';

// Interfaces
import { ShippingAddress, StackNavigation } from 'src/interfaces';
import { formatFullAddress } from 'src/utils';

export type AddressItemProps = {
  isChecked?: boolean;
  shippingAddress: ShippingAddress;
  onPress?: (address: ShippingAddress) => void;
  navigation?: StackNavigation;
};
const AddressItem = ({
  isChecked = false,
  shippingAddress,
  onPress,
  navigation,
}: AddressItemProps) => {
  const handlePress = useCallback(() => {
    onPress?.(shippingAddress);
  }, [onPress, shippingAddress]);

  const handleNavigateToEditAddress = useCallback(() => {
    navigation?.navigate('AddOrEditAddress', { address: shippingAddress });
  }, [navigation, shippingAddress]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BouncyCheckbox
          isChecked={isChecked}
          useBuiltInState={false}
          size={20}
          fillColor={colors.black}
          textStyle={[styles.checkboxText, isChecked && styles.activeText]}
          innerIconStyle={styles.checkboxIcon}
          iconStyle={styles.checkboxIcon}
          onPress={handlePress}
          text="Use as the shipping address"
        />
      </View>

      <View style={styles.addressContent}>
        <View style={styles.titleWrapper}>
          <Text font="NunitoSansBold" size="base" textVariant="secondary">
            {shippingAddress.name}
          </Text>

          <Button
            style={styles.edit}
            bgVariant="none"
            onPress={handleNavigateToEditAddress}
            IconLeft={<EditIcon />}
          />
        </View>
        <View style={styles.divider} />

        <Text
          font="NunitoSansNormal"
          size="xs"
          textVariant="quaternary"
          numberOfLines={2}
          style={styles.address}
        >
          {formatFullAddress(shippingAddress)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 15,
    paddingHorizontal: 20,
  },
  wrapper: {
    gap: 15,
  },
  checkboxText: {
    textDecorationLine: 'none',
    fontSize: fontSizes.base,
    color: colors.text.disabled,
  },
  activeText: {
    color: colors.text.primary,
  },
  checkboxIcon: {
    borderRadius: borderRadius.xs,
  },
  addressContent: {
    shadowColor: colors.shadow.primary,
    elevation: 40,
    borderRadius: borderRadius.md,
    zIndex: 99,
    backgroundColor: colors.white,
    gap: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  edit: {
    padding: 0,
  },
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

export default AddressItem;
