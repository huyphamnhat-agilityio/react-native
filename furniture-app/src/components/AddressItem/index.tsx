import {StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {borderRadius, colors, fontSizes} from 'src/themes';
import {Button, Text} from '../common';
import {EditIcon} from '../icons';
import {useCallback} from 'react';

export type AddressItemProps = {
  isChecked?: boolean;
  name: string;
  address: string;
  onPress?: (id: string) => void;
  id: string;
};
const AddressItem = ({
  isChecked = false,
  name,
  address,
  onPress,
  id,
}: AddressItemProps) => {
  const handlePress = useCallback(() => {
    onPress?.(id);
  }, [onPress, id]);

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
            {name}
          </Text>

          <Button
            style={styles.edit}
            bgVariant="none"
            IconLeft={<EditIcon />}
          />
        </View>
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
    borderRadius: 4,
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
