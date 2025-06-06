import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

// Components
import {AddressItem} from 'src/components';
import {Button} from 'src/components/common';
import {PlusIcon} from 'src/components/icons';
import {MEDIUM_DEVICE_HEIGHT} from 'src/constants';
import {AppStackScreenProps} from 'src/interfaces';
import {useUserStore} from 'src/store';

// Themes
import {colors} from 'src/themes';
import {useShallow} from 'zustand/shallow';

const height = Dimensions.get('window').height;

const ShippingAddressScreen = ({
  navigation,
}: AppStackScreenProps<'ShippingAddress'>) => {
  const {
    currentAddress,
    setCurrentAddress,
    addressList = [],
  } = useUserStore(
    useShallow(state => ({
      currentAddress: state.currentAddress,
      setCurrentAddress: state.setCurrentAddress,
      addressList: state.user?.shippingAddress,
    })),
  );

  const navigateToAddAddress = () => {
    navigation.navigate('AddOrEditAddress', {address: undefined});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          {addressList.map(item => (
            <AddressItem
              key={item.id}
              id={item.id}
              isChecked={currentAddress?.id === item.id}
              name={item.name}
              address={item.address}
              onPress={setCurrentAddress}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
      <Button
        rounded="full"
        style={styles.button}
        bgVariant="white"
        IconLeft={<PlusIcon />}
        onPress={navigateToAddAddress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    gap: height >= MEDIUM_DEVICE_HEIGHT ? 30 : 10,
    paddingBottom: 20,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    elevation: 40,
  },
});

export default ShippingAddressScreen;
