import {StyleSheet, View, ViewProps} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Components
import SettingItem from '../SettingItem';

// Constants
import {SETTINGS} from 'src/constants';

// Store
import {useUserStore} from 'src/store';

// Types & Interfaces
import {StackNavigation} from 'src/interfaces';

export type SettingMenuProps = ViewProps;

const SettingMenu = ({style, ...rest}: SettingMenuProps) => {
  const shippingAddress =
    useUserStore(state => state.user?.shippingAddress) ?? [];

  const {navigate} = useNavigation<StackNavigation>();

  return (
    <View style={[styles.container, style]} {...rest}>
      <SettingItem
        title={SETTINGS.SHIPPING_ADDRESS.title}
        description={SETTINGS.SHIPPING_ADDRESS.description(
          shippingAddress.length,
        )}
        handlePress={() => navigate('ShippingAddress')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 15,
  },
});

export default SettingMenu;
