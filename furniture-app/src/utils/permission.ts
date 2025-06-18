import { Alert, Linking, Permission, PermissionsAndroid } from 'react-native';

export const requestAndroidPermission = async (
  permission: Permission,
  name: string,
) => {
  try {
    const result = await PermissionsAndroid.request(permission);

    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      handleNeverAskAgain(name);
    }

    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const handleNeverAskAgain = (permissionName: string) => {
  Alert.alert(
    'Permission Required',
    `${permissionName} permission has been permanently denied. Please enable it from App Settings.`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        onPress: () => {
          Linking.openSettings();
        },
      },
    ],
  );
};
