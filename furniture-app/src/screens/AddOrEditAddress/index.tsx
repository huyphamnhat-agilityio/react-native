import { useShallow } from 'zustand/shallow';
import { useCallback } from 'react';
import { Alert, ToastAndroid } from 'react-native';

// Components
import { ShippingAddressForm } from 'src/components';

// Constants
import { SUCCESS_MESSAGE } from 'src/constants';

// Hooks
import { useUpdateUser } from 'src/hooks';

// Interfaces
import { AppStackScreenProps, ShippingAddress } from 'src/interfaces';

// Store
import { useUserStore } from 'src/store';

const AddOrEditAddress = ({
  route,
  navigation: { goBack },
}: AppStackScreenProps<'AddOrEditAddress'>) => {
  const { address: currentAddress } = route.params;

  const {
    userId,
    shippingAddress = [],
    updateShippingAddress,
  } = useUserStore(
    useShallow(state => ({
      userId: state.user?.id,
      shippingAddress: state.user?.shippingAddress,
      updateShippingAddress: state.setUserAddress,
    })),
  );

  const { mutateAsync: updateUserAddress } = useUpdateUser();

  const handleSubmit = useCallback(
    async (data: ShippingAddress) => {
      const updatedAddress = shippingAddress.some(
        address => address.id === data.id,
      )
        ? shippingAddress.map(address =>
            address.id === data.id ? data : address,
          )
        : [
            ...shippingAddress,
            {
              ...data,
            },
          ];

      console.log(updatedAddress);
      await updateUserAddress(
        {
          id: userId,
          shippingAddress: updatedAddress,
        },
        {
          onSuccess: () => {
            updateShippingAddress(updatedAddress);
            ToastAndroid.showWithGravity(
              currentAddress
                ? SUCCESS_MESSAGE.UPDATE_ADDRESS
                : SUCCESS_MESSAGE.ADD_ADDRESS,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            goBack();
          },
          onError: error => {
            Alert.alert(
              'Error',
              error.message,
              [
                {
                  text: 'Ok',
                },
              ],
              { cancelable: true },
            );
          },
        },
      );
    },
    [
      currentAddress,
      goBack,
      shippingAddress,
      updateShippingAddress,
      updateUserAddress,
      userId,
    ],
  );

  return <ShippingAddressForm data={currentAddress} onSubmit={handleSubmit} />;
};

export default AddOrEditAddress;
