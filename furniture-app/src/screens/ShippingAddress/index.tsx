import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

// Components
import {AddressItem} from 'src/components';
import {MEDIUM_DEVICE_HEIGHT} from 'src/constants';
import {useUserStore} from 'src/store';

// Themes
import {colors} from 'src/themes';
import {useShallow} from 'zustand/shallow';

const height = Dimensions.get('window').height;

const MOCK_ADDRESS = [
  {
    id: '1',
    name: 'Bruno Fernandes 1',
    address: '125 rue Robert Latouche, Nice, 06200, Côte D’azur, France',
  },
  {
    id: '2',
    name: 'Bruno Fernandes 2',
    address: '225 rue Robert Latouche, Nice, 06200, Côte D’azur, France',
  },
  {
    id: '3',
    name: 'Bruno Fernandes 3',
    address: '325 rue Robert Latouche, Nice, 06200, Côte D’azur, France',
  },
  {
    id: '4',
    name: 'Bruno Fernandes 4',
    address: '425 rue Robert Latouche, Nice, 06200, Côte D’azur, France',
  },
  {
    id: '5',
    name: 'Bruno Fernandes 5',
    address: '525 rue Robert Latouche, Nice, 06200, Côte D’azur, France',
  },
];
const ShippingAddressScreen = () => {
  const {currentAddressId, setCurrentAddressId} = useUserStore(
    useShallow(state => ({
      currentAddressId: state.currentAddressId,
      setCurrentAddressId: state.setCurrentAddressId,
    })),
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        {MOCK_ADDRESS.map(item => (
          <AddressItem
            key={item.id}
            id={item.id}
            isChecked={currentAddressId === item.id}
            name={item.name}
            address={item.address}
            onPress={setCurrentAddressId}
          />
        ))}
      </View>
    </ScrollView>
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
});

export default ShippingAddressScreen;
